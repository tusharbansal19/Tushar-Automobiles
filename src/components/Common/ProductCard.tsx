import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AutoProduct } from '@/types/autoProduct';
import { formatPrice, isOnSale } from '@/utils/productUtils';

interface ProductCardProps {
  product: AutoProduct;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ${className}`}>
      <Link href={product.link}>
        <div className="relative">
          {/* Product Image */}
          <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={300}
              className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
            />
          </div>
          
          {/* Discount Badge */}
          {isOnSale(product) && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-medium">
              -{product.discount}%
            </div>
          )}
          
          {/* Stock Status */}
          <div className={`absolute top-2 right-2 px-2 py-1 rounded-md text-xs font-medium ${
            product.inStock 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </div>
        </div>
        
        {/* Product Info */}
        <div className="p-4">
          {/* Brand */}
          <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
          
          {/* Product Name */}
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          
          {/* Category */}
          <p className="text-xs text-gray-400 mb-2">{product.category}</p>
          
          {/* Rating */}
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating) 
                      ? 'text-yellow-400' 
                      : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-500 ml-1">
              ({product.reviews})
            </span>
          </div>
          
          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
          </div>
          
          {/* Features */}
          {product.features.length > 0 && (
            <div className="mt-3">
              <p className="text-xs text-gray-600">
                • {product.features.slice(0, 2).join(' • ')}
              </p>
            </div>
          )}
        </div>
      </Link>
      
      {/* Add to Cart Button */}
      <div className="px-4 pb-4">
        <button 
          className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
            product.inStock
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          disabled={!product.inStock}
        >
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;