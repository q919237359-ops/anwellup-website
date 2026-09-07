"""User-authorized deterministic background edit; no generative product pixels.

Run with the bundled Python (Pillow + NumPy). Source is never overwritten.
Outputs an unscaled source-product composite, cutout and pixel-verification record.
"""
from collections import deque
from hashlib import sha256
import json
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "public/assets/catalog/2026-09-r1"
SOURCE = ASSETS / "carry-shopping-bags-source-master-v1.png"
TARGET = ASSETS / "carry-shopping-bags-sage-composite-v2.png"
PROOF = ROOT / "output/bag-background-proof"
PROOF.mkdir(parents=True, exist_ok=True)
source_hash = sha256(SOURCE.read_bytes()).hexdigest()
src = np.array(Image.open(SOURCE).convert("RGB"))
h, w = src.shape[:2]

# Only remove near-white areas reachable from the outside of the image.
# Enclosed highlights and every non-background product pixel are retained.
near_white = (src.min(axis=2) >= 248) & (np.ptp(src, axis=2) <= 7)
background = np.zeros((h, w), dtype=bool)
queue = deque()
for x in range(w):
    for y in (0, h - 1):
        if near_white[y, x]:
            background[y, x] = True
            queue.append((y, x))
for y in range(h):
    for x in (0, w - 1):
        if near_white[y, x] and not background[y, x]:
            background[y, x] = True
            queue.append((y, x))
while queue:
    y, x = queue.popleft()
    for ny, nx in ((y-1, x), (y+1, x), (y, x-1), (y, x+1)):
        if 0 <= ny < h and 0 <= nx < w and near_white[ny, nx] and not background[ny, nx]:
            background[ny, nx] = True
            queue.append((ny, nx))

foreground = ~background
rgb = src.astype(np.int16)
printed = (rgb[:, :, 0] - rgb[:, :, 1] > 8) & (rgb[:, :, 0] - rgb[:, :, 2] > 8)
assert not np.any(background & printed), "Extraction must never remove the red print"
alpha = foreground.astype(np.uint8) * 255
# Remove the white matte only in a one-pixel contour band. The interior and
# all printed pixels remain opaque and untouched; never blur the whole product.
core = np.array(Image.fromarray(alpha).filter(ImageFilter.MinFilter(3))) == 255
edge = foreground & ~core & ~printed
coverage = np.clip((255.0 - src.min(axis=2)) / 35.0, 0, 1)
alpha[edge] = np.rint(coverage[edge] * 255).astype(np.uint8)
cutout_rgb = src.copy()
fraction = alpha[edge, None].astype(float) / 255
cutout_rgb[edge] = np.clip((src[edge].astype(float) - 255 * (1 - fraction)) / np.maximum(fraction, 1 / 255), 0, 255).round().astype(np.uint8)
cutout = Image.fromarray(np.dstack([cutout_rgb, alpha]), "RGBA")
cutout.save(PROOF / "source-cutout.png")
Image.fromarray(alpha).save(PROOF / "extraction-mask.png")

# Match two unobstructed material swatches from the adjacent category image.
reference = np.array(Image.open(ASSETS / "cutlery-meal-kits-v1.png").convert("RGB"))
porcelain = np.median(reference[25:135, 1050:1380].reshape(-1, 3), axis=0)
sage = np.median(reference[950:1060, 15:100].reshape(-1, 3), axis=0)
cw, ch = 640, 480
yy, xx = np.mgrid[:ch, :cw]
plane = yy > (ch * .53 + xx * .31)
canvas = np.where(plane[..., None], sage, porcelain).astype(float)
# Subtle deterministic paper grain and broad studio illumination, background only.
grain = np.random.default_rng(20260907).normal(0, .5, (ch, cw, 1))
light = (1.5 * (xx / cw) - 1.0 * (yy / ch))[..., None]
canvas = np.clip(canvas + grain + light, 0, 255).astype(np.uint8)
backdrop = Image.fromarray(canvas, "RGB").convert("RGBA")
offset = ((cw - w) // 2, (ch - h) // 2)

# A restrained diffuse contact shadow, behind rather than over the product.
shadow_mask = Image.new("L", (cw, ch))
shadow_mask.paste(Image.fromarray((alpha * .085).astype(np.uint8)), (offset[0] + 4, offset[1] + 5))
shadow_mask = shadow_mask.filter(ImageFilter.GaussianBlur(6))
shadow = Image.new("RGBA", (cw, ch), (64, 68, 55, 0))
shadow.putalpha(shadow_mask)
backdrop = Image.alpha_composite(backdrop, shadow)
backdrop.alpha_composite(cutout, offset)
backdrop.convert("RGB").save(TARGET, optimize=True)

# Reopen the final on-disk asset: verify all retained pixels, not only a sample.
saved = np.array(Image.open(TARGET).convert("RGB"))
region = saved[offset[1]:offset[1]+h, offset[0]:offset[0]+w]
opaque = alpha == 255
assert np.array_equal(region[opaque], src[opaque]), "Opaque product pixels changed"
assert np.array_equal(region[printed], src[printed]), "Red print pixels changed"
assert sha256(SOURCE.read_bytes()).hexdigest() == source_hash, "Original source was modified"
report = {
    "method": "Border-connected near-white extraction, native-size pixel compositing; no AI redraw",
    "source": str(SOURCE), "output": str(TARGET), "source_sha256": source_hash,
    "source_size": [w, h], "output_size": [cw, ch], "source_offset": list(offset),
    "retained_pixels_exact": int(opaque.sum()), "red_print_pixels_exact": int(printed.sum()),
    "contour_matte_pixels": int(((alpha > 0) & (alpha < 255)).sum()),
    "porcelain_sample": porcelain.tolist(), "sage_sample": sage.tolist(),
    "original_unchanged": True, "retained_pixels_unchanged": True,
}
(PROOF / "verification.json").write_text(json.dumps(report, indent=2), encoding="utf-8")

# Asset comparison only: this is not a browser screenshot or rendered-page test.
strip = Image.new("RGB", (960, 240), "#fbfaf7")
for index, asset in enumerate([ASSETS / "cutlery-meal-kits-v1.png", TARGET, ASSETS / "gloves-protective-supplies-v1.png"]):
    with Image.open(asset) as photo:
        strip.paste(photo.convert("RGB").resize((320, 240), Image.Resampling.LANCZOS), (index * 320, 0))
strip.save(PROOF / "adjacent-assets.png")
print(json.dumps(report, indent=2))
