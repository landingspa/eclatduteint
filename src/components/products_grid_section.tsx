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
        "https://scontent-nrt1-1.cdninstagram.com/v/t51.82787-15/564815001_18071367254219262_7931405166299899002_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=111&ccb=1-7&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=RSuilc8OYZAQ7kNvwEdSaWX&_nc_oc=AdnOH09Gb0DyzGcApMLqPx0RdqC3fJbKAxrPZhJ6K-KjwYt2W8imzjZKLOBq0UXhIjQ&_nc_zt=23&_nc_ht=scontent-nrt1-1.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=7tEUCbAO87yvAzMnKAHYeA&oh=00_AfdMaAKrmn550HiQt8VZvL9wn9lqTe9NoVIJutXJAr68CQ&oe=6905EC7D",
      categoryKey: "categories.guide",
      url: "/products/how-to-use",
    },
    {
      id: "2",
      titleKey: "products.ahaBhaPha.title",
      descriptionKey: "products.ahaBhaPha.description",
      image:
        "https://scontent-nrt1-2.cdninstagram.com/v/t51.82787-15/566198173_18071367014219262_8877270410067382004_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=105&ccb=1-7&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=YZcG5fMOeW0Q7kNvwE02T1n&_nc_oc=Adka0gVE74vzFka7opZPHXep8NOJExh1HJ1wmpqfoDTi_ar05m_hby9Q-J2VmI-5hm8&_nc_zt=23&_nc_ht=scontent-nrt1-2.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=7tEUCbAO87yvAzMnKAHYeA&oh=00_AffR9qoxioYj9L_3ixfUcqrWIIWWq6T1l1AzPpmz7q6FcQ&oe=6905EBE3",
      categoryKey: "categories.peeling",
      url: "/products/aha-bha-pha",
    },
    {
      id: "3",
      titleKey: "products.greenPeeling.title",
      descriptionKey: "products.greenPeeling.description",
      image:
        "https://scontent-nrt1-2.cdninstagram.com/v/t51.82787-15/565619271_18071366720219262_1495792448362862704_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=104&ccb=1-7&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=Zj3V7NeUic0Q7kNvwG_KhA0&_nc_oc=Adlm_447rUd5SZbruuHocQvQwHJB9itO7jDOL7Zxz-6I8qH5lUJ31kfHJYJ-TiAnm0c&_nc_zt=23&_nc_ht=scontent-nrt1-2.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=7tEUCbAO87yvAzMnKAHYeA&oh=00_AfdhrkmGqYu0DQHtm7ylyX4oJV6i1TdpWBSjngnzi-q4BA&oe=690603D1",
      categoryKey: "categories.peeling",
      url: "/products/green-peeling",
    },
    {
      id: "4",
      titleKey: "products.seasonalCare.title",
      descriptionKey: "products.seasonalCare.description",
      image:
        "https://scontent-nrt1-1.cdninstagram.com/v/t51.82787-15/566222395_18071582783219262_5493238204170343507_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=109&ccb=1-7&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=c83c0yxNwvUQ7kNvwHDNj-F&_nc_oc=AdlutAG4Xjr6MjX9Dynstf8fCDgbpJtvaD4mM2xXh2cJQ6_aqFV9EAdYa5MCteCbhlk&_nc_zt=23&_nc_ht=scontent-nrt1-1.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=7tEUCbAO87yvAzMnKAHYeA&oh=00_Afe5LUB5RMhtU15zHI8dGcVMjzKgD83UDbMFHRm3c-k20g&oe=6905F94B",
      categoryKey: "categories.skincare",
      url: "/products/seasonal-care",
    },
    {
      id: "5",
      titleKey: "products.seasonalGuide.title",
      descriptionKey: "products.seasonalGuide.description",
      image:
        "https://scontent-nrt1-1.cdninstagram.com/v/t51.82787-15/564301639_18071367596219262_7885392692021352120_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=108&ccb=1-7&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=QBRrQatkxkYQ7kNvwEcpPiD&_nc_oc=AdkCIaZTKaCkuS0fqNoJWZauHflh9jhJ2-JqdZJEM8jUgJxmBvqT6pTP6hI49KSpLjI&_nc_zt=23&_nc_ht=scontent-nrt1-1.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=7tEUCbAO87yvAzMnKAHYeA&oh=00_Afdgy-Diq2N9STlmSB07O2_4HBIrivzuobm9Y9IZkNt_8A&oe=6905E770",
      categoryKey: "categories.skincare",
      url: "/products/seasonal-transition",
    },
    {
      id: "6",
      titleKey: "products.realCareCica.title",
      descriptionKey: "products.realCareCica.description",
      image:
        "https://scontent-nrt1-1.cdninstagram.com/v/t51.82787-15/563462422_18071223332219262_2550244500710894660_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=111&ccb=1-7&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=3i7rpich6swQ7kNvwE32YeR&_nc_oc=AdnFdOdrZNBSVSLQBSTq4drrX4pBni29ZWnDRCge13ituJfSII2KSSWvP6_l7EKvGf8&_nc_zt=23&_nc_ht=scontent-nrt1-1.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=7tEUCbAO87yvAzMnKAHYeA&oh=00_Afc9qgbza3w7KixbgBGeR--ER4iTlayLzRarGh7SIlxMzw&oe=69061059",
      categoryKey: "categories.mask",
      url: "/products/real-care-cica",
    },
    {
      id: "7",
      titleKey: "products.realCareGalactomic.title",
      descriptionKey: "products.realCareGalactomic.description",
      image:
        "https://scontent-nrt1-1.cdninstagram.com/v/t51.82787-15/557961598_18069814355219262_5401979597665934766_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=106&ccb=1-7&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=XpYBq4iI5oIQ7kNvwEyMmG0&_nc_oc=AdlIX46_o3G6VUh7j3eD3qUiOPEFIG9Sc31RXT1-TYtpanTfDreGoZrHSmO6ze7vIGA&_nc_zt=23&_nc_ht=scontent-nrt1-1.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=7tEUCbAO87yvAzMnKAHYeA&oh=00_AfeMzqFJkUUU1qmTc3SINVApgQBHjtPP7l1kXnyKF9V60Q&oe=69060D7C",
      categoryKey: "categories.mask",
      url: "/products/real-care-galactomic",
    },
    {
      id: "8",
      titleKey: "products.realCare.title",
      descriptionKey: "products.realCare.description",
      image:
        "https://scontent-nrt1-2.cdninstagram.com/v/t51.82787-15/559091201_18069814319219262_2108217059239622322_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=100&ccb=1-7&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=f6rHytPtFqIQ7kNvwFhuDuo&_nc_oc=AdkDVtb2lKEWtwSkYrhm9iShVwjhwSRPsp2Keb3N46beZWu0r8kg9L-OKKdP9X4Rwlo&_nc_zt=23&_nc_ht=scontent-nrt1-2.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=7tEUCbAO87yvAzMnKAHYeA&oh=00_AfdCGZFBo9H3lXQFpJg8Q1zUK5brYGgkn8AfBTQgaH9hSw&oe=6905F83E",
      categoryKey: "categories.mask",
      url: "/products/real-care",
    },
    {
      id: "9",
      titleKey: "products.cica85.title",
      descriptionKey: "products.cica85.description",
      image:
        "https://scontent-nrt1-2.cdninstagram.com/v/t51.82787-15/558084970_18069814283219262_3992648450785993412_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=100&ccb=1-7&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=EprzH9uwTz4Q7kNvwGkrxJM&_nc_oc=Adnm-V7eLsh3Cbs0quug_oZczDUTc_zBxwnJlDwAxLIqrm6vXGQLIZ5kblZW4Nw8Iak&_nc_zt=23&_nc_ht=scontent-nrt1-2.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=7tEUCbAO87yvAzMnKAHYeA&oh=00_AfeDKxurUT7o9ZexCaj4xbTPyGXwA9ureGCGU5vRx1ywqg&oe=6905F81D",
      categoryKey: "categories.mask",
      url: "/products/cica-85",
    },
    {
      id: "10",
      titleKey: "products.doubleCare.title",
      descriptionKey: "products.doubleCare.description",
      image:
        "https://scontent-nrt1-1.cdninstagram.com/v/t51.71878-15/562678943_1139480481037130_2126936283672025169_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=111&ccb=1-7&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0xJUFMuYmVzdF9pbWFnZV91cmxnZW4uQzMifQ%3D%3D&_nc_ohc=W22tQsBVD6QQ7kNvwF2lT-8&_nc_oc=AdnfZI0kvMKBJDRvM8VhhtikZeW91gzWp-Zin00Kb5RuwE47Ys2ISG9S06NxsTtUYAQ&_nc_zt=23&_nc_ht=scontent-nrt1-1.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=7tEUCbAO87yvAzMnKAHYeA&oh=00_Afe-W5PWGVckyfezve03oO6tZAf7QKNZX9I71TX29WXqIw&oe=6905EC5B",
      categoryKey: "categories.set",
      url: "/products/double-care-set",
    },
    {
      id: "11",
      titleKey: "products.realCareClinic.title",
      descriptionKey: "products.realCareClinic.description",
      image:
        "https://scontent-nrt1-2.cdninstagram.com/v/t51.82787-15/559300072_18069814223219262_4376096561787792715_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=104&ccb=1-7&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=p6-1KQPsi0gQ7kNvwHHaScK&_nc_oc=AdlGBbYigfHfd-E--FujFsCqtCqFLlcLVpS-t0wAwlKCXqNj0aFsFzFjyuJGGorSq-4&_nc_zt=23&_nc_ht=scontent-nrt1-2.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=7tEUCbAO87yvAzMnKAHYeA&oh=00_AffUdHn6D9plLeYZrtlgJSwiRuwVn1j7fBVRQiqGznigCw&oe=6905E855",
      categoryKey: "categories.mask",
      url: "/products/real-care-clinic",
    },
    {
      id: "12",
      titleKey: "products.galactomicMoisture.title",
      descriptionKey: "products.galactomicMoisture.description",
      image:
        "https://scontent-nrt1-2.cdninstagram.com/v/t51.82787-15/558187689_18069706184219262_6736968307420496912_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=102&ccb=1-7&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=Z7__hkK_6vQQ7kNvwGEYPaI&_nc_oc=AdmWQjxUQuqsfiO8I7HrvbXqLN_608XNFdno9QJUz6Tw6mll616x7oJkhS4NStNAaOw&_nc_zt=23&_nc_ht=scontent-nrt1-2.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=7tEUCbAO87yvAzMnKAHYeA&oh=00_AfcB1AcUVG13YSKK9SvXGGUl_aYuxQeNfHc4a8Twz5DzTg&oe=690605BA",
      categoryKey: "categories.mask",
      url: "/products/galactomic-moisture",
    },
    {
      id: "13",
      titleKey: "products.cicaAllInOne.title",
      descriptionKey: "products.cicaAllInOne.description",
      image:
        "https://scontent-nrt1-1.cdninstagram.com/v/t51.82787-15/557532950_18069706010219262_3668764801173944564_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=111&ccb=1-7&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=A2nhtQHmvTgQ7kNvwGiYqcG&_nc_oc=AdnTmYr1L28C-63jptvMmhUE_CoZ94KjiB0vxTS0xAb6UbmkXlMYKi3ESJ_KnOCa7HU&_nc_zt=23&_nc_ht=scontent-nrt1-1.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=7tEUCbAO87yvAzMnKAHYeA&oh=00_Afft3R5ghZbRo0afluHwmcJcrNOmM2MYbGsnQnsiNl4zGw&oe=69060621",
      categoryKey: "categories.mask",
      url: "/products/cica-all-in-one",
    },
    {
      id: "14",
      titleKey: "products.realCareHome.title",
      descriptionKey: "products.realCareHome.description",
      image:
        "https://scontent-nrt1-1.cdninstagram.com/v/t51.82787-15/558507433_18069705983219262_6210237021499765466_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=109&ccb=1-7&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=1Eah8bXnCZEQ7kNvwF41Rn2&_nc_oc=Adm158a8LlRqyRTz6f3KY912MaCf2oUl6P7sabJQVIyJ95fjq48ukDf7X7wpUsR7P_Y&_nc_zt=23&_nc_ht=scontent-nrt1-1.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=7tEUCbAO87yvAzMnKAHYeA&oh=00_AfdpLRKMOzh0Ls7MFhvrtuPk5ns7w3-0ELuAI0T552tHwA&oe=69060721",
      categoryKey: "categories.mask",
      url: "/products/real-care-home",
    },
    {
      id: "15",
      titleKey: "products.clarifyingVsRelief.title",
      descriptionKey: "products.clarifyingVsRelief.description",
      image:
        "https://scontent-nrt1-2.cdninstagram.com/v/t51.82787-15/559005518_18069705950219262_87934896456754145_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=101&ccb=1-7&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=_grL2Ntr1W4Q7kNvwEF1qMi&_nc_oc=AdkUwkvwHabrJD5E3dfqrVqz7r5ZroaoszYQ5qsRjfVU-ld5n2zLIcxVEqG9JqKr-ac&_nc_zt=23&_nc_ht=scontent-nrt1-2.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=7tEUCbAO87yvAzMnKAHYeA&oh=00_AfepX4WF9aqkSs6F_R3mHCnOUVo3jvA0qo60LSt04Quc8Q&oe=69060FC3",
      categoryKey: "categories.skincare",
      url: "/products/clarifying-vs-relief",
    },
    {
      id: "16",
      titleKey: "products.troubleCareRoutine.title",
      descriptionKey: "products.troubleCareRoutine.description",
      image:
        "https://scontent-nrt1-1.cdninstagram.com/v/t39.30808-6/557302914_1158219329740811_5585780704376406751_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=109&ccb=1-7&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=tLLNP6ztB-wQ7kNvwE9T4El&_nc_oc=Adn-ByhWnp2pl-f2rN28IAZWs5s1I4Ur_2OehEJOCXr4anXMuRB05fNzV-NzTYmh5XE&_nc_zt=23&_nc_ht=scontent-nrt1-1.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=7tEUCbAO87yvAzMnKAHYeA&oh=00_Afe8PX4n_j7RZlAmFuslGtDDlO5LRpCax32GzyZTAdiP6A&oe=6905E74C",
      categoryKey: "categories.skincare",
      url: "/products/trouble-care-routine",
    },
    {
      id: "17",
      titleKey: "products.reliefSolutionReview.title",
      descriptionKey: "products.reliefSolutionReview.description",
      image:
        "https://scontent-nrt1-2.cdninstagram.com/v/t51.82787-15/557581869_18069675521219262_5175706651151859447_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=110&ccb=1-7&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=e5ISf8bFxhgQ7kNvwG4aJvQ&_nc_oc=AdncPi0PKSDQvWNokj1yDvO91hCemnwvkVXIllQSMjs-TC4HRqDavnIqigl0GSVtsc8&_nc_zt=23&_nc_ht=scontent-nrt1-2.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=7tEUCbAO87yvAzMnKAHYeA&oh=00_AffQeowmoYkOoQ41t3g7N4qJ5pjSAj6AFuI0NpBu_Tj3iw&oe=6905EDEC",
      categoryKey: "categories.skincare",
      url: "/products/relief-solution-review",
    },
    {
      id: "18",
      titleKey: "products.reliefLineRoutine.title",
      descriptionKey: "products.reliefLineRoutine.description",
      image:
        "https://scontent-nrt1-1.cdninstagram.com/v/t51.82787-15/557944726_18069675488219262_1995895326474987248_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=111&ccb=1-7&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=pPvwObc9YKUQ7kNvwHLifOg&_nc_oc=AdkoQ8JKkDeWkPOEdfqOa--XH7cOmL3dpQxo8oIY13yqFdkpFEHmjTHGzF0XUS_n3Cs&_nc_zt=23&_nc_ht=scontent-nrt1-1.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=7tEUCbAO87yvAzMnKAHYeA&oh=00_Affm7OqvhrEQAV5Yocz7UK6C0j6l9eH8L-L31g0QCeWsbw&oe=6905E943",
      categoryKey: "categories.skincare",
      url: "/products/relief-line-routine",
    },
    {
      id: "19",
      titleKey: "products.oilySkinBalance.title",
      descriptionKey: "products.oilySkinBalance.description",
      image:
        "https://scontent-nrt1-1.cdninstagram.com/v/t51.82787-15/556611714_18069574238219262_3226835387611150206_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=108&ccb=1-7&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=fJmNHMFXaz0Q7kNvwHV8QSW&_nc_oc=Adnglo_4E6pcCFUDGgbbAaG0THisTd-dB3alLZMIt2m80Brpnn6_-n9Cij86A6QzTTU&_nc_zt=23&_nc_ht=scontent-nrt1-1.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=7tEUCbAO87yvAzMnKAHYeA&oh=00_Aff-mFPHEVWhf8qPDiH7VRlCkOZ84F_ASXtwKsngmfcMUw&oe=6906058A",
      categoryKey: "categories.skincare",
      url: "/products/oily-skin-balance",
    },
    {
      id: "20",
      titleKey: "products.intensive30Days.title",
      descriptionKey: "products.intensive30Days.description",
      image:
        "https://scontent-nrt1-2.cdninstagram.com/v/t51.82787-15/558443922_18069574223219262_1931054627267295662_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=102&ccb=1-7&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=ICe8W8SwSmAQ7kNvwEZ4que&_nc_oc=AdnwJjZ8QaZzgeVm-UMliEQkFv7HMfr4x1Pmt0m3mRQoN3Ioi-SraaWzbsLcdxJDcSg&_nc_zt=23&_nc_ht=scontent-nrt1-2.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=7tEUCbAO87yvAzMnKAHYeA&oh=00_AfeyrUHeEfgs69Klf8XKi1m1jk4Ia7GGdmt_k7kLwSL_4A&oe=6905E066",
      categoryKey: "categories.skincare",
      url: "/products/intensive-30-days",
    },
    {
      id: "21",
      titleKey: "products.hydroBooster247.title",
      descriptionKey: "products.hydroBooster247.description",
      image:
        "https://scontent-nrt1-2.cdninstagram.com/v/t51.82787-15/565974509_18071584349219262_3757991503284570891_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=108&ccb=1-7&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=LpexuABeK2QQ7kNvwGDZ5dR&_nc_oc=AdkPsuUo4ddvsj1G6o0qDW0G4x_SixClUs9Acxz0PU_bdgXsBqAU2xAIE_-5EM_K6R8&_nc_zt=23&_nc_ht=scontent-nrt1-1.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=7tEUCbAO87yvAzMnKAHYeA&oh=00_AfdTKVdDvqWFFEoY7p7G5TE_gXXZ2qHRs73GXTGI6mWr5A&oe=6906041E",
      categoryKey: "categories.skincare",
      url: "/products/hydro-booster-247",
    },
    {
      id: "22",
      titleKey: "products.peelingDuoRoutine.title",
      descriptionKey: "products.peelingDuoRoutine.description",
      image:
        "https://scontent-nrt1-2.cdninstagram.com/v/t51.82787-15/565600962_18071584199219262_4420621375393297227_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=108&ccb=1-7&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=8Yvu5qcibLQQ7kNvwGeTntq&_nc_oc=Adlr8FWv4qQ0wqLz0l43XXnovJXd74W9h8EvSEH4hVLWLEEAJcgR_pE3-ENmxMsQff8&_nc_zt=23&_nc_ht=scontent-nrt1-1.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=7tEUCbAO87yvAzMnKAHYeA&oh=00_Afeq_PF3icv4Gf1arcJm8XIh45nCwZ-01DMpU5AvdCdSaA&oe=6905E3B4",
      categoryKey: "categories.peeling",
      url: "/products/peeling-duo-routine",
    },
    {
      id: "23",
      titleKey: "products.pureHerbPack.title",
      descriptionKey: "products.pureHerbPack.description",
      image:
        "https://scontent-nrt1-1.cdninstagram.com/v/t51.82787-15/565441611_18071583368219262_2392578709166129836_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=103&ccb=1-7&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=H8HglbKV_TsQ7kNvwENTZ4c&_nc_oc=AdksDUc8H9GTCNSnXmL03c90hUVMPIFyLJtXmpEPAiSuuzPdlCbR6vbahSH4cgsvuKs&_nc_zt=23&_nc_ht=scontent-nrt1-1.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=7tEUCbAO87yvAzMnKAHYeA&oh=00_AfdEB6dN5q2fQ2FSrESGfSS_v8eBMccaypFt738gsy7_Ww&oe=69060B70",
      categoryKey: "categories.peeling",
      url: "/products/pure-herb-pack",
    },
    {
      id: "24",
      titleKey: "products.biomeBlackSugar.title",
      descriptionKey: "products.biomeBlackSugar.description",
      image:
        "https://scontent-nrt1-2.cdninstagram.com/v/t51.82787-15/563362569_18071224250219262_3421902260321660271_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=110&ccb=1-7&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=LH-wfENzVy8Q7kNvwH24tZK&_nc_oc=Adn68jrXMMAnuFyYyG9UuhYh_L6DCy82FK6t_Ww6JIVvWHLBPecjekSW72d1X_q8SB4&_nc_zt=23&_nc_ht=scontent-nrt1-2.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=7tEUCbAO87yvAzMnKAHYeA&oh=00_AffxXYPExDKsArT_LbxAHS9PnIldt7X7niwRQwsXBY-0yA&oe=6905F4EA",
      categoryKey: "categories.peeling",
      url: "/products/biome-black-sugar",
    },
    {
      id: "25",
      titleKey: "products.cleanserLineup.title",
      descriptionKey: "products.cleanserLineup.description",
      image:
        "https://scontent-nrt1-2.cdninstagram.com/v/t51.82787-15/564906786_18071224025219262_5789924628153353801_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=100&ccb=1-7&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=dDpDvxfttIAQ7kNvwGjcNHM&_nc_oc=AdkHgY2x1ZhNK1CO6oHgalc-gW_WAkJsfgs_jxFfU0YRbDFUoZgQ8HE5B8S2PnUWzGs&_nc_zt=23&_nc_ht=scontent-nrt1-2.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=7tEUCbAO87yvAzMnKAHYeA&oh=00_AfemxqpY0HAzfgwCi8JZhMws7x7NZwG42MnTwzMoEQDg8A&oe=690600A8",
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
