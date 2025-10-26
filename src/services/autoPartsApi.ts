import { AutoPartsFilters } from '../store/slices/autoPartsSlice';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export class AutoPartsApiService {
  private static async fetchWithErrorHandling<T>(url: string, options?: RequestInit): Promise<T> {
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  static async getAllAutoParts(params: {
    page?: number;
    limit?: number;
    filters?: Partial<AutoPartsFilters>;
  } = {}) {
    const { page = 1, limit = 15, filters = {} } = params;
    
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    // Add filters to query params
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        if (Array.isArray(value) && value.length > 0) {
          queryParams.append(key, value.join(','));
        } else if (!Array.isArray(value)) {
          queryParams.append(key, value.toString());
        }
      }
    });

    return this.fetchWithErrorHandling<PaginatedResponse<any>>(
      `${API_BASE_URL}/auto-parts?${queryParams}`
    );
  }

  static async getFilterOptions() {
    return this.fetchWithErrorHandling<ApiResponse<any>>(
      `${API_BASE_URL}/auto-parts/filters`
    );
  }

  static async getAutoPartById(id: string) {
    return this.fetchWithErrorHandling<ApiResponse<any>>(
      `${API_BASE_URL}/auto-parts/${id}`
    );
  }

  static async searchAutoParts(searchTerm: string, page = 1, limit = 15) {
    const queryParams = new URLSearchParams({
      search: searchTerm,
      page: page.toString(),
      limit: limit.toString(),
    });

    return this.fetchWithErrorHandling<PaginatedResponse<any>>(
      `${API_BASE_URL}/auto-parts?${queryParams}`
    );
  }

  static async getAutoPartsByCategory(category: string, page = 1, limit = 15) {
    const queryParams = new URLSearchParams({
      category,
      page: page.toString(),
      limit: limit.toString(),
    });

    return this.fetchWithErrorHandling<PaginatedResponse<any>>(
      `${API_BASE_URL}/auto-parts?${queryParams}`
    );
  }

  static async getAutoPartsByCompany(company: string, page = 1, limit = 15) {
    const queryParams = new URLSearchParams({
      company,
      page: page.toString(),
      limit: limit.toString(),
    });

    return this.fetchWithErrorHandling<PaginatedResponse<any>>(
      `${API_BASE_URL}/auto-parts?${queryParams}`
    );
  }

  static async getAutoPartsByPriceRange(minPrice: number, maxPrice: number, page = 1, limit = 15) {
    const queryParams = new URLSearchParams({
      minPrice: minPrice.toString(),
      maxPrice: maxPrice.toString(),
      page: page.toString(),
      limit: limit.toString(),
    });

    return this.fetchWithErrorHandling<PaginatedResponse<any>>(
      `${API_BASE_URL}/auto-parts?${queryParams}`
    );
  }
}

export default AutoPartsApiService;