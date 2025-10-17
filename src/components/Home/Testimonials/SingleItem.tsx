import React from "react";
import { Testimonial } from "@/types/testimonial";
import Image from "next/image";

const SingleItem = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <div className="shadow-testimonial bg-white rounded-[10px] py-7.5 px-4 sm:px-8.5 m-1">
      <div className="flex items-center gap-1 mb-5">
        <Image
          src="/images/icons/icon-star.svg"
          alt="star icon"
          width={15}
          height={15}
        />
        <Image
          src="/images/icons/icon-star.svg"
          alt="star icon"
          width={15}
          height={15}
        />
        <Image
          src="/images/icons/icon-star.svg"
          alt="star icon"
          width={15}
          height={15}
        />
        <Image
          src="/images/icons/icon-star.svg"
          alt="star icon"
          width={15}
          height={15}
        />
        <Image
          src="/images/icons/icon-star.svg"
          alt="star icon"
          width={15}
          height={15}
        />
      </div>

      <p className="text-dark mb-6">{testimonial.review}</p>

      <a href="#" className="flex items-center gap-4">
        <div className="w-12.5 h-12.5 rounded-full bg-indigo-500 text-white bg-blue-800 flex items-center justify-center font-bold text-lg">
  {testimonial.authorName.charAt(0).toUpperCase()}
</div>


        <div>
          <h3 className="font-medium text-dark">{testimonial.authorName}</h3>
          {/* <p className="text-custom-sm">{testimonial.authorRole}</p> */}
        </div>
      </a>
    </div>
  );
};

export default SingleItem;
