"use client";

import { ImageLightbox } from "./image_lightbox";

const xBannerImages = [
  "https://cdn.imweb.me/thumbnail/20231212/57d6f24045a97.jpg",
  "https://cdn.imweb.me/thumbnail/20231212/2ea1fc7bbf3bd.jpg",
  "https://cdn.imweb.me/thumbnail/20231212/4facbfd594444.jpg",
  "https://cdn.imweb.me/thumbnail/20231212/05bd33303085a.jpg",
  "https://cdn.imweb.me/thumbnail/20231212/589a509186d66.jpg",
  "https://cdn.imweb.me/thumbnail/20231212/206f606ab475c.jpg",
  "https://cdn.imweb.me/thumbnail/20231212/19d9ef18261ef.jpg",
  "https://cdn.imweb.me/thumbnail/20231212/f7f90663a0803.jpg",
  "https://cdn.imweb.me/thumbnail/20231212/6d34f14a75e84.jpg",
  "https://cdn.imweb.me/thumbnail/20231212/785a1f7728df2.jpg",
  "https://cdn.imweb.me/thumbnail/20231212/80d07cbcd786d.jpg",
  "https://cdn.imweb.me/thumbnail/20231212/3334560106116.jpg",
  "https://cdn.imweb.me/thumbnail/20231212/49ba9827d17b8.jpg",
  "https://cdn.imweb.me/thumbnail/20231212/d4ee7c6b02114.jpg",
  "https://cdn.imweb.me/thumbnail/20231212/b7a0a92dba898.jpg",
  "https://cdn.imweb.me/thumbnail/20231212/ec0465cd44cf3.jpg",
  "https://cdn.imweb.me/thumbnail/20231212/06d723be3a9c1.jpg",
  "https://cdn.imweb.me/thumbnail/20231212/55b6248f81a1f.jpg",
  "https://cdn.imweb.me/thumbnail/20231212/556a88816ba0e.jpg",
  "https://cdn.imweb.me/thumbnail/20231212/6bf9b0549d7e8.jpg",
  "https://cdn.imweb.me/thumbnail/20231212/e8c29e16c9fc8.jpg",
  "https://cdn.imweb.me/thumbnail/20231212/a7ad5adfbafc6.jpg",
  "https://cdn.imweb.me/thumbnail/20240408/0fc04c3417265.jpg",
  "https://cdn.imweb.me/thumbnail/20240408/488966dcdde1e.jpg",
];

const xBannerAlts = Array.from(
  { length: xBannerImages.length },
  (_, i) => `X-Banner ${i + 1}`
);

export function XBannerGallery() {
  return <ImageLightbox images={xBannerImages} alts={xBannerAlts} />;
}
