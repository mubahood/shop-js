// src/app/services/BannerService.ts
import { API_CONFIG } from '../constants';

export interface Banner {
  id: number;
  title: string;
  description: string;
  image: string;
  thumbnail: string;
  url: string | null;
  position: string;
  type: string;
  order: number;
  status: string;
  target: string;
  click_count: number;
  start_date: string | null;
  end_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface BannerResponse {
  code: number;
  status: number;
  message: string;
  data: Banner[];
}

/**
 * Fetch banners from the API
 * Filters banners by position and status
 */
export class BannerService {
  /**
   * Fetch all banners from the API
   */
  static async fetchBanners(): Promise<Banner[]> {
    try {
      const response = await fetch(`${API_CONFIG.API_URL}/banners`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: BannerResponse = await response.json();

      if (result.code === 1 && result.status === 1 && result.data) {
        return result.data;
      }

      return [];
    } catch (error) {
      console.error('Error fetching banners:', error);
      return [];
    }
  }

  /**
   * Get home banners (filtered by position = "home" and status = "active")
   */
  static async getHomeBanners(): Promise<Banner[]> {
    const banners = await this.fetchBanners();
    return banners.filter(
      (banner) => banner.position === 'home' && banner.status === 'active'
    );
  }

  /**
   * Get banners sorted by order
   */
  static async getHomeBannersSorted(): Promise<Banner[]> {
    const banners = await this.getHomeBanners();
    return banners.sort((a, b) => a.order - b.order);
  }
}
