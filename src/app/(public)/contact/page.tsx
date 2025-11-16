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
              className="text-base leading-relaxed mb-6"
              style={{ color: "#525252" }}
            >
              {t("contactPage.hero.description")}{" "}
              <strong style={{ color: "#662d91" }}>
                {t("contactPage.hero.kakaoHighlight")}
              </strong>{" "}
              {t("contactPage.hero.descriptionEnd")}
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <a
                href={t("contactPage.contact.facebook")}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 text-white rounded-lg hover:opacity-90 transition-opacity inline-flex items-center gap-2"
                style={{ backgroundColor: "#1877F2" }}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                {t("contactPage.board.facebookLink")}
              </a>
              <a
                href={t("contactPage.contact.zalo")}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 text-white rounded-lg hover:opacity-90 transition-opacity inline-flex items-center gap-2"
                style={{ backgroundColor: "#0068FF" }}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 15.318c-.163.269-.538.527-.917.527-.163 0-.325-.054-.487-.163l-3.706-2.434v2.434c0 .433-.325.758-.758.758s-.758-.325-.758-.758V9.318c0-.379.271-.704.65-.758.379-.054.704.162.866.487l3.706 5.624V9.318c0-.433.325-.758.758-.758s.758.325.758.758v5.082c0 .271-.054.542-.217.758zm-7.788 0c-.163.269-.538.527-.917.527-.163 0-.325-.054-.487-.163L5.106 13.25v2.434c0 .433-.325.758-.758.758s-.758-.325-.758-.758V9.318c0-.379.271-.704.65-.758.379-.054.704.162.866.487l3.706 5.624V9.318c0-.433.325-.758.758-.758s.758.325.758.758v5.082c0 .271-.054.542-.217.758z" />
                </svg>
                {t("contactPage.board.zaloLink")}
              </a>
            </div>
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
