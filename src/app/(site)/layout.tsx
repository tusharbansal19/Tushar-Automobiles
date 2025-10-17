"use client";
import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import "../css/euclid-circular-a-font.css";
import "../css/style.css";
import CartSidebarModal from "@/components/Common/CartSidebarModal";
import PreviewSliderModal from "@/components/Common/PreviewSlider";
import QuickViewModal from "@/components/Common/QuickViewModal";
import { ReduxProvider } from "@/redux/provider";
import { CartModalProvider } from "../context/CartSidebarModalContext";
import { PreviewSliderProvider } from "../context/PreviewSliderContext";
import { ModalProvider } from "../context/QuickViewModalContext";
import { LoadingProvider } from "@/context/LoadingContext";
import { AuthProvider } from "@/context/AuthContext";
import ScrollToTop from "@/components/Common/ScrollToTop";
import PageLoader from "@/components/PageLoader";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState<boolean>(true);

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link
          rel="icon"
          href="/images/logo.png"
          type="image/png"
        />
      </head>
      <body>
        {loading ? (
          <PageLoader 
            onLoadingComplete={handleLoadingComplete}
            duration={3000}
          />
        ) : (
          <>
            <LoadingProvider>
              <AuthProvider>
                <ReduxProvider>
                  <CartModalProvider>
                    <ModalProvider>
                      <PreviewSliderProvider>
                        <Header />
                        {children}

                        <QuickViewModal />
                        <CartSidebarModal />
                        <PreviewSliderModal />
                      </PreviewSliderProvider>
                    </ModalProvider>
                  </CartModalProvider>
                </ReduxProvider>
              </AuthProvider>
            </LoadingProvider>
            <ScrollToTop />
            <Footer />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#fff',
                  color: '#333',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px',
                },
                success: {
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#fff',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#fff',
                  },
                },
              }}
            />
          </>
        )}
      </body>
    </html>
  );
}
