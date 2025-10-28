"use client";

import Image from "next/image";

export default function FloatingButtons() {
  return (
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
  );
}
