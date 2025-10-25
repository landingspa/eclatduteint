"use client";

import React, { useState, use } from "react";
import { useTranslations, useLocale } from "next-intl";
import { products } from "@/data/products";
import { notFound } from "next/navigation";
import Link from "next/link";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const t = useTranslations("productDetail");
  const locale = useLocale();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Find product by ID from slug
  const productId = parseInt(resolvedParams.slug);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    notFound();
  }

  const getProductName = () => {
    if (locale === "vi") return product.nameVi;
    if (locale === "en") return product.nameEn;
    return product.name;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const discount = product.hasSale
    ? Math.round(
        ((product.originalPrice - product.salePrice) / product.originalPrice) *
          100
      )
    : 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#662d91]">
            Home
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#662d91]">
            Products
          </Link>
          <span>/</span>
          <span className="text-[#662d91] font-medium">{getProductName()}</span>
        </div>
      </div>

      {/* Product Detail */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div>
            <div className="relative aspect-square mb-4 overflow-hidden bg-gray-100 rounded-lg">
              <img
                src={product.image}
                alt={getProductName()}
                className="w-full h-full object-cover"
              />
              {product.hasSale && (
                <div className="absolute top-4 right-4 bg-red-500 text-white text-sm px-3 py-1 font-bold rounded">
                  {discount}% OFF
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#595757] mb-4">
              {getProductName()}
            </h1>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-600">
                ({product.reviews} {t("reviews", { count: product.reviews })})
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl font-bold text-[#662d91]">
                  {formatPrice(product.salePrice)}원
                </span>
                {product.hasSale && (
                  <>
                    <span className="text-xl text-gray-400 line-through">
                      {formatPrice(product.originalPrice)}원
                    </span>
                    <span className="bg-red-500 text-white text-sm px-2 py-1 rounded font-bold">
                      -{discount}%
                    </span>
                  </>
                )}
              </div>
              {product.hasSale && (
                <p className="text-sm text-gray-600">
                  {t("saved")}:{" "}
                  <span className="font-bold text-red-500">
                    {formatPrice(product.originalPrice - product.salePrice)}원
                  </span>
                </p>
              )}
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 my-6"></div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#595757] mb-2">
                {t("quantity")}
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded">
                  <button
                    onClick={decreaseQuantity}
                    className="px-4 py-2 hover:bg-gray-100 transition"
                  >
                    -
                  </button>
                  <span className="px-6 py-2 border-x border-gray-300 font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={increaseQuantity}
                    className="px-4 py-2 hover:bg-gray-100 transition"
                  >
                    +
                  </button>
                </div>
                <span className="text-gray-600">
                  {t("total")}:{" "}
                  <span className="font-bold text-[#662d91]">
                    {formatPrice(product.salePrice * quantity)}원
                  </span>
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <button className="flex-1 bg-[#662d91] text-white py-3 px-6 rounded-lg font-bold hover:bg-[#552577] transition">
                {t("addToCart")}
              </button>
              <button className="flex-1 bg-white text-[#662d91] border-2 border-[#662d91] py-3 px-6 rounded-lg font-bold hover:bg-[#662d91] hover:text-white transition">
                {t("buyNow")}
              </button>
            </div>

            {/* Wishlist */}
            <button className="w-full flex items-center justify-center gap-2 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
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
              <span>{t("addToWishlist")}</span>
            </button>

            {/* Product Features */}
            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 text-[#662d91] flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <div>
                  <h3 className="font-bold text-[#595757]">
                    {t("features.freeShipping.title")}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {t("features.freeShipping.desc")}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 text-[#662d91] flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <div>
                  <h3 className="font-bold text-[#595757]">
                    {t("features.authentic.title")}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {t("features.authentic.desc")}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 text-[#662d91] flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <div>
                  <h3 className="font-bold text-[#595757]">
                    {t("features.support.title")}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {t("features.support.desc")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description Tabs */}
        <div className="mt-12">
          <div className="border-b border-gray-200">
            <div className="flex gap-8">
              <button className="pb-4 border-b-2 border-[#662d91] text-[#662d91] font-bold">
                {t("tabs.description")}
              </button>
              <button className="pb-4 text-gray-600 hover:text-[#662d91]">
                {t("tabs.ingredients")}
              </button>
              <button className="pb-4 text-gray-600 hover:text-[#662d91]">
                {t("tabs.howToUse")}
              </button>
              <button className="pb-4 text-gray-600 hover:text-[#662d91]">
                {t("tabs.reviews")}
              </button>
            </div>
          </div>
          <div className="py-8">
            <p className="text-gray-700 leading-relaxed">
              {t("descriptionPlaceholder")}
            </p>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-[#595757] mb-6">
            {t("relatedProducts")}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products
              .filter(
                (p) => p.category === product.category && p.id !== product.id
              )
              .slice(0, 4)
              .map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/products/${relatedProduct.id}`}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-square mb-4 overflow-hidden bg-gray-100 rounded-lg">
                    <img
                      src={relatedProduct.image}
                      alt={
                        locale === "vi"
                          ? relatedProduct.nameVi
                          : locale === "en"
                          ? relatedProduct.nameEn
                          : relatedProduct.name
                      }
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-sm font-bold text-[#595757] mb-2 line-clamp-2">
                    {locale === "vi"
                      ? relatedProduct.nameVi
                      : locale === "en"
                      ? relatedProduct.nameEn
                      : relatedProduct.name}
                  </h3>
                  <p className="text-sm font-bold text-[#662d91]">
                    {formatPrice(relatedProduct.salePrice)}원
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
