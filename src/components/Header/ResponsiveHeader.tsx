'use client';

import { useCartModalContext } from "@/app/context/CartSidebarModalContext";
import { selectTotalPrice } from "@/redux/features/cart-slice";
import { useAppSelector } from "@/redux/store";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CustomSelect from "./CustomSelect";
import Dropdown from "./Dropdown";
import { menuData } from "./menuData";

const ResponsiveHeader = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { openCartModal } = useCartModalContext();
  const { user, isAuthenticated, logout } = useAuth();

  const product = useAppSelector((state) => state.cartReducer.items);
  const totalPrice = useSelector(selectTotalPrice);

  // Get user initials for avatar
  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Scroll behavior
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY < 10) {
      setIsHeaderVisible(true);
      setStickyMenu(false);
    } else {
      setStickyMenu(true);
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }
    }
    
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const options = [
    { label: "All Categories", value: "0" },
    { label: "Engine Oil & Fluids", value: "1" },
    { label: "Brake Parts", value: "2" },
    { label: "Filters & Air", value: "3" },
    { label: "Lights & Electrical", value: "4" },
    { label: "Wheels & Tyres", value: "5" },
    { label: "Suspension & Steering", value: "6" },
    { label: "Tools & Equipment", value: "7" },
    { label: "Car Accessories", value: "8" },
  ];

  return (
    <header
      className={`fixed left-0 top-0 w-full z-50 bg-white transition-all ease-in-out duration-300 ${
        stickyMenu && "shadow-lg"
      } ${
        isHeaderVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Header */}
        <div className="hidden lg:block">
          <div className={`flex items-center justify-between ${stickyMenu ? "py-4" : "py-6"}`}>
            {/* Left Section - Logo & Search */}
            <div className="flex items-center gap-8">
              {/* Logo */}
              <Link href="/" className="flex-shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="Tushar Automobiles"
                  width={64}
                  height={32}
                  className="w-16 h-8 object-contain"
                  onError={(e) => {
                    e.currentTarget.src = '/logo.png';
                  }}
                />
              </Link>

              {/* Search Bar */}
              <div className="flex items-center max-w-lg w-full">
                <div className="hidden xl:block">
                  <CustomSelect options={options} />
                </div>
                <div className="relative flex-1 xl:max-w-sm">
                  <input
                    type="search"
                    placeholder="Search for auto parts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2.5 pr-10 bg-gray-50 border border-gray-200 rounded-lg xl:rounded-l-none focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 hover:text-red-600 transition-colors">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Section - Support, User, Cart */}
            <div className="flex items-center gap-6">
              {/* Support Info */}
              <div className="hidden xl:flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">24/7 Support</p>
                  <p className="text-sm font-semibold text-gray-800">+91 9719167530</p>
                </div>
              </div>

              {/* User Profile */}
              {isAuthenticated ? (
                <div className="relative group">
                  <button className="flex items-center gap-3 hover:bg-gray-50 rounded-lg p-2 transition-colors">
                    <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-medium">
                      {getUserInitials(user?.name || 'U')}
                    </div>
                    <div className="text-left">
                      <p className="text-xs text-gray-500">Welcome</p>
                      <p className="text-sm font-medium text-gray-800 truncate max-w-[120px]">
                        {user?.name || 'User'}
                      </p>
                    </div>
                  </button>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="p-4 border-b border-gray-100">
                      <p className="font-medium text-gray-800">{user?.name}</p>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                    <div className="py-2">
                      <Link href="/my-account" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        My Account
                      </Link>
                      <Link href="/orders" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        My Orders
                      </Link>
                      <Link href="/wishlist" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        Wishlist
                      </Link>
                    </div>
                    <div className="border-t border-gray-100 py-2">
                      <button 
                        onClick={logout}
                        className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <Link href="/signin" className="flex items-center gap-3 hover:bg-gray-50 rounded-lg p-2 transition-colors">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-gray-500">Account</p>
                    <p className="text-sm font-medium text-gray-800">Sign In</p>
                  </div>
                </Link>
              )}

              {/* Cart */}
              <button
                onClick={openCartModal}
                className="flex items-center gap-3 hover:bg-gray-50 rounded-lg p-2 transition-colors"
              >
                <div className="relative">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6m0 0h15M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                  </div>
                  {product.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                      {product.length}
                    </span>
                  )}
                </div>
                <div className="text-left">
                  <p className="text-xs text-gray-500">Cart</p>
                  <p className="text-sm font-medium text-gray-800">₹{totalPrice}</p>
                </div>
              </button>
            </div>
          </div>

          {/* Navigation Bar */}
          <div className="border-t border-gray-200">
            <nav className="flex items-center justify-between py-4">
              <ul className="flex items-center gap-8">
                {menuData.map((menuItem, i) =>
                  menuItem.submenu ? (
                    <Dropdown
                      key={i}
                      menuItem={menuItem}
                      stickyMenu={stickyMenu}
                    />
                  ) : (
                    <li key={i} className="relative group">
                      <Link
                        href={menuItem.path}
                        className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors py-2 relative"
                      >
                        {menuItem.title}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all duration-200 group-hover:w-full"></span>
                      </Link>
                    </li>
                  )
                )}
              </ul>

              <div className="flex items-center gap-6">
                <Link href="/recently-viewed" className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Recently Viewed
                </Link>
                <Link href="/wishlist" className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Wishlist
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ResponsiveHeader;