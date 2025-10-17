"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { autoProductsData } from "@/data/autoProductsData";
import { formatPrice } from "@/utils/productUtils";

const PromoBanner = () => {
  // Get featured products for the promo banners
  const castrolOil = autoProductsData.find(p => p.id === "castrol-gtx-20w50");
  const clutchPlate = autoProductsData.find(p => p.id === "clutch-plate-maruti-swift");
  const brakePads = autoProductsData.find(p => p.id === "brake-pads-hyundai-i20");

  return (
    <section className="overflow-hidden py-20">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        {/* <!-- promo banner big --> */}
        <div className="relative z-1 overflow-hidden rounded-lg bg-[#F5F5F7] py-12.5 lg:py-17.5 xl:py-22.5 px-4 sm:px-7.5 lg:px-14 xl:px-19 mb-7.5">
          <div className="max-w-[550px] w-full">
            <span className="block font-medium text-xl text-dark mb-3">
              {castrolOil?.name || "Premium Castrol GTX Engine Oil"}
            </span>

            <h2 className="font-bold text-xl lg:text-heading-4 xl:text-heading-3 text-dark mb-5">
              UP TO {castrolOil?.discount || 40}% OFF
            </h2>

            <p>
              {castrolOil?.description || "High-performance 20W50 engine oil provides superior protection for your vehicle's engine. Trusted by professionals worldwide for optimal performance."}
            </p>

            <div className="flex items-center gap-4 mb-4">
              <span className="text-2xl font-bold text-dark">
                {castrolOil ? formatPrice(castrolOil.price) : "₹899"}
              </span>
              {castrolOil?.originalPrice && (
                <span className="text-lg text-gray-500 line-through">
                  {formatPrice(castrolOil.originalPrice)}
                </span>
              )}
            </div>

            <Link
              href={castrolOil?.link || "/shop-with-sidebar"}
              className="inline-flex font-medium text-custom-sm text-white bg-blue py-[11px] px-9.5 rounded-md ease-out duration-200 hover:bg-blue-dark mt-7.5"
            >
              Shop Now
            </Link>
          </div>

          <Image
            src="/images/arrivals/3l-castrol-gtx-20w50-engine-oil-removebg-preview.png"
            alt="Castrol Engine Oil"
            className="absolute bottom-0 right-4 lg:right-26 -z-1"
            width={274}
            height={350}
          />
        </div>

        <div className="grid gap-7.5 grid-cols-1 lg:grid-cols-2">
          {/* <!-- promo banner small --> */}
          <div className="relative z-1 overflow-hidden rounded-lg bg-[#DBF4F3] py-10 xl:py-16 px-4 sm:px-7.5 xl:px-10">
            <Image
              src="/images/arrivals/clutch-plate-500x500-removebg-preview.png"
              alt="Clutch Plate"
              className="absolute top-1/2 -translate-y-1/2 left-3 sm:left-10 -z-1"
              width={200}
              height={200}
            />

            <div className="text-right">
              <span className="block text-lg text-dark mb-1.5">
                {clutchPlate?.name || "High-Quality Clutch Plates"}
              </span>

              <h2 className="font-bold text-xl lg:text-heading-4 text-dark mb-2.5">
                Smooth Performance
              </h2>

              <p className="font-semibold text-custom-1 text-teal">
                Flat {clutchPlate?.discount || 25}% off
              </p>

              <div className="mb-4">
                <span className="text-lg font-bold text-dark">
                  {clutchPlate ? formatPrice(clutchPlate.price) : "₹2,499"}
                </span>
                {clutchPlate?.originalPrice && (
                  <span className="text-sm text-gray-500 line-through ml-2">
                    {formatPrice(clutchPlate.originalPrice)}
                  </span>
                )}
              </div>

              <Link
                href={clutchPlate?.link || "/shop-with-sidebar"}
                className="inline-flex font-medium text-custom-sm text-white bg-teal py-2.5 px-8.5 rounded-md ease-out duration-200 hover:bg-teal-dark mt-9"
              >
                Shop Now
              </Link>
            </div>
          </div>

          {/* <!-- promo banner small --> */}
          <div className="relative z-1 overflow-hidden rounded-lg bg-[#FFECE1] py-10 xl:py-16 px-4 sm:px-7.5 xl:px-10">
            <Image
              src="/images/arrivals/71Y27LKXBdL-removebg-preview.png"
              alt="Auto Parts"
              className="absolute top-1/2 -translate-y-1/2 right-3 sm:right-8.5 -z-1"
              width={180}
              height={180}
            />

            <div>
              <span className="block text-lg text-dark mb-1.5">
                {brakePads?.name || "Brake Pads & Accessories"}
              </span>

              <h2 className="font-bold text-xl lg:text-heading-4 text-dark mb-2.5">
                Up to <span className="text-orange">{brakePads?.discount || 35}%</span> off
              </h2>

              <p className="max-w-[285px] text-custom-sm">
                {brakePads?.description || "Premium quality brake pads and automotive accessories for enhanced safety and performance."}
              </p>

              <div className="mb-4">
                <span className="text-lg font-bold text-dark">
                  {brakePads ? formatPrice(brakePads.price) : "₹1,899"}
                </span>
                {brakePads?.originalPrice && (
                  <span className="text-sm text-gray-500 line-through ml-2">
                    {formatPrice(brakePads.originalPrice)}
                  </span>
                )}
              </div>

              <Link
                href={brakePads?.link || "/shop-with-sidebar"}
                className="inline-flex font-medium text-custom-sm text-white bg-orange py-2.5 px-8.5 rounded-md ease-out duration-200 hover:bg-orange-dark mt-7.5"
              >
                Buy Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;