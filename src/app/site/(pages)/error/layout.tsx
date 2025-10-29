import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Error Page | NextCommerce Nextjs E-commerce template",
    description: "This is Error Page for NextCommerce Template",
};

export default function ErrorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}