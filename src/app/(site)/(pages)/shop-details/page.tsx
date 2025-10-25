import React from "react";
import dynamic from "next/dynamic";
import { Metadata } from "next";

// Dynamically import ShopDetails to avoid SSR issues
const ShopDetails = dynamic(() => import("@/components/ShopDetails"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red"></div>
    </div>
  ),
});

export const metadata: Metadata = {
  title: "Shop Details Page | NextCommerce Nextjs E-commerce template",
  description: "This is Shop Details Page for NextCommerce Template",
  // other metadata
};

const ShopDetailsPage = () => {
  return (
    <main>
      <ShopDetails />
    </main>
  );
};

export default ShopDetailsPage;
