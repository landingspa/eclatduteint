"use client";

import { useState } from "react";

interface ImageLightboxProps {
  images: string[];
  alts: string[];
}

export function ImageLightbox({ images, alts }: ImageLightboxProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const goToPrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage(
        selectedImage === 0 ? images.length - 1 : selectedImage - 1
      );
    }
  };

  const goToNext = () => {
    if (selectedImage !== null) {
      setSelectedImage(
        selectedImage === images.length - 1 ? 0 : selectedImage + 1
      );
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") goToPrevious();
    if (e.key === "ArrowRight") goToNext();
  };

  return (
    <>
      {/* Image Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-5">
        {images.map((src, index) => (
          <div key={index} className="aspect-square cursor-pointer">
            <img
              src={src}
              alt={alts[index]}
              className="w-full h-full object-cover hover:opacity-80 transition-opacity"
              onClick={() => openLightbox(index)}
            />
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 z-50"
            onClick={closeLightbox}
          >
            ×
          </button>

          {/* Previous Button */}
          <button
            className="absolute left-4 text-white text-4xl hover:text-gray-300 z-50"
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
          >
            ‹
          </button>

          {/* Next Button */}
          <button
            className="absolute right-4 text-white text-4xl hover:text-gray-300 z-50"
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
          >
            ›
          </button>

          {/* Image */}
          <img
            src={images[selectedImage]}
            alt={alts[selectedImage]}
            className="max-w-[90%] max-h-[90%] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
            {selectedImage + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
