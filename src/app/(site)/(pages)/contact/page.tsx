import Contact from "@/components/Contact";
import { Metadata } from "next";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Contact Us | Tushar Automobiles - Get in Touch",
  description: "Contact Tushar Automobiles for all your automotive needs. We provide quality spare parts, expert advice, and excellent customer service. Get in touch today!",
  keywords: "contact tushar automobiles, automobile spare parts contact, car parts inquiry, automotive support, customer service",
  openGraph: {
    title: "Contact Us | Tushar Automobiles",
    description: "Get in touch with Tushar Automobiles for quality automotive parts and expert service.",
    type: "website",
  },
};

const ContactPage = () => {
  return <Contact />;
};

export default ContactPage;