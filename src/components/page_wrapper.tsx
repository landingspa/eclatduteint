"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface PageWrapperProps {
  children: ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  const pathname = usePathname();

  // Remove locale prefix to check if it's home page
  const isHomePage =
    pathname === "/" || pathname === "/en" || pathname === "/vi";

  return <div className={isHomePage ? "" : "lg:pt-28"}>{children}</div>;
}
