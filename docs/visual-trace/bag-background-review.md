# Bag background replacement review — 2026-09-06

User feedback: the supplied bag photograph's white background does not match the other category studio images. Changing the surrounding CSS mat did not solve this.

## Built-in image edit attempt

Tool: built-in image generation/editing, not API/CLI.

Edit target: `public/assets/catalog/2026-09-r1/carry-shopping-bags-source-master-v1.png`.
Style reference: `public/assets/catalog/2026-09-r1/cutlery-meal-kits-v1.png`.

Output: `C:/Users/Administrator/.codex/generated_images/01a06a9e-07a7-76f1-b477-0041780f864b/exec-25b82552-20c0-4dda-ab43-19b7ef4b9f1a.png`.

Decision: REJECT for site use. Background palette is closer, but the red warning text and printing were regenerated. This is not a faithful background-only edit. The output has not been copied into public or referenced by the website.

## Exact prompt

Use case: precise-object-edit / background replacement. Asset: one landscape 4:3 category photograph for an existing B2B packaging website. Image 1 is the EDIT TARGET (two white PE T-shirt bags with red THANK YOU print). Image 2 is BACKGROUND STYLE REFERENCE ONLY (cutlery studio scene); do not include any cutlery or props from it. Replace ONLY the plain white background of Image 1 with the same matte light warm-mineral studio surface and muted pale sage diagonal lower plane seen in Image 2. Match its off-white upper background and grey-sage lower area, subtle paperlike texture and soft side light. Keep both bag silhouettes, two-bag count, handles, overlapping arrangement, original proportions, white plastic, creases and exact original red printing completely unchanged. Preserve all existing rows, letter spacing and small-print blocks from source photograph; do not retype, enhance, correct or invent the text. Keep the source product photographic pixels as faithfully as possible. Entire two bags visible with comfortable margins within landscape 4:3 framing. Add only very subtle natural contact shadow on new background. No border, no white mat, no labels, no new logos, no added objects, no webpage/UI, no changes to product colors. Output just one finished full-bleed product image.

## Safe next step

Ask permission for deterministic local background extraction/compositing, preserving source product pixels. Original file remains intact. The separate category/detail image-height correction is implemented without changing any product photograph.

## Approved local compositing — 2026-09-07

User approved the proposed local extraction/compositing method. Implemented with Pillow and NumPy in `scripts/compose-bag-background.py`, not generative editing.

- Source composite: `public/assets/catalog/2026-09-r1/carry-shopping-bags-sage-composite-v2.png`, 640 × 480.
- Website delivery asset: `public/assets/catalog/2026-09-r1/carry-shopping-bags-sage-composite-v2.webp`, lossless and pixel-identical to the PNG.
- The original 550 × 398 photograph is not resized; its product pixels are placed at (45, 41).
- Only border-connected near-white background is removed. A one-pixel contour band is decontaminated to remove white matte; no whole-product filtering or sharpening.
- 82,408 opaque product pixels and all 19,474 detected red-print pixels are exactly identical to the source in the saved PNG. 1,850 contour pixels receive edge matting.
- Background colours are sampled from unobstructed areas in the neighbouring cutlery image; a soft diagonal sage plane, subtle grain and background-only contact shadow are added.
- Source SHA-256 stays `1f2b5e31ef493e08bc2a80e0018c806b9b1c4616899cea588ba431bb2db07384`.
- Proof outputs: `output/bag-background-proof/verification.json`, `extraction-mask.png`, `source-cutout.png`, `adjacent-assets.png`.
- Homepage, range directory and bag category/family pages share the replacement. HTML image dimensions are updated to 640 × 480. Outer padding now matches other gallery images; obsolete white/radial mats are removed.
- Inspected the saved composite, mask and side-by-side asset comparison. These are asset checks, not a browser screenshot or rendered-page acceptance.
