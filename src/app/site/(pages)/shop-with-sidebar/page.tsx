import React from "react";
import ShopWithSidebar from "@/components/ShopWithSidebar";

import { Metadata } from "next";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Automobile Showroom | NextCommerce Vehicle Marketplace",
  description: "Browse and filter through our extensive collection of cars, vans, and commercial vehicles from top brands like Maruti Suzuki, Honda, Tata, Mahindra, and more.",
  // other metadata
};

const ShopWithSidebarPage = () => {
  return (
    <main>
      <ShopWithSidebar />
    </main>
  );
};

export default ShopWithSidebarPage;
