"use client";

import React from "react";
import { ImageLightbox } from "./image_lightbox";

const brochureImages = [
  "https://cdn.imweb.me/thumbnail/20240612/b49a6b52037a7.jpg",
  "https://cdn.imweb.me/thumbnail/20240612/b717f2e44d07e.jpg",
  "https://cdn.imweb.me/thumbnail/20240612/5296d436f91d5.jpg",
  "https://cdn.imweb.me/thumbnail/20240612/52a5b48ccc87a.jpg",
  "https://cdn.imweb.me/thumbnail/20240612/67af988bf357a.jpg",
  "https://cdn.imweb.me/thumbnail/20240612/07edbb7c66c03.jpg",
  "https://cdn.imweb.me/thumbnail/20240612/5f9a4dc252517.jpg",
  "https://cdn.imweb.me/thumbnail/20240612/daf9a4e39c578.jpg",
  "https://cdn.imweb.me/thumbnail/20240612/69a27bb3066b6.jpg",
  "https://cdn.imweb.me/thumbnail/20240612/3e7b786b43c0f.jpg",
  "https://cdn.imweb.me/thumbnail/20240612/c6cff730df775.jpg",
];

const brochureAlts = [
  "Brochure 1",
  "Brochure 2",
  "Brochure 3",
  "Brochure 4",
  "Brochure 5",
  "Brochure 6",
  "Brochure 7",
  "Brochure 8",
  "Brochure 9",
  "Brochure 10",
  "Brochure 11",
];

export const BrochureGallery = () => {
  return <ImageLightbox images={brochureImages} alts={brochureAlts} />;
};
