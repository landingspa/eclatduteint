"use client";

import React from "react";
import { useTranslations } from "next-intl";

type Props = {};

const Page = (props: Props) => {
  const t = useTranslations();

  // Sample posts data
  const posts = [
    {
      id: 1,
      title: t("contactPage.posts.secret"),
      author: "르모엘",
      date: "2025-09-25",
      views: 1,
      comments: 1,
      isSecret: true,
    },
    {
      id: 2,
      title: "상호변경",
      author: "스킨메르피부연구소",
      date: "2025-09-16",
      views: 34,
      comments: 1,
      isSecret: false,
    },
    {
      id: 3,
      title: "안녕하세요",
      author: "왁싱포인트",
      date: "2025-09-14",
      views: 37,
      comments: 1,
      isSecret: false,
    },
    {
      id: 4,
      title: t("contactPage.posts.secret"),
      author: "오늘의케어",
      date: "2025-09-09",
      views: 2,
      comments: 1,
      isSecret: true,
    },
    {
      id: 5,
      title: "디엠 확인해주세요!",
      author: "송아영",
      date: "2025-09-07",
      views: 40,
      comments: 1,
      isSecret: false,
    },
    {
      id: 6,
      title: "클렌징브러시 디바이스",
      author: "고정연",
      date: "2025-09-05",
      views: 49,
      comments: 1,
      isSecret: false,
    },
    {
      id: 7,
      title: t("contactPage.posts.secret"),
      author: "김수민",
      date: "2025-07-18",
      views: 5,
      comments: 1,
      isSecret: true,
    },
    {
      id: 8,
      title: "홈페이지",
      author: "예뻐지는 날",
      date: "2025-07-08",
      views: 60,
      comments: 1,
      isSecret: false,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[400px] flex items-center justify-center bg-white">
        <div className="text-center px-4">
          <h1
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ color: "#662d91" }}
          >
            {t("contactPage.hero.title")}
          </h1>
          <p
            className="text-2xl md:text-3xl mb-12"
            style={{ color: "#662d91" }}
          >
            -
          </p>
          <div className="max-w-3xl mx-auto">
            <p
              className="text-base leading-relaxed"
              style={{ color: "#525252" }}
            >
              {t("contactPage.hero.description")}{" "}
              <strong style={{ color: "#662d91" }}>
                {t("contactPage.hero.kakaoHighlight")}
              </strong>{" "}
              {t("contactPage.hero.descriptionEnd")}
            </p>
          </div>
        </div>
      </section>

      {/* Q&A Board Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 className="text-2xl font-semibold">
              {t("contactPage.board.title")}{" "}
              <span className="text-gray-500">
                {t("contactPage.board.count")}
              </span>
            </h2>
            <button
              className="px-6 py-2 text-sm text-white rounded self-end md:self-auto"
              style={{ backgroundColor: "#662d91" }}
            >
              {t("contactPage.board.writeButton")}
            </button>
          </div>
        </div>

        {/* Board Table Header - Desktop Only */}
        <div
          className="hidden md:grid grid-cols-12 gap-4 py-3 px-4 border-t-2 border-b font-semibold text-sm"
          style={{ borderColor: "#662d91" }}
        >
          <div className="col-span-6">
            {t("contactPage.board.tableHeaders.title")}
          </div>
          <div className="col-span-2 text-center">
            {t("contactPage.board.tableHeaders.author")}
          </div>
          <div className="col-span-2 text-center">
            {t("contactPage.board.tableHeaders.date")}
          </div>
          <div className="col-span-1 text-center">
            {t("contactPage.board.tableHeaders.views")}
          </div>
          <div className="col-span-1 text-center">
            {t("contactPage.board.tableHeaders.likes")}
          </div>
        </div>

        {/* Board Posts List */}
        <div className="border-b">
          {posts.map((post) => (
            <div
              key={post.id}
              className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 py-4 px-4 border-b hover:bg-gray-50 transition-colors"
            >
              {/* Title */}
              <div className="md:col-span-6 flex items-center gap-2">
                {post.isSecret && (
                  <i className="icon-lock text-gray-400 text-sm">🔒</i>
                )}
                <a
                  href="#"
                  className="text-gray-800 hover:text-purple-700 transition-colors line-clamp-1"
                >
                  {post.title}
                </a>
                <span className="text-purple-600 text-xs md:hidden">
                  [{post.comments}]
                </span>
              </div>

              {/* Author */}
              <div className="md:col-span-2 text-sm text-gray-600 md:text-center">
                <span className="md:hidden font-semibold">
                  {t("contactPage.board.tableHeaders.author")}:{" "}
                </span>
                {post.author}
              </div>

              {/* Date */}
              <div className="md:col-span-2 text-sm text-gray-600 md:text-center">
                <span className="md:hidden font-semibold">
                  {t("contactPage.board.tableHeaders.date")}:{" "}
                </span>
                {post.date}
              </div>

              {/* Views */}
              <div className="md:col-span-1 text-sm text-gray-600 md:text-center">
                <span className="md:hidden">
                  {t("contactPage.board.tableHeaders.views")}:{" "}
                </span>
                {post.views}
              </div>

              {/* Likes */}
              <div className="md:col-span-1 text-sm text-gray-600 md:text-center">
                <button className="hover:text-red-500 transition-colors">
                  ❤️ 0
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Write Button - Mobile */}
        <div className="mt-6 text-right">
          <button
            className="px-6 py-2 text-sm text-white rounded"
            style={{ backgroundColor: "#662d91" }}
          >
            {t("contactPage.board.writeButton")}
          </button>
        </div>
      </section>
    </div>
  );
};

export default Page;
