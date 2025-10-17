"use client";

import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  hasNextPage,
  hasPrevPage
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show pages with ellipsis
      if (currentPage <= 3) {
        // Show first 3 pages + ellipsis + last page
        pages.push(1, 2, 3, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Show first page + ellipsis + last 3 pages
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        // Show first + ellipsis + current-1, current, current+1 + ellipsis + last
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex justify-center mt-15">
      <div className="bg-white shadow-1 rounded-md p-2">
        <ul className="flex items-center gap-1">
          {/* Previous Button */}
          <li>
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={!hasPrevPage}
              aria-label="Previous page"
              className="flex items-center justify-center w-8 h-9 ease-out duration-200 rounded-[3px] disabled:text-gray-4 hover:text-white hover:bg-blue disabled:hover:bg-transparent disabled:hover:text-gray-4"
            >
              ←
            </button>
          </li>

          {/* Page Numbers */}
          {getPageNumbers().map((page, index) => (
            <li key={index}>
              {page === '...' ? (
                <span className="flex py-1.5 px-3.5 text-gray-4">...</span>
              ) : (
                <button
                  onClick={() => onPageChange(page as number)}
                  className={`flex py-1.5 px-3.5 duration-200 rounded-[3px] min-w-[32px] justify-center ${currentPage === page
                    ? 'bg-blue text-white'
                    : 'hover:text-white hover:bg-blue text-gray-6'
                    }`}
                >
                  {page}
                </button>
              )}
            </li>
          ))}

          {/* Next Button */}
          <li>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={!hasNextPage}
              aria-label="Next page"
              className="flex items-center justify-center w-8 h-9 ease-out duration-200 rounded-[3px] disabled:text-gray-4 hover:text-white hover:bg-blue disabled:hover:bg-transparent disabled:hover:text-gray-4"
            >
              →
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Pagination;