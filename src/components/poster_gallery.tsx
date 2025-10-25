"use client";

import { ImageLightbox } from "./image_lightbox";

const galleryImages = [
  "https://cdn.imweb.me/thumbnail/20231221/bf1496094f4ee.jpg",
  "https://cdn.imweb.me/thumbnail/20231221/a11bcd6e764d8.jpg",
  "https://cdn.imweb.me/thumbnail/20231221/029ce8230f7b0.jpg",
  "https://cdn.imweb.me/thumbnail/20231212/e9bc760028531.jpg",
  "https://cdn.imweb.me/thumbnail/20231221/77d5a105887ba.jpg",
  "https://cdn.imweb.me/thumbnail/20231212/9fec60bf6c953.jpg",
  "https://cdn.imweb.me/thumbnail/20231212/9f449f59cae16.jpg",
  "https://cdn.imweb.me/thumbnail/20231212/e7da6b73072df.jpg",
  "https://cdn.imweb.me/thumbnail/20231212/77b34cd84e6c7.jpg",
  "https://cdn.imweb.me/thumbnail/20231212/0b4fc2764950e.jpg",
  "https://cdn.imweb.me/thumbnail/20231212/984f9de470e76.jpg",
  "https://cdn.imweb.me/thumbnail/20231212/ab6fbe10b74aa.jpg",
  "https://cdn.imweb.me/thumbnail/20231212/62bbd30615eba.jpg",
  "https://cdn.imweb.me/thumbnail/20231212/e9bc760028531.jpg",
  "https://cdn.imweb.me/thumbnail/20231212/2220464557629.jpg",
  "https://cdn.imweb.me/thumbnail/20231212/db0d9dc719afe.jpg",
  "https://cdn.imweb.me/thumbnail/20231212/6028f3e298d9e.jpg",
  "https://cdn.imweb.me/thumbnail/20231212/65a89423e9406.jpg",
  "https://cdn.imweb.me/thumbnail/20231212/a8fa59be0e2c1.jpg",
  "https://cdn.imweb.me/thumbnail/20231212/a368013f53ff8.jpg",
  "https://cdn.imweb.me/thumbnail/20231212/6e6850836a78b.jpg",
  "https://cdn.imweb.me/thumbnail/20231212/71a5133394e54.jpg",
  "https://cdn.imweb.me/thumbnail/20231212/677fa8a48be62.jpg",
  "https://cdn.imweb.me/thumbnail/20231212/ace9e7935f078.jpg",
  "https://cdn.imweb.me/thumbnail/20231212/0b1fd8fbdc775.jpg",
  "https://cdn.imweb.me/thumbnail/20231212/1358ccf61fbf5.jpg",
  "https://cdn.imweb.me/thumbnail/20231212/02cd719e9e0ba.jpg",
  "https://cdn.imweb.me/thumbnail/20231212/94879b7333775.jpg",
  "https://cdn.imweb.me/thumbnail/20231212/7b363cb6bc314.jpg",
  "https://cdn.imweb.me/thumbnail/20231212/4e895463576a3.jpg",
  "https://cdn.imweb.me/thumbnail/20231212/0c1cf997c0b65.jpg",
  "https://cdn.imweb.me/thumbnail/20231212/09ceeacf6da0e.jpg",
  "https://cdn.imweb.me/thumbnail/20231212/19e288385e51b.jpg",
  "https://cdn.imweb.me/thumbnail/20231212/00ef83dd16f47.jpg",
  "https://cdn.imweb.me/thumbnail/20231212/23536dfd7ce92.jpg",
  "https://cdn.imweb.me/thumbnail/20231212/d42cef016d18c.jpg",
];

const galleryAlts = galleryImages.map((_, i) => `Gallery ${i + 1}`);

export function PosterGallery() {
  return <ImageLightbox images={galleryImages} alts={galleryAlts} />;
}
