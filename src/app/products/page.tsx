"use client";

import React, { useState, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import { products, type Product } from "@/data/products";
import Link from "next/link";

const ProductsPage = () => {
  const t = useTranslations("productsPage");
  const locale = useLocale();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: t("categories.all") },
    { id: "sets", label: t("categories.sets") },
    { id: "cleansing", label: t("categories.cleansing") },
    { id: "toner", label: t("categories.toner") },
    { id: "peeling", label: t("categories.peeling") },
    { id: "serum", label: t("categories.serum") },
    { id: "lotion", label: t("categories.lotion") },
    { id: "mask", label: t("categories.mask") },
    { id: "kit", label: t("categories.kit") },
    { id: "tools", label: t("categories.tools") },
  ];

  // Filter products based on selected category
  const filteredProducts = useMemo(() => {
    if (selectedCategory === "all") {
      return products;
    }
    return products.filter((product) => product.category === selectedCategory);
  }, [selectedCategory]);

  const formatPrice = (price: number) => {
    return price.toLocaleString("ko-KR");
  };

  const getProductName = (product: Product) => {
    if (locale === "vi") return product.nameVi;
    if (locale === "en") return product.nameEn;
    return product.name;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div
        className="relative h-[390px] md:min-h-screen flex items-center justify-center"
        style={{
          backgroundImage:
            "url(https://cdn.imweb.me/thumbnail/20231122/87cf5293b6d08.png)",
          backgroundSize: "cover",
          backgroundPosition: "50% 50%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="text-center px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-[#662d91] mb-4">
            {t("hero.title")}
          </h1>
          <p className="text-lg md:text-xl text-[#662d91] mb-6">
            {t("hero.subtitle")}
          </p>
          <p className="text-sm text-[#595757] leading-relaxed">
            {t("hero.description.line1")}
          </p>
          <p className="text-sm text-[#595757] leading-relaxed">
            {t("hero.description.line2")}
          </p>
        </div>
      </div>

      {/* Spacer */}
      <div className="h-24"></div>

      {/* Category Menu */}
      <div className="container mx-auto px-4 mb-8">
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 text-sm md:text-base transition-colors ${
                selectedCategory === category.id
                  ? "text-[#662d91] font-bold border-b-2 border-[#662d91]"
                  : "text-[#595757] hover:text-[#662d91]"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group cursor-pointer"
            >
              {/* Product Image */}
              <div className="relative aspect-square mb-4 overflow-hidden bg-gray-100">
                <img
                  src={product.image}
                  alt={getProductName(product)}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                {product.hasSale && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 font-bold">
                    {t("labels.sale")}
                  </div>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="text-center text-white px-4">
                    <h3 className="text-sm md:text-base font-bold mb-2">
                      {getProductName(product)}
                    </h3>
                    <p className="text-lg font-bold">
                      {formatPrice(product.salePrice)}원
                    </p>
                    {product.hasSale && (
                      <p className="text-sm line-through opacity-70">
                        {formatPrice(product.originalPrice)}원
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="text-center">
                <h3 className="text-sm md:text-base font-bold text-[#595757] mb-2 line-clamp-2">
                  {getProductName(product)}
                </h3>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <p className="text-sm md:text-base font-bold text-[#595757]">
                    {formatPrice(product.salePrice)}원
                  </p>
                  {product.hasSale && (
                    <p className="text-xs md:text-sm text-gray-400 line-through">
                      {formatPrice(product.originalPrice)}원
                    </p>
                  )}
                </div>

                {/* Icons */}
                <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                      />
                    </svg>
                    {product.reviews}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
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
                    {product.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Spacer */}
      <div className="h-12"></div>
    </div>
  );
};

export default ProductsPage;
