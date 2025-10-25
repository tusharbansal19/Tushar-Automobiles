import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Types
export interface AutoPart {
  id: string;
  title: string;
  brand: string;
  category: string;
  vehicleType: string;
  company: string;
  model: string;
  variant?: string;
  fuelType: string;
  transmission: string;
  specifications?: Record<string, string>;
  stockStatus: 'in-stock' | 'out-of-stock' | 'pre-order' | 'limited-stock';
  reviews: number;
  price: number;
  discountedPrice?: number;
  partNumber: string;
  warranty?: string;
  imgs?: {
    thumbnails: string[];
    previews: string[];
  };
  discountPercentage?: number;
  createdAt: string;
  updatedAt: string;
}

export interface FilterOptions {
  companies: { name: string; count: number }[];
  categories: { name: string; count: number }[];
  vehicleTypes: { name: string; count: number }[];
  fuelTypes: { name: string; count: number }[];
  transmissions: string[];
}

export interface AutoPartsFilters {
  search: string;
  companies: string[];
  categories: string[];
  vehicleTypes: string[];
  fuelTypes: string[];
  transmissions: string[];
  stockStatus: string;
  minPrice: number | null;
  maxPrice: number | null;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface AutoPartsState {
  allParts: AutoPart[]; // All parts from API
  filteredParts: AutoPart[]; // Parts after applying filters
  displayedParts: AutoPart[]; // Parts for current page
  filterOptions: FilterOptions | null;
  filters: AutoPartsFilters;
  pagination: PaginationInfo | null;
  loading: boolean;
  error: string | null;
  selectedPart: AutoPart | null;
  itemsPerPage: number;
}

const initialState: AutoPartsState = {
  allParts: [],
  filteredParts: [],
  displayedParts: [],
  filterOptions: null,
  filters: {
    search: '',
    companies: [],
    categories: [],
    vehicleTypes: [],
    fuelTypes: [],
    transmissions: [],
    stockStatus: '',
    minPrice: null,
    maxPrice: null,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  },
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 9,
    hasNextPage: false,
    hasPrevPage: false,
  },
  loading: false,
  error: null,
  selectedPart: null,
  itemsPerPage: 9,
};

// API Base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// Helper function to apply filters and sorting
const applyFiltersAndSort = (parts: AutoPart[], filters: AutoPartsFilters): AutoPart[] => {
  let filtered = [...parts];

  // Apply search filter
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filtered = filtered.filter(part => 
      part.title.toLowerCase().includes(searchTerm) ||
      part.brand.toLowerCase().includes(searchTerm) ||
      part.company.toLowerCase().includes(searchTerm) ||
      part.model.toLowerCase().includes(searchTerm) ||
      part.partNumber.toLowerCase().includes(searchTerm)
    );
  }

  // Apply company filter
  if (filters.companies.length > 0) {
    filtered = filtered.filter(part => filters.companies.includes(part.company));
  }

  // Apply category filter
  if (filters.categories.length > 0) {
    filtered = filtered.filter(part => filters.categories.includes(part.category));
  }

  // Apply vehicle type filter
  if (filters.vehicleTypes.length > 0) {
    filtered = filtered.filter(part => filters.vehicleTypes.includes(part.vehicleType));
  }

  // Apply fuel type filter
  if (filters.fuelTypes.length > 0) {
    filtered = filtered.filter(part => filters.fuelTypes.includes(part.fuelType));
  }

  // Apply transmission filter
  if (filters.transmissions.length > 0) {
    filtered = filtered.filter(part => filters.transmissions.includes(part.transmission));
  }

  // Apply stock status filter
  if (filters.stockStatus) {
    filtered = filtered.filter(part => part.stockStatus === filters.stockStatus);
  }

  // Apply price range filter
  if (filters.minPrice !== null) {
    filtered = filtered.filter(part => part.price >= filters.minPrice!);
  }
  if (filters.maxPrice !== null) {
    filtered = filtered.filter(part => part.price <= filters.maxPrice!);
  }

  // Apply sorting
  filtered.sort((a, b) => {
    let aValue: any = a[filters.sortBy as keyof AutoPart];
    let bValue: any = b[filters.sortBy as keyof AutoPart];

    // Handle different data types
    if (filters.sortBy === 'price') {
      aValue = Number(aValue);
      bValue = Number(bValue);
    } else if (filters.sortBy === 'createdAt') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    } else if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (filters.sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  return filtered;
};

// Helper function to calculate pagination
const calculatePagination = (totalItems: number, currentPage: number, itemsPerPage: number): PaginationInfo => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  return {
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    hasNextPage,
    hasPrevPage,
  };
};

