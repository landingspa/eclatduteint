"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { useState, useEffect } from "react";

interface Product {
  id: string;
  titleKey: string;
  descriptionKey: string;
  image: string;
  categoryKey: string;
  url?: string;
}

export default function ProductsGridSection() {
  const t = useTranslations("productsGrid");
  const locale = useLocale();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Dữ liệu sản phẩm với link ảnh thực từ eclatduteint.com
  const productsData: Product[] = [
    {
      id: "1",
      titleKey: "products.howToUse.title",
      descriptionKey: "products.howToUse.description",
      image:
        "https://scontent-nrt1-1.cdninstagram.com/v/t51.82787-15/564815001_18071367254219262_7931405166299899002_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=111&ccb=1-7&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=nh7xgXbcQywQ7kNvwGl3A09&_nc_oc=Adnjl7xgxeeVwu3nX20PF3bXTvB0s60t4eYz3T7e3LOxlRQ-9rbaYK0caS_YER2s0ZU&_nc_zt=23&_nc_ht=scontent-nrt1-1.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=UTjn_Ptm9pefoszMT5KBVg&oh=00_Aff2g6p9MrU-3z0uHcEG875dv9xWOTusSSc2iQ9ttpVfJw&oe=68FE3BBD",
      categoryKey: "categories.guide",
      url: "/products/how-to-use",
    },
    {
      id: "2",
      titleKey: "products.ahaBhaPha.title",
      descriptionKey: "products.ahaBhaPha.description",
      image:
        "https://scontent-nrt1-2.cdninstagram.com/v/t51.82787-15/566198173_18071367014219262_8877270410067382004_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=105&ccb=1-7&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=4MujN2Ub-ugQ7kNvwEafeZB&_nc_oc=Adknscv7hDHQXggB273WQv--WadS84BY8_kJy8grF18fl9ppvJpDj76YRO2oxkGl-aQ&_nc_zt=23&_nc_ht=scontent-nrt1-2.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=UTjn_Ptm9pefoszMT5KBVg&oh=00_AfeXNBpOiTnMzbVXf90AcejOYmWwQ-itwJhcpLKMSzqBFQ&oe=68FE3B23",
      categoryKey: "categories.peeling",
      url: "/products/aha-bha-pha",
    },
    {
      id: "3",
      titleKey: "products.greenPeeling.title",
      descriptionKey: "products.greenPeeling.description",
      image:
        "https://scontent-nrt1-2.cdninstagram.com/v/t51.82787-15/565619271_18071366720219262_1495792448362862704_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=104&ccb=1-7&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=Je4XWeH0yDwQ7kNvwGJr2G7&_nc_oc=AdlhTCcLFeskmmtjnvSUtGZMWrLLXPqO2H7fuUmu0ntBWq_jCutJLZbh99KcYY8Mexo&_nc_zt=23&_nc_ht=scontent-nrt1-2.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=UTjn_Ptm9pefoszMT5KBVg&oh=00_Afen2JYdzt1Lra3oK2k5SCpKtD_XmOSCBMH8sBNmq628lg&oe=68FE1AD1",
      categoryKey: "categories.peeling",
      url: "/products/green-peeling",
    },
    {
      id: "4",
      titleKey: "products.seasonalCare.title",
      descriptionKey: "products.seasonalCare.description",
      image:
        "https://scontent-nrt1-2.cdninstagram.com/v/t51.82787-15/563362569_18071224250219262_3421902260321660271_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=110&ccb=1-7&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=nhaw7BSe34gQ7kNvwH74QcZ&_nc_oc=AdmXKxV8BO20lnMbezqkNYJP7ZPkN8vkOawnHehQpOEWgIjhnd5NI_Astmw-G11pWzA&_nc_zt=23&_nc_ht=scontent-nrt1-2.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=UTjn_Ptm9pefoszMT5KBVg&oh=00_AfeFPPH_84WZCM0V3klP2fqIrUtmRKkNeokQqy37dm6qGg&oe=68FE442A",
      categoryKey: "categories.skincare",
      url: "/products/seasonal-care",
    },
    {
      id: "5",
      titleKey: "products.seasonalGuide.title",
      descriptionKey: "products.seasonalGuide.description",
      image:
        "https://scontent-nrt1-2.cdninstagram.com/v/t51.82787-15/564906786_18071224025219262_5789924628153353801_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=100&ccb=1-7&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=bYmZjBtjCjAQ7kNvwFlI6Z2&_nc_oc=AdmksswRVX2baYjvrmebyePqTGnJtsKdKl8fGmMKCOGFwQEUWkmBOm0Jz1hDScSXrEI&_nc_zt=23&_nc_ht=scontent-nrt1-2.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=UTjn_Ptm9pefoszMT5KBVg&oh=00_Afdlv_KHRMytzkNEkT6bz1vnCi2f6J1aMPm5IxZLgvda5g&oe=68FE17A8",
      categoryKey: "categories.skincare",
      url: "/products/seasonal-transition",
    },
    {
      id: "6",
      titleKey: "products.realCareCica.title",
      descriptionKey: "products.realCareCica.description",
      image:
        "https://scontent-nrt1-1.cdninstagram.com/v/t51.82787-15/563462422_18071223332219262_2550244500710894660_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=111&ccb=1-7&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=W5n-0iXazjIQ7kNvwFFrNtZ&_nc_oc=Adlc8UIkVKzehbkdBcQQsBDgiTWQaK9HWepcIBL6Miht9FtT9Md8iyNrcpQnjaY8Ys4&_nc_zt=23&_nc_ht=scontent-nrt1-1.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=UTjn_Ptm9pefoszMT5KBVg&oh=00_AfdZHQCbMyz1ycNE8kxY12kVw2Trc22mw7JU206gp48lMg&oe=68FE2759",
      categoryKey: "categories.mask",
      url: "/products/real-care-cica",
    },
    {
      id: "7",
      titleKey: "products.realCareGalactomic.title",
      descriptionKey: "products.realCareGalactomic.description",
      image:
        "https://scontent-nrt1-1.cdninstagram.com/v/t51.82787-15/557961598_18069814355219262_5401979597665934766_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=106&ccb=1-7&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=M1vD-q5cfhcQ7kNvwGUalli&_nc_oc=AdlxoSlZaTq6FUbui4TQ0YEZqaA6BdEFFtVL1WBQDSv0bQxjdSxcszSWK56t2JLdwxE&_nc_zt=23&_nc_ht=scontent-nrt1-1.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=UTjn_Ptm9pefoszMT5KBVg&oh=00_Aff2V-_YvJKGAUGjjsJvFEJGxgqowi6-sN3lAwvatGMABw&oe=68FE247C",
      categoryKey: "categories.mask",
      url: "/products/real-care-galactomic",
    },
    {
      id: "8",
      titleKey: "products.realCare.title",
      descriptionKey: "products.realCare.description",
      image:
        "https://scontent-nrt1-2.cdninstagram.com/v/t51.82787-15/559091201_18069814319219262_2108217059239622322_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=100&ccb=1-7&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=-J9_I7aVtHEQ7kNvwFLRC8E&_nc_oc=AdlidhY6A58b5eL3XJROewJ6XrXxpJo5cGnQNjc9pvu2cBrc7NVeGRhrI6MxfByBn4k&_nc_zt=23&_nc_ht=scontent-nrt1-2.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=UTjn_Ptm9pefoszMT5KBVg&oh=00_AffV5SKLEAYJfg8p3z0ORxspJbOKY_-bg4iKnz-HgZDBwg&oe=68FE477E",
      categoryKey: "categories.mask",
      url: "/products/real-care",
    },
    {
      id: "9",
      titleKey: "products.cica85.title",
      descriptionKey: "products.cica85.description",
      image:
        "https://scontent-nrt1-2.cdninstagram.com/v/t51.82787-15/558084970_18069814283219262_3992648450785993412_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=100&ccb=1-7&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=dYxylVTp6uYQ7kNvwH-i4lF&_nc_oc=AdmZV-YZ5e0VlUPxw53OtxkN3cVEQluuEgTZdHFi-C_wKStQ-X8s5ul3tYgyLaRgQPY&_nc_zt=23&_nc_ht=scontent-nrt1-2.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=UTjn_Ptm9pefoszMT5KBVg&oh=00_AfcNQPhSoSRnTRjkStITXIQ91wxiFtBCpCkDG-SQAqt9Mw&oe=68FE475D",
      categoryKey: "categories.mask",
      url: "/products/cica-85",
    },
    {
      id: "10",
      titleKey: "products.doubleCare.title",
      descriptionKey: "products.doubleCare.description",
      image:
        "https://scontent-nrt1-1.cdninstagram.com/v/t51.71878-15/562678943_1139480481037130_2126936283672025169_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=111&ccb=1-7&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0xJUFMuYmVzdF9pbWFnZV91cmxnZW4uQzMifQ%3D%3D&_nc_ohc=a1csMTOXHXQQ7kNvwGXV92y&_nc_oc=Adnl1bfmcVpJJrWm-IgDtqWstPhAM3jxwQ7uN0murwQPkWiOU0vq6wfSYjcIoVYcX6Q&_nc_zt=23&_nc_ht=scontent-nrt1-1.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=UTjn_Ptm9pefoszMT5KBVg&oh=00_AfcxlmHHmB-nGjS7h7857zOeJPSgigtdfHwTwQvgCigBtg&oe=68FE3B9B",
      categoryKey: "categories.set",
      url: "/products/double-care-set",
    },
    {
      id: "11",
      titleKey: "products.realCareClinic.title",
      descriptionKey: "products.realCareClinic.description",
      image:
        "https://scontent-nrt1-2.cdninstagram.com/v/t51.82787-15/559300072_18069814223219262_4376096561787792715_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=104&ccb=1-7&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=Z8g533luY8AQ7kNvwFqPLGi&_nc_oc=Adm0LwQpwfk0Qtnumj5X9qUSt61gsTPE1Uf-XB-2cOArGT9yWapMgtJ-9G3eUhFFnHM&_nc_zt=23&_nc_ht=scontent-nrt1-2.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=UTjn_Ptm9pefoszMT5KBVg&oh=00_AffJOG5rU1JzNpBa7mWQrQ6kk3thztOmB5TfZyyb9TvgyA&oe=68FE3795",
      categoryKey: "categories.mask",
      url: "/products/real-care-clinic",
    },
    {
      id: "12",
      titleKey: "products.galactomicMoisture.title",
      descriptionKey: "products.galactomicMoisture.description",
      image:
        "https://scontent-nrt1-2.cdninstagram.com/v/t51.82787-15/558187689_18069706184219262_6736968307420496912_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=102&ccb=1-7&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=o1eStZ-xENMQ7kNvwET4FSF&_nc_oc=AdkO75cQq3XhvwPdT7zP9R0BO9IVVCmprfJkbOYWQABPeczdu5Wiz_kGhQtYKsxCfS8&_nc_zt=23&_nc_ht=scontent-nrt1-2.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=UTjn_Ptm9pefoszMT5KBVg&oh=00_AffZ1QJE3RWbwiH3LHFRVQrtde0mAu7JZFQLJmLTWh7y7A&oe=68FE1CBA",
      categoryKey: "categories.mask",
      url: "/products/galactomic-moisture",
    },
    {
      id: "13",
      titleKey: "products.cicaAllInOne.title",
      descriptionKey: "products.cicaAllInOne.description",
      image:
        "https://scontent-nrt1-1.cdninstagram.com/v/t51.82787-15/557532950_18069706010219262_3668764801173944564_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=111&ccb=1-7&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=_ETP_3jOeJ8Q7kNvwFfH_aq&_nc_oc=AdmWpIXeU42BwefZNJ4X2FGQpn3dbQ2ljZOukKPLdGIfou6JbHdKQl5JP5pfZi5Nz60&_nc_zt=23&_nc_ht=scontent-nrt1-1.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=UTjn_Ptm9pefoszMT5KBVg&oh=00_AffwpWmGg9vEfLnm0JB5XJN6RYvDEEQbXkT0MK6-W10N5Q&oe=68FE1D21",
      categoryKey: "categories.mask",
      url: "/products/cica-all-in-one",
    },
    {
      id: "14",
      titleKey: "products.realCareHome.title",
      descriptionKey: "products.realCareHome.description",
      image:
        "https://scontent-nrt1-1.cdninstagram.com/v/t51.82787-15/558507433_18069705983219262_6210237021499765466_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=109&ccb=1-7&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=KXgw68JNr1EQ7kNvwGai_mL&_nc_oc=Adl-ftmWmHlEbICwpszC9BTfRFXFnLpwAAw8idcGjONfVNak39ucOTfFwOJFZhJIgoc&_nc_zt=23&_nc_ht=scontent-nrt1-1.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=UTjn_Ptm9pefoszMT5KBVg&oh=00_AffCi3DZstqBuccOWExYeOeOtAQt8FJjawZZhUSyKvd0-g&oe=68FE1E21",
      categoryKey: "categories.mask",
      url: "/products/real-care-home",
    },
    {
      id: "15",
      titleKey: "products.clarifyingVsRelief.title",
      descriptionKey: "products.clarifyingVsRelief.description",
      image:
        "https://scontent-nrt1-2.cdninstagram.com/v/t51.82787-15/559005518_18069705950219262_87934896456754145_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=101&ccb=1-7&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=GhCFumn-QCkQ7kNvwF9BSpU&_nc_oc=Adn5oTUJ-mokcDzcXSLrgedCeAFxFx2YpxcrDuHk4eyNj9vSLwcrCFn0Mp9ljAGsv2M&_nc_zt=23&_nc_ht=scontent-nrt1-2.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=UTjn_Ptm9pefoszMT5KBVg&oh=00_AfeV-7Cip5x2MEwva2OmkV_2AAjINTrOqNBPdJuoC7T2cw&oe=68FE26C3",
      categoryKey: "categories.skincare",
      url: "/products/clarifying-vs-relief",
    },
    {
      id: "16",
      titleKey: "products.troubleCareRoutine.title",
      descriptionKey: "products.troubleCareRoutine.description",
      image:
        "https://scontent-nrt1-1.cdninstagram.com/v/t39.30808-6/557302914_1158219329740811_5585780704376406751_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=109&ccb=1-7&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=bxBWJPbedhcQ7kNvwF8bsTQ&_nc_oc=AdmB76WHC09wez_kTJ0gUktPxg7d4LZ1RYT2YIbaZ44iqeQ-6a8oSpgWJgHeUFg3mOQ&_nc_zt=23&_nc_ht=scontent-nrt1-1.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=UTjn_Ptm9pefoszMT5KBVg&oh=00_Aff6OesyJKTrs9AVkHEnRS6pFQlkV-pDIKc68-cmwYr1Bw&oe=68FE368C",
      categoryKey: "categories.skincare",
      url: "/products/trouble-care-routine",
    },
    {
      id: "17",
      titleKey: "products.reliefSolutionReview.title",
      descriptionKey: "products.reliefSolutionReview.description",
      image:
        "https://scontent-nrt1-2.cdninstagram.com/v/t51.82787-15/557581869_18069675521219262_5175706651151859447_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=110&ccb=1-7&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=Cnz5QHhvaX0Q7kNvwHtQTqY&_nc_oc=AdmSrJBbiyoKMvMzOC62gweC5JxaNUG1nuSccKKZPysUmsRVFfnRPvM7oPTu5QHiq-I&_nc_zt=23&_nc_ht=scontent-nrt1-2.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=UTjn_Ptm9pefoszMT5KBVg&oh=00_Aff2xSF6YGQPZRMZiE1IQIBHVgsB52ZPbWeQHRJQLDbRuw&oe=68FE3D2C",
      categoryKey: "categories.skincare",
      url: "/products/relief-solution-review",
    },
    {
      id: "18",
      titleKey: "products.reliefLineRoutine.title",
      descriptionKey: "products.reliefLineRoutine.description",
      image:
        "https://scontent-nrt1-1.cdninstagram.com/v/t51.82787-15/557944726_18069675488219262_1995895326474987248_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=111&ccb=1-7&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=N_v1mBCcvrYQ7kNvwEiMm9S&_nc_oc=AdnvNj1rG4fdfbRzJwMNnfL0gjOnV7qTP3zwswiLTZ1Vu1JKIxL4eFIZQWlfJyN9sJA&_nc_zt=23&_nc_ht=scontent-nrt1-1.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=UTjn_Ptm9pefoszMT5KBVg&oh=00_Aff6EgG9uBpFJQBEedBqqOlS0h2ImrgERRBp85MZtgcGNw&oe=68FE3883",
      categoryKey: "categories.skincare",
      url: "/products/relief-line-routine",
    },
    {
      id: "19",
      titleKey: "products.oilySkinBalance.title",
      descriptionKey: "products.oilySkinBalance.description",
      image:
        "https://scontent-nrt1-1.cdninstagram.com/v/t51.82787-15/556611714_18069574238219262_3226835387611150206_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=108&ccb=1-7&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=ocdUa77FB38Q7kNvwHoxKor&_nc_oc=AdnW-FJRjFRHIhjfKW5zfj6sEmgi1Ub8abzztXFSFaIqCqUnAUbzcEeYr1vthAHNNGI&_nc_zt=23&_nc_ht=scontent-nrt1-1.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=UTjn_Ptm9pefoszMT5KBVg&oh=00_AfdG1hB1_JebI7z75aAATQycacNl9vy7rgW-R6jPqW3mVQ&oe=68FE1C8A",
      categoryKey: "categories.skincare",
      url: "/products/oily-skin-balance",
    },
    {
      id: "20",
      titleKey: "products.intensive30Days.title",
      descriptionKey: "products.intensive30Days.description",
      image:
        "https://scontent-nrt1-2.cdninstagram.com/v/t51.82787-15/558443922_18069574223219262_1931054627267295662_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=102&ccb=1-7&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=6PBCw_JnNO8Q7kNvwGaFhWv&_nc_oc=AdmDyo_r4Y0xGhzkRa2nFN3g2gOuZRmN8TKYqQ6qOFyRg19ZzQtwryLmKV5PzZnEjns&_nc_zt=23&_nc_ht=scontent-nrt1-2.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=UTjn_Ptm9pefoszMT5KBVg&oh=00_AffqAhjwbqJzT51XYWQDXME9s_KyZfVxMXvaKCFLeSVLpw&oe=68FE2FA6",
      categoryKey: "categories.skincare",
      url: "/products/intensive-30-days",
    },
    {
      id: "21",
      titleKey: "products.hydroBooster247.title",
      descriptionKey: "products.hydroBooster247.description",
      image:
        "https://scontent-nrt1-1.cdninstagram.com/v/t51.82787-15/556869928_18069487841219262_5670440868184547663_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=106&ccb=1-7&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=qUIH0dAVuvsQ7kNvwHSffS7&_nc_oc=AdlCC6LduE4WXNCcHgd4luCHWiOLi7YvIylCae4MWbdPhQa6mwn9LwPtJS5sRnzDv5g&_nc_zt=23&_nc_ht=scontent-nrt1-1.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=UTjn_Ptm9pefoszMT5KBVg&oh=00_AfdZpE821QzUN1mCMtjFxCtCRlQvZOx0jCUiSG-ZDwy-vg&oe=68FE35D8",
      categoryKey: "categories.skincare",
      url: "/products/hydro-booster-247",
    },
    {
      id: "22",
      titleKey: "products.peelingDuoRoutine.title",
      descriptionKey: "products.peelingDuoRoutine.description",
      image:
        "https://scontent-nrt1-2.cdninstagram.com/v/t51.82787-15/553542852_18069096443219262_3178063309696886827_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=102&ccb=1-7&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=wHgG2qiay8YQ7kNvwGQxTJY&_nc_oc=AdnPmMv0gPs3K732JcmaLCFKjtw3h8tU8oVoSWVdM5WLM23meESN9cZcAmBRIgHujkE&_nc_zt=23&_nc_ht=scontent-nrt1-2.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=UTjn_Ptm9pefoszMT5KBVg&oh=00_AffR31p9FLEcBc1LKcIPP89oTl1bTVE9-nltJYYMlegshw&oe=68FE3901",
      categoryKey: "categories.peeling",
      url: "/products/peeling-duo-routine",
    },
    {
      id: "23",
      titleKey: "products.pureHerbPack.title",
      descriptionKey: "products.pureHerbPack.description",
      image:
        "https://scontent-nrt1-1.cdninstagram.com/v/t51.82787-15/554769670_18069096410219262_6509300894461044003_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=108&ccb=1-7&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0FST1VTRUxfSVRFTS5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=PyXCjyyosBIQ7kNvwEGVEZh&_nc_oc=AdkKlijwGyRem-G6BqXXAU4aqVjhFDpuh78p35J1RYGuQQvvep8DSvAyv6b-swAI4YE&_nc_zt=23&_nc_ht=scontent-nrt1-1.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=UTjn_Ptm9pefoszMT5KBVg&oh=00_Afc4M_2lF-mAFi834z_RweceswAxTwmc8JMvMbd93dnFEA&oe=68FE2937",
      categoryKey: "categories.peeling",
      url: "/products/pure-herb-pack",
    },
    {
      id: "24",
      titleKey: "products.biomeBlackSugar.title",
      descriptionKey: "products.biomeBlackSugar.description",
      image:
        "https://scontent-nrt1-1.cdninstagram.com/v/t51.82787-15/553318394_18068960459219262_5732354895668115123_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=109&ccb=1-7&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=oIF2oVUGVuYQ7kNvwHEeq1O&_nc_oc=AdmtZck2zURAI4HrQfUxG78wALztagoaS5r541Lmh3tfhtAEN1_ItSchvgdnUmHBZqY&_nc_zt=23&_nc_ht=scontent-nrt1-1.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=UTjn_Ptm9pefoszMT5KBVg&oh=00_Afcc2jHQQSnld5WPVt2_609ugMhop-wh02m_R0263PLZXQ&oe=68FE2236",
      categoryKey: "categories.peeling",
      url: "/products/biome-black-sugar",
    },
    {
      id: "25",
      titleKey: "products.cleanserLineup.title",
      descriptionKey: "products.cleanserLineup.description",
      image:
        "https://scontent-nrt1-2.cdninstagram.com/v/t51.82787-15/553093131_18068934962219262_8057002592367371375_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=107&ccb=1-7&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=ocdBQjocw4UQ7kNvwGBXnh7&_nc_oc=Adlh6MyzEOa-F7rRdcZEyiH7hEwR87VH5t26NZ_SADy38LUj5yocLrKSWjyybkf0JJk&_nc_zt=23&_nc_ht=scontent-nrt1-2.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=UTjn_Ptm9pefoszMT5KBVg&oh=00_Afcp3k1U-W736KEEG6mSozXhh_NVNA5DUWS968F-rFtJww&oe=68FE3546",
      categoryKey: "categories.guide",
      url: "/products/cleanser-lineup",
    },
  ];

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    setLoading(true);
    // Simulate loading delay
    setTimeout(() => {
      setProducts(productsData);
      setLoading(false);
    }, 300);
  };

  return (
    <section className="w-full py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Loading state */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6 lg:gap-8">
            {[...Array(25)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-white rounded-lg overflow-hidden"
              >
                <div className="aspect-square bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Grid layout - 2 columns on mobile, 3 on tablet, 4 on desktop, 5 on large desktop */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6 lg:gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="group relative overflow-hidden rounded-lg bg-white hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                {/* Image container */}
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={product.image}
                    alt={t(product.titleKey)}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>

                {/* Content overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
                    <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2">
                      {t(product.titleKey)}
                    </h3>
                    <p className="text-xs md:text-sm opacity-90">
                      {t(product.descriptionKey)}
                    </p>
                  </div>
                </div>

                {/* Category badge */}
                <div className="absolute top-3 md:top-4 right-3 md:right-4 bg-white/95 px-2 md:px-3 py-1 rounded-full text-xs font-medium text-purple-700 shadow-md">
                  {t(product.categoryKey)}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && products.length === 0 && (
          <div className="text-center py-12 md:py-20">
            <p className="text-gray-500 text-base md:text-lg">
              {t("emptyState")}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
