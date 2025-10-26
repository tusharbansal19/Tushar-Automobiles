import Home from "@/components/Home";
import { Metadata } from "next";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Tushar Automobiles | Premium Auto Parts & Services",
  description: "Your trusted partner for quality automobile parts, engine oils, car accessories, and professional automotive services. Shop premium auto parts with fast delivery.",
  keywords: "automobile parts, engine oil, car accessories, auto services, car maintenance, automotive supplies",
  openGraph: {
    title: "Tushar Automobiles | Premium Auto Parts & Services",
    description: "Quality automobile parts and services you can trust",
    type: "website",
  }
};

export default function HomePage() {
  return (
    <>
      <Home />
    </>
  );
}
