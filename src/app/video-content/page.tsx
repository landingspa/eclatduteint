"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";

type Props = {};

const Page = (props: Props) => {
  const t = useTranslations();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const videos = [
    {
      id: 1,
      thumbnail: `https://cdn.imweb.me/thumbnail/20240111/9bec49d81d36e.jpg`,
      date: "2024-01-11",
      views: 360,
      youtubeId: "wyfYTcqvSz8",
    },
    {
      id: 2,
      thumbnail: `https://cdn.imweb.me/thumbnail/20240111/0a140a85d7bae.jpg`,
      date: "2024-01-11",
      views: 413,
      youtubeId: "qnkaX6q27_4",
    },
    {
      id: 3,
      thumbnail: `https://cdn.imweb.me/thumbnail/20240111/0c331dc2c70e9.jpg`,
      date: "2024-01-11",
      views: 453,
      youtubeId: "-c1oXFcRHx8",
    },
    {
      id: 4,
      thumbnail: `https://cdn.imweb.me/thumbnail/20240111/e98fbccd3713a.jpg`,
      date: "2024-01-11",
      views: 455,
      youtubeId: "8isNdkAB9bo",
    },
    {
      id: 5,
      thumbnail: `https://cdn.imweb.me/thumbnail/20240111/be42c9ee0fb48.jpg`,
      date: "2024-01-11",
      views: 732,
      youtubeId: "w-PxmjIoP3w",
    },
    {
      id: 6,
      thumbnail: `https://cdn.imweb.me/thumbnail/20240111/91438bf90a4a8.jpg`,
      date: "2024-01-11",
      views: 430,
      youtubeId: "2VqgpdA2WFA",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        className="relative flex items-center justify-center bg-cover bg-center bg-no-repeat md:min-h-screen"
        style={{
          backgroundImage:
            "url('https://cdn.imweb.me/thumbnail/20240111/50653d652c30b.png')",
          height: "390px",
          backgroundColor: "#f5f5f5",
        }}
      >
        <div className="text-center px-4 relative z-10">
          <h1
            className="text-2xl md:text-3xl font-bold mb-3"
            style={{ color: "#662d91" }}
          >
            {t("videoContent.hero.title")}
          </h1>
          <p className="text-base md:text-xl mb-6" style={{ color: "#662d91" }}>
            {t("videoContent.hero.subtitle")}
          </p>
          <div
            className="text-xs md:text-sm"
            style={{ color: "#595757", lineHeight: "1.15" }}
          >
            <p>{t("videoContent.hero.description")}</p>
            <p>{t("videoContent.hero.descriptionLine2")}</p>
          </div>
        </div>
      </section>

      {/* Video Grid Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {t("videoContent.header.title")}{" "}
            <span className="text-gray-500">
              {t("videoContent.header.count")}
            </span>
          </h2>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {videos.map((video) => (
            <div
              key={video.id}
              className="group cursor-pointer transition-transform hover:scale-105"
              onClick={() => setSelectedVideo(video.youtubeId)}
            >
              {/* Thumbnail */}
              <div className="relative overflow-hidden rounded-lg mb-4 aspect-video">
                <img
                  src={video.thumbnail}
                  alt={t(`videoContent.videos.${video.id}.title`)}
                  className="w-full h-full object-cover"
                />
                {/* Play Icon Overlay */}
              </div>

              {/* Content */}
              <div>
                <h3 className="text-sm font-semibold mb-2 line-clamp-2 group-hover:text-purple-700 transition-colors">
                  {t(`videoContent.videos.${video.id}.title`)}
                </h3>
                <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                  {t(`videoContent.videos.${video.id}.description`)}
                </p>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{video.date}</span>
                  <span>
                    <i className="mr-1">{t("videoContent.meta.views")}</i>
                    {video.views}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* YouTube Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="relative w-full max-w-5xl aspect-video bg-black rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full flex items-center justify-center transition-all"
              aria-label="Close"
            >
              <svg
                className="w-6 h-6 text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* YouTube Iframe */}
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