// Async Thunks
export const fetchAllAutoParts = createAsyncThunk(
  'autoParts/fetchAllAutoParts',
  async (_, { rejectWithValue }) => {
    try {
      let allParts: AutoPart[] = [];
      let currentPage = 1;
      let hasMorePages = true;
      const limit = 100; // Maximum allowed by validation

      while (hasMorePages) {
        const url = `${API_BASE_URL}/auto-parts?page=${currentPage}&limit=${limit}`;
        console.log(`Fetching parts from URL: ${url}`);
        
        const response = await fetch(url);
        
        if (!response.ok) {
          // If API fails, try to use fallback data
          console.warn(`API request failed with status ${response.status}, using fallback data`);
          
          // Import fallback data dynamically
          const { autoProductsData } = await import('@/data/autoProductsData');
          
          // Convert autoProductsData to AutoPart format
          const fallbackParts: AutoPart[] = autoProductsData.map(product => ({
            id: product.id,
            title: product.name,
            brand: product.brand,
            category: product.category,
            vehicleType: 'Car', // Default value
            // vehicleName removed - use company + model instead
            company: product.brand,
            model: product.name.split(' ').slice(0, 2).join(''), // Extract model
            variant: 'Standard',
            fuelType: 'Petrol', // Default value
            transmission: 'Manual', // Default value
            specifications: product.specifications,
            stockStatus: product.inStock ? 'in-stock' : 'out-of-stock',
            reviews: product.reviews,
            price: product.price,
            discountedPrice: product.originalPrice,
            partNumber: product.id.toUpperCase(),
            warranty: '1 Year',
            imgs: {
              thumbnails: [product.image],
              previews: [product.image]
            },
            // discountPercentage removed - calculate dynamically
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }));
          
          console.log(`Using ${fallbackParts.length} fallback parts`);
          return fallbackParts;
        }
        
        const result = await response.json();
        
        if (result.success && result.data) {
          allParts = [...allParts, ...result.data];
          
          // Check if there are more pages
          hasMorePages = result.pagination.hasNextPage;
          currentPage++;
        } else {
          hasMorePages = false;
        }
      }

      console.log(`Fetched ${allParts.length} total parts from API`);
      return allParts;
    } catch (error) {
      console.error('Error fetching all auto parts:', error);
      
      // Try to use fallback data on any error
      try {
        const { autoProductsData } = await import('@/data/autoProductsData');
        
        const fallbackParts: AutoPart[] = autoProductsData.map(product => ({
          id: product.id,
          title: product.name,
          brand: product.brand,
          category: product.category,
          vehicleType: 'Car',
          // vehicleName removed - use company + model instead
          company: product.brand,
          model: product.name.split(' ').slice(0, 2).join(''),
          variant: 'Standard',
          fuelType: 'Petrol',
          transmission: 'Manual',
          specifications: product.specifications,
          stockStatus: product.inStock ? 'in-stock' : 'out-of-stock',
          reviews: product.reviews,
          price: product.price,
          discountedPrice: product.originalPrice,
          partNumber: product.id.toUpperCase(),
          warranty: '1 Year',
          imgs: {
            thumbnails: [product.image],
            previews: [product.image]
          },
          // discountPercentage removed - calculate dynamically
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }));
        
        console.log(`Using ${fallbackParts.length} fallback parts due to error`);
        return fallbackParts;
      } catch (fallbackError) {
        console.error('Failed to load fallback data:', fallbackError);
        return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch auto parts');
      }
    }
  }
);

