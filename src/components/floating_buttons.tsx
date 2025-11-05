"use client";

import { useState } from "react";
import Image from "next/image";
import InterestModal from "./interest_modal";

export default function FloatingButtons() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        {/* Facebook Button */}
        <a
          href="https://www.facebook.com/profile.php?id=61579240127022"
          target="_blank"
          rel="noopener noreferrer"
          className="group"
          aria-label="Facebook"
        >
          <div className="w-12 h-12 lg:w-14 lg:h-14 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110 overflow-hidden">
            <Image
              src="/facebook.png"
              alt="Facebook"
              width={56}
              height={56}
              className="w-full h-full object-contain p-1"
            />
          </div>
        </a>

        {/* Zalo Button */}
        <a
          href="https://zalo.me/g/oboocy070"
          target="_blank"
          rel="noopener noreferrer"
          className="group"
          aria-label="Zalo"
        >
          <div className="w-12 h-12 lg:w-14 lg:h-14 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110 overflow-hidden">
            <Image
              src="/zalo.png"
              alt="Zalo"
              width={56}
              height={56}
              className="w-full h-full object-contain p-1"
            />
          </div>
        </a>
      </div>

      {/* Quan Tâm Button - Left Side */}
      <div className="fixed bottom-6 left-6 z-50">
        <button
          onClick={() => setIsModalOpen(true)}
          className="group bg-linear-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
          aria-label="Quan Tâm"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <span className="font-semibold">Quan Tâm</span>
        </button>
      </div>

      {/* Modal */}
      <InterestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
