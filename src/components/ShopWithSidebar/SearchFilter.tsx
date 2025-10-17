"use client";

import { useState, useEffect, useCallback } from "react";

interface SearchFilterProps {
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
  currentSearch?: string;
}

const SearchFilter = ({ onSearch, placeholder = "Search vehicles...", currentSearch = "" }: SearchFilterProps) => {
  const [searchTerm, setSearchTerm] = useState(currentSearch);

  // Debounced search function
  const debouncedSearch = useCallback(
    (value: string) => {
      const timeoutId = setTimeout(() => {
        onSearch(value);
      }, 300);
      return () => clearTimeout(timeoutId);
    },
    [onSearch]
  );

  useEffect(() => {
    const cleanup = debouncedSearch(searchTerm);
    return cleanup;
  }, [searchTerm, debouncedSearch]);

  // Update local state when currentSearch prop changes (e.g., when filters are cleared)
  useEffect(() => {
    setSearchTerm(currentSearch);
  }, [currentSearch]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  return (
    <div className="bg-white shadow-1 rounded-lg">
      <div className="py-3 pl-6 pr-5.5">
        <p className="text-dark mb-3">Search Vehicles</p>
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder={placeholder}
            className="w-full px-4 py-2.5 border border-gray-3 rounded-md focus:outline-none focus:border-blue transition-colors"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg
              className="fill-gray-4"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.16667 3.33334C5.94501 3.33334 3.33334 5.94501 3.33334 9.16667C3.33334 12.3883 5.94501 15 9.16667 15C12.3883 15 15 12.3883 15 9.16667C15 5.94501 12.3883 3.33334 9.16667 3.33334ZM1.66667 9.16667C1.66667 5.02454 5.02454 1.66667 9.16667 1.66667C13.3088 1.66667 16.6667 5.02454 16.6667 9.16667C16.6667 13.3088 13.3088 16.6667 9.16667 16.6667C5.02454 16.6667 1.66667 13.3088 1.66667 9.16667Z"
                fill=""
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4643 13.2857L18.0893 16.9107C18.4147 17.2362 18.4147 17.7638 18.0893 18.0893C17.7638 18.4147 17.2362 18.4147 16.9107 18.0893L13.2857 14.4643C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                fill=""
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;