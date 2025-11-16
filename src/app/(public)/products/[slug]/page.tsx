"use client";

import React, { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { products } from "@/data/products";
import { notFound, useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { addToCart } from "@/utils/cart";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const t = useTranslations("productDetail");
  const locale = useLocale();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Find product by ID (slug param contains the ID)
  const productId = parseInt(slug);
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

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    addToCart(product, quantity);
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 1500);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push("/cart");
  };

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
            {/* Main Image */}
            <div className="relative aspect-square mb-4 overflow-hidden bg-gray-100 rounded-lg">
              <img
                src={
                  product.detailImages && product.detailImages.length > 0
                    ? product.detailImages[selectedImage]
                    : product.image
                }
                alt={getProductName()}
                className="w-full h-full object-cover"
              />
              {product.hasSale && (
                <div className="absolute top-4 right-4 bg-red-500 text-white text-sm px-3 py-1 font-bold rounded">
                  SALE
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.detailImages && product.detailImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.detailImages.slice(0, 4).map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square overflow-hidden bg-gray-100 rounded border-2 transition ${
                      selectedImage === index
                        ? "border-[#662d91]"
                        : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${getProductName()} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
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
              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className={`flex-1 py-3 px-6 rounded-lg font-bold transition flex items-center justify-center gap-2 ${
                  isAddingToCart
                    ? "bg-green-500 text-white"
                    : "bg-[#662d91] text-white hover:bg-[#552577]"
                }`}
              >
                {isAddingToCart ? (
                  <>
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Đã thêm vào giỏ!
                  </>
                ) : (
                  t("addToCart")
                )}
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 bg-white text-[#662d91] border-2 border-[#662d91] py-3 px-6 rounded-lg font-bold hover:bg-[#662d91] hover:text-white transition"
              >
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

        {/* Product Description Section */}
        <div className="mt-12">
          <div className="border-b border-gray-200 mb-8">
            <div className="flex gap-8">
              <button className="pb-4 border-b-2 border-[#662d91] text-[#662d91] font-bold">
                상세정보
              </button>
              <button className="pb-4 text-gray-600 hover:text-[#662d91]">
                구매평 ({product.reviews})
              </button>
              <button className="pb-4 text-gray-600 hover:text-[#662d91]">
                Q&A (0)
              </button>
            </div>
          </div>

          {/* Detail Images */}
          <div className="space-y-4">
            {product.detailImages && product.detailImages.length > 0 ? (
              product.detailImages.map((img, index) => (
                <div
                  key={index}
                  className="w-full max-w-4xl mx-auto overflow-hidden"
                >
                  <img
                    src={img}
                    alt={`${getProductName()} detail ${index + 1}`}
                    className="w-full h-auto"
                    loading="lazy"
                  />
                </div>
              ))
            ) : (
              <div className="py-12 text-center">
                <div className="bg-gray-100 rounded-lg p-12">
                  <svg
                    className="w-16 h-16 mx-auto mb-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-gray-600">{getProductName()}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    상세 이미지가 준비 중입니다
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Product Information Table */}
          <div className="mt-12 border-t border-gray-200 pt-8">
            <h3 className="text-lg font-bold text-[#595757] mb-4">
              상품정보 제공고시
            </h3>
            <div className="bg-gray-50 rounded-lg p-6 space-y-3 text-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="font-medium text-gray-700">배송 방법</div>
                <div className="md:col-span-2 text-gray-600">택배</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="font-medium text-gray-700">배송비</div>
                <div className="md:col-span-2 text-gray-600">
                  3,500원 (50,000원 이상 무료배송)
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="font-medium text-gray-700">제조국</div>
                <div className="md:col-span-2 text-gray-600">상품상세 참조</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="font-medium text-gray-700">
                  사용기한 또는 개봉 후 사용기간
                </div>
                <div className="md:col-span-2 text-gray-600">상품상세 참조</div>
              </div>
            </div>
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
