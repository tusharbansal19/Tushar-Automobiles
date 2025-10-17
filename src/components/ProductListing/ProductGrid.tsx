import React, { useState, useMemo } from 'react';
import ProductCard from '@/components/Common/ProductCard';
import { AutoProduct } from '@/types/autoProduct';
import { autoProductsData, getProductsByCategory, searchProducts } from '@/data/autoProductsData';
import { sortProducts, filterProducts } from '@/utils/productUtils';

interface ProductGridProps {
  category?: string;
  searchQuery?: string;
  className?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  category, 
  searchQuery, 
  className = '' 
}) => {
  const [sortBy, setSortBy] = useState<string>('newest');
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 10000,
    inStock: undefined as boolean | undefined,
    minRating: 0,
    brand: ''
  });

  // Get products based on category or search
  const baseProducts = useMemo(() => {
    if (searchQuery) {
      return searchProducts(searchQuery);
    }
    if (category) {
      return getProductsByCategory(category);
    }
    return autoProductsData;
  }, [category, searchQuery]);

  // Apply filters and sorting
  const filteredAndSortedProducts = useMemo(() => {
    let products = filterProducts(baseProducts, {
      ...filters,
      category: category
    });
    return sortProducts(products, sortBy);
  }, [baseProducts, filters, sortBy, category]);

  // Get unique brands for filter
  const availableBrands = useMemo(() => {
    const brands = [...new Set(baseProducts.map(p => p.brand))];
    return brands.sort();
  }, [baseProducts]);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Filters and Sort */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          {/* Sort Dropdown */}
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="newest">Newest First</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="name">Name A-Z</option>
              <option value="discount">Highest Discount</option>
            </select>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2">
            {/* Brand Filter */}
            <select
              value={filters.brand}
              onChange={(e) => setFilters(prev => ({ ...prev, brand: e.target.value }))}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Brands</option>
              {availableBrands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>

            {/* Stock Filter */}
            <select
              value={filters.inStock === undefined ? '' : filters.inStock.toString()}
              onChange={(e) => setFilters(prev => ({ 
                ...prev, 
                inStock: e.target.value === '' ? undefined : e.target.value === 'true'
              }))}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Stock</option>
              <option value="true">In Stock</option>
              <option value="false">Out of Stock</option>
            </select>

            {/* Price Range */}
            <div className="flex items-center space-x-2">
              <input
                type="number"
                placeholder="Min Price"
                value={filters.minPrice}
                onChange={(e) => setFilters(prev => ({ ...prev, minPrice: Number(e.target.value) }))}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm w-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-gray-500">-</span>
              <input
                type="number"
                placeholder="Max Price"
                value={filters.maxPrice}
                onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm w-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredAndSortedProducts.length} of {baseProducts.length} products
          {category && ` in ${category}`}
          {searchQuery && ` for "${searchQuery}"`}
        </div>
      </div>

      {/* Product Grid */}
      {filteredAndSortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-2">No products found</div>
          <p className="text-gray-400">
            Try adjusting your filters or search terms
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;