export const fetchFilterOptions = createAsyncThunk(
  'autoParts/fetchFilterOptions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auto-parts/filters`);
      
      if (!response.ok) {
        console.warn(`Filter API failed with status ${response.status}, using fallback data`);
        
        // Fallback filter options
        const fallbackOptions = {
          success: true,
          data: {
            companies: [
              { name: 'Castrol', count: 2 },
              { name: 'Valeo', count: 2 },
              { name: 'Bosch', count: 2 },
              { name: 'Mann Filter', count: 1 },
              { name: 'Hella', count: 1 },
              { name: 'NGK', count: 1 },
              { name: 'Monroe', count: 1 },
              { name: 'Denso', count: 1 },
              { name: 'Exide', count: 1 }
            ],
            categories: [
              { name: 'Engine Components', count: 4 },
              { name: 'Braking System', count: 2 },
              { name: 'Lighting', count: 1 },
              { name: 'Suspension System', count: 1 },
              { name: 'Fuel System', count: 1 },
              { name: 'Cooling System', count: 1 },
              { name: 'Accessories', count: 1 }
            ],
            vehicleTypes: [
              { name: 'Car', count: 8 },
              { name: 'SUV', count: 2 },
              { name: 'Bike', count: 1 }
            ],
            fuelTypes: [
              { name: 'Petrol', count: 7 },
              { name: 'Diesel', count: 3 },
              { name: 'Electric', count: 1 }
            ],
            transmissions: ['Manual', 'Automatic', 'CVT']
          }
        };
        
        return fallbackOptions;
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching filter options:', error);
      
      // Fallback filter options on error
      const fallbackOptions = {
        success: true,
        data: {
          companies: [
            { name: 'Castrol', count: 2 },
            { name: 'Valeo', count: 2 },
            { name: 'Bosch', count: 2 },
            { name: 'Mann Filter', count: 1 },
            { name: 'Hella', count: 1 },
            { name: 'NGK', count: 1 },
            { name: 'Monroe', count: 1 },
            { name: 'Denso', count: 1 },
            { name: 'Exide', count: 1 }
          ],
          categories: [
            { name: 'Engine Components', count: 4 },
            { name: 'Braking System', count: 2 },
            { name: 'Lighting', count: 1 },
            { name: 'Suspension System', count: 1 },
            { name: 'Fuel System', count: 1 },
            { name: 'Cooling System', count: 1 },
            { name: 'Accessories', count: 1 }
          ],
          vehicleTypes: [
            { name: 'Car', count: 8 },
            { name: 'SUV', count: 2 },
            { name: 'Bike', count: 1 }
          ],
          fuelTypes: [
            { name: 'Petrol', count: 7 },
            { name: 'Diesel', count: 3 },
            { name: 'Electric', count: 1 }
          ],
          transmissions: ['Manual', 'Automatic', 'CVT']
        }
      };
      
      return fallbackOptions;
    }
  }
);

export const fetchAutoPartById = createAsyncThunk(
  'autoParts/fetchAutoPartById',
  async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/auto-parts/${id}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch auto part');
    }
    
    return response.json();
  }
);

