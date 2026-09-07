/** The measured viewport excludes the two editorial gutters. */
export function galleryDistance(railWidth: number, viewportWidth: number, gutters: number) {
  return Math.max(0, railWidth - Math.max(0, viewportWidth - gutters));
}

export function galleryProgress(offset: number, distance: number) {
  return distance > 0 ? Math.min(1, Math.max(0, offset / distance)) : 0;
}
