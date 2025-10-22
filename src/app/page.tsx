import FreeGift from "@/components/free_gift";
import HeroSection from "@/components/hero_section";
import SlideSection from "@/components/slide_section";
import DoubleImageSection from "@/components/double_image_section";
import AllProductsSection from "@/components/all_products_section";
import ProductsGridSection from "@/components/products_grid_section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SlideSection />
      <FreeGift />
      <DoubleImageSection />
      <AllProductsSection />
      <ProductsGridSection />
    </>
  );
}
