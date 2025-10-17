"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css/pagination";
import "swiper/css";

import Image from "next/image";

const HeroCarousal = () => {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination]}
      className="hero-carousel"
    >
      <SwiperSlide>
        <div className="flex items-center pt-6 sm:pt-0 flex-col-reverse sm:flex-row">
          <div className="max-w-[394px] py-10 sm:py-15 lg:py-24.5 pl-4 sm:pl-7.5 lg:pl-12.5">
            <div className="flex items-center gap-4 mb-7.5 sm:mb-10">
              <span className="block font-semibold text-heading-3 sm:text-heading-1 text-red">Genuine</span>
              <span className="block text-dark text-sm sm:text-custom-1 sm:leading-[24px]">
                Auto Spare
                <br />
                Parts
              </span>
            </div>

            <h1 className="font-semibold text-dark text-xl sm:text-3xl mb-3">
              <a href="#">Engine, Brakes, Clutch, Filters, Oils & More</a>
            </h1>

            <p>Premium quality auto parts for all makes and models. Fast delivery nationwide.</p>

            <a
              href="/shop-with-sidebar"
              className="inline-flex font-medium text-white text-custom-sm rounded-md bg-dark py-3 px-9 ease-out duration-200 hover:bg-red mt-10"
            >
              Shop Auto Parts
            </a>
          </div>

          <div>
            <Image
              src="/images/arrivals/clutch-plate-500x500-removebg-preview.png"
              alt="headphone"
              width={351}
              height={358}
            />
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        {" "}
        <div className="flex items-center pt-6 sm:pt-0 flex-col-reverse sm:flex-row">
          <div className="max-w-[394px] py-10 sm:py-15 lg:py-26 pl-4 sm:pl-7.5 lg:pl-12.5">
            <div className="flex items-center gap-4 mb-7.5 sm:mb-10">
              <span className="block font-semibold text-heading-3 sm:text-heading-1 text-red">Best</span>
              <span className="block text-dark text-sm sm:text-custom-1 sm:leading-[24px]">
                Price on
                <br />
                Engine Parts
              </span>
            </div>

            <h1 className="font-semibold text-dark text-xl sm:text-3xl mb-3">
              <a href="#">Pistons, Valves, Gaskets, Belts, Filters</a>
            </h1>

            <p>Find perfect-fit engine components with OEM-grade quality and durability.</p>

            <a
              href="/shop-with-sidebar"
              className="inline-flex font-medium text-white text-custom-sm rounded-md bg-dark py-3 px-9 ease-out duration-200 hover:bg-red mt-10"
            >
              Browse Engine Parts
            </a>
          </div>

          
          <div>
            <Image
              src="/images/arrivals/clutch-plate-500x500-removebg-preview.png"
              alt="cluthch"
              width={351}
              height={358}
            />
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default HeroCarousal;
