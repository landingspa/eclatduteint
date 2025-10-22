import Image from "next/image";

export default function DoubleImageSection() {
  return (
    <section className="w-full h-[200px] lg:h-[80vh] px-5">
      <div className="relative w-full h-full">
        <Image
          src="/double.jpg"
          alt="Double section"
          fill
          className="object-contain"
          quality={100}
          priority={false}
        />
      </div>
    </section>
  );
}
