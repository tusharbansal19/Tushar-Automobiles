import { Category } from "@/types/category";
import React from "react";
import Image from "next/image";
import Link from "next/link";

interface CategoryWithCount extends Category {
  count?: number;
}

const SingleItem = ({ item }: { item: CategoryWithCount }) => {
  return (
    <Link 
      href={`/shop-with-sidebar?category=${encodeURIComponent(item.title)}`} 
      className="group flex flex-col items-center"
    >
      <div className="max-w-[130px] w-full bg-[#F2F3F8] h-32.5 rounded-full flex items-center justify-center mb-4">
        <Image src={item.img} alt="Category" width={82} height={62} />
      </div>

      <div className="flex flex-col items-center">
        <h3 className="inline-block font-medium text-center text-dark bg-gradient-to-r from-blue to-blue bg-[length:0px_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_1px] group-hover:text-blue mb-1">
          {item.title}
        </h3>
        {item.count && (
          <span className="text-custom-xs text-gray-5">
            {item.count} items
          </span>
        )}
      </div>
    </Link>
  );
};

export default SingleItem;