// Slice
const autoPartsSlice = createSlice({
  name: 'autoParts',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      if (state.filters.search !== action.payload) {
        state.filters.search = action.payload;
        // Apply filters and reset to page 1
        state.filteredParts = applyFiltersAndSort(state.allParts, state.filters);
        const newPagination = calculatePagination(state.filteredParts.length, 1, state.itemsPerPage);
        state.pagination = newPagination;
        // Update displayed parts for current page
        const startIndex = 0;
        const endIndex = state.itemsPerPage;
        state.displayedParts = state.filteredParts.slice(startIndex, endIndex);
      }
    },
    setCompanyFilter: (state, action: PayloadAction<string[]>) => {
      const newCompanies = action.payload;
      if (JSON.stringify(state.filters.companies) !== JSON.stringify(newCompanies)) {
        state.filters.companies = newCompanies;
        // Apply filters and reset to page 1
        state.filteredParts = applyFiltersAndSort(state.allParts, state.filters);
        const newPagination = calculatePagination(state.filteredParts.length, 1, state.itemsPerPage);
        state.pagination = newPagination;
        // Update displayed parts for current page
        const startIndex = 0;
        const endIndex = state.itemsPerPage;
        state.displayedParts = state.filteredParts.slice(startIndex, endIndex);
      }
    },
    setCategoryFilter: (state, action: PayloadAction<string[]>) => {
      const newCategories = action.payload;
      if (JSON.stringify(state.filters.categories) !== JSON.stringify(newCategories)) {
        state.filters.categories = newCategories;
        // Apply filters and reset to page 1
        state.filteredParts = applyFiltersAndSort(state.allParts, state.filters);
        const newPagination = calculatePagination(state.filteredParts.length, 1, state.itemsPerPage);
        state.pagination = newPagination;
        // Update displayed parts for current page
        const startIndex = 0;
        const endIndex = state.itemsPerPage;
        state.displayedParts = state.filteredParts.slice(startIndex, endIndex);
      }
    },
    setVehicleTypeFilter: (state, action: PayloadAction<string[]>) => {
      const newVehicleTypes = action.payload;
      if (JSON.stringify(state.filters.vehicleTypes) !== JSON.stringify(newVehicleTypes)) {
        state.filters.vehicleTypes = newVehicleTypes;
        // Apply filters and reset to page 1
        state.filteredParts = applyFiltersAndSort(state.allParts, state.filters);
        const newPagination = calculatePagination(state.filteredParts.length, 1, state.itemsPerPage);
        state.pagination = newPagination;
        // Update displayed parts for current page
        const startIndex = 0;
        const endIndex = state.itemsPerPage;
        state.displayedParts = state.filteredParts.slice(startIndex, endIndex);
      }
    },
    setFuelTypeFilter: (state, action: PayloadAction<string[]>) => {
      const newFuelTypes = action.payload;
      if (JSON.stringify(state.filters.fuelTypes) !== JSON.stringify(newFuelTypes)) {
        state.filters.fuelTypes = newFuelTypes;
        // Apply filters and reset to page 1
        state.filteredParts = applyFiltersAndSort(state.allParts, state.filters);
        const newPagination = calculatePagination(state.filteredParts.length, 1, state.itemsPerPage);
        state.pagination = newPagination;
        // Update displayed parts for current page
        const startIndex = 0;
        const endIndex = state.itemsPerPage;
        state.displayedParts = state.filteredParts.slice(startIndex, endIndex);
      }
    },
    setTransmissionFilter: (state, action: PayloadAction<string[]>) => {
      state.filters.transmissions = action.payload;
    },
    setStockStatusFilter: (state, action: PayloadAction<string>) => {
      state.filters.stockStatus = action.payload;
    },
    setPriceRange: (state, action: PayloadAction<{ min: number | null; max: number | null }>) => {
      state.filters.minPrice = action.payload.min;
      state.filters.maxPrice = action.payload.max;
    },
    setSorting: (state, action: PayloadAction<{ sortBy: string; sortOrder: 'asc' | 'desc' }>) => {
      const { sortBy, sortOrder } = action.payload;
      if (state.filters.sortBy !== sortBy || state.filters.sortOrder !== sortOrder) {
        state.filters.sortBy = sortBy;
        state.filters.sortOrder = sortOrder;
        // Apply filters and reset to page 1
        state.filteredParts = applyFiltersAndSort(state.allParts, state.filters);
        const newPagination = calculatePagination(state.filteredParts.length, 1, state.itemsPerPage);
        state.pagination = newPagination;
        // Update displayed parts for current page
        const startIndex = 0;
        const endIndex = state.itemsPerPage;
        state.displayedParts = state.filteredParts.slice(startIndex, endIndex);
      }
    },
    clearAllFilters: (state) => {
      state.filters = {
        ...initialState.filters,
      };
      // Apply filters (which will be empty) and reset to page 1
      state.filteredParts = applyFiltersAndSort(state.allParts, state.filters);
      const newPagination = calculatePagination(state.filteredParts.length, 1, state.itemsPerPage);
      state.pagination = newPagination;
      // Update displayed parts for current page
      const startIndex = 0;
      const endIndex = state.itemsPerPage;
      state.displayedParts = state.filteredParts.slice(startIndex, endIndex);
    },
    clearError: (state) => {
      state.error = null;
    },
    setSelectedPart: (state, action: PayloadAction<AutoPart | null>) => {
      state.selectedPart = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      const newPage = action.payload;
      
      // Only update if page actually changed
      if (state.pagination && newPage !== state.pagination.currentPage) {
        const newPagination = calculatePagination(state.filteredParts.length, newPage, state.itemsPerPage);
        
        state.pagination.currentPage = newPagination.currentPage;
        state.pagination.totalPages = newPagination.totalPages;
        state.pagination.totalItems = newPagination.totalItems;
        state.pagination.hasNextPage = newPagination.hasNextPage;
        state.pagination.hasPrevPage = newPagination.hasPrevPage;
        
        // Update displayed parts for new page
        const startIndex = (newPage - 1) * state.itemsPerPage;
        const endIndex = startIndex + state.itemsPerPage;
        state.displayedParts = state.filteredParts.slice(startIndex, endIndex);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Auto Parts
      .addCase(fetchAllAutoParts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllAutoParts.fulfilled, (state, action) => {
        state.loading = false;
        state.allParts = action.payload;
        // Apply current filters to new data
        state.filteredParts = applyFiltersAndSort(state.allParts, state.filters);
        // Reset to page 1 and calculate pagination
        const newPagination = calculatePagination(state.filteredParts.length, 1, state.itemsPerPage);
        state.pagination = newPagination;
        // Update displayed parts for first page
        const startIndex = 0;
        const endIndex = state.itemsPerPage;
        state.displayedParts = state.filteredParts.slice(startIndex, endIndex);
      })
      .addCase(fetchAllAutoParts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch auto parts';
      })
      // Fetch Filter Options
      .addCase(fetchFilterOptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilterOptions.fulfilled, (state, action) => {
        state.loading = false;
        state.filterOptions = action.payload.data;
      })
      .addCase(fetchFilterOptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch filter options';
      })
      // Fetch Auto Part by ID
      .addCase(fetchAutoPartById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAutoPartById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPart = action.payload.data;
      })
      .addCase(fetchAutoPartById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch auto part';
      });
  },
});

export const {
  setSearch,
  setCompanyFilter,
  setCategoryFilter,
  setVehicleTypeFilter,
  setFuelTypeFilter,
  setTransmissionFilter,
  setStockStatusFilter,
  setPriceRange,
  setSorting,
  clearAllFilters,
  clearError,
  setSelectedPart,
  setCurrentPage,
} = autoPartsSlice.actions;

export default autoPartsSlice.reducer;