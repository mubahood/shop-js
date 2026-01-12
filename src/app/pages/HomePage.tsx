// src/app/pages/HomePage.tsx
import React, { useEffect, useCallback, memo, useRef, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { Alert } from "react-bootstrap";
import SearchAndCategorySection from "../components/HomePage/SearchAndCategorySection";
import SuperBuyerSection from "../components/HomePage/SuperBuyerSection";
import DealsSection from "../components/HomePage/DealsSection";
import FeaturedCategoriesSection from "../components/HomePage/FeaturedCategoriesSection";
import ToastService from "../services/ToastService";
import { useLazyLoad } from "../hooks/useIntersectionObserver";
import { SEOHead } from "../components/seo";
import { generateHomePageMetaTags } from "../utils/seo";
import { useGetProductsQuery } from "../services/realProductsApi";
import { useManifestCategories } from "../hooks/useManifest";
import ProductCard2 from "../components/shared/ProductCard2";
import Banner from "../components/shared/Banner";
import { useBanners } from "../hooks/useBanners";
import { Banner as BannerType } from "../services/BannerService";
import "./HomePage.css"; // Import the CSS file to ensure mobile gap fixes are applied
// Inline styles for HomePage following the unified design system
const homePageStyles = `
  .homepage-container {
    background: var(--background-body);
    padding-top: 0.5rem;
    padding-bottom: 0;
    margin-bottom: 0;
  }

  .homepage-section {
    padding: 0.25rem 0;
  }

  /* Reduce spacing for deals section container */
  .deals-section-container .homepage-section {
    padding-bottom: 0;
  }

  .homepage-section:first-child {
    padding-top: 0;
  }

  .homepage-section:last-child {
    padding-bottom: 1rem;
  }

  .hero-section-fullwidth {
    width: 100%;
    max-width: 1160px;
    margin: 0 auto 0.25rem auto;
  }

  /* Ensure hero content stays within container */
  .hero-section-fullwidth .hero-section {
    width: 100%;
    max-width: 100%;
    margin: 0;
  }

  .homepage-container .container {
    max-width: 1200px;
    margin: 0 auto;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 0;
    margin-bottom: 0;
  }

  /* Category strips (e.g., Trending in Smartphones) */
  .category-strip {
    background: #f3f3f3;
    border-radius: 10px;
    padding: 1.25rem 1rem;
    margin: 0;
    position: relative;
  }

  .category-strip-title {
    font-size: 1.5rem;
    font-weight: 800;
    margin: 0 0 1rem 0;
    color: #111;
  }

  .category-strip-list {
    display: flex;
    gap: 1rem;
    overflow-x: auto;
    padding-bottom: 0.25rem;
    scroll-behavior: smooth;
  }

  .category-strip-view-all {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--primary-color);
    text-decoration: none;
  }

  .category-strip-view-all:hover {
    text-decoration: underline;
  }

  .category-strip-next {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    background: #000000;
    color: #ffffff;
    border: none;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 4px 10px rgba(0,0,0,0.15);
    z-index: 2;
    transition: background 0.2s ease;
  }

  .category-strip-next:hover {
    background: #333333;
  }

  .category-strip-next i {
    color: #ffffff;
  }

  /* Ensure only ~6 cards visible per row on desktop and avoid squished cards */
  .category-strip-list .pc2-flash {
    flex: 0 0 190px; /* fixed card width for nicer spacing */
  }

  .category-strip-list::-webkit-scrollbar {
    height: 6px;
  }

  .category-strip-list::-webkit-scrollbar-thumb {
    background: rgba(0,0,0,0.1);
    border-radius: 3px;
  }

  @media (max-width: 1024px) {
    .category-strip-list .pc2-flash {
      flex: 0 0 220px; /* slightly wider cards on tablets */
    }
  }

  @media (max-width: 767.98px) {
    .category-strip {
      padding: 1rem 0;
      margin: 0 0 1rem 0;
    }

    .category-strip-title {
      font-size: 1.25rem;
    }

    .category-strip-list .pc2-flash {
      flex: 0 0 70%;
    }

    .category-strip-next {
      right: 4px;
      width: 32px;
      height: 32px;
    }
  }

  /* Banner below Flash Sales */
  .homepage-container .static-banner {
    height: 400px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  @media (max-width: 767.98px) {
    .homepage-container .static-banner {
      height: 250px;
    }
  }

  @media (max-width: 480px) {
    .homepage-container .static-banner {
      height: 300px;
    }
  }

  /* Mobile banner - full width edge-to-edge */
  .mobile-banner-wrapper {
    width: 100%;
    margin-left: 0;
    margin-right: 0;
    padding-left: 0;
    padding-right: 0;
  }

  @media (max-width: 767.98px) {
    .mobile-banner-wrapper {
      margin-bottom: 1.5rem;
    }
  }

  .mobile-banner {
    width: 100vw;
    margin-left: calc(-50vw + 50%);
    border-radius: 0 !important;
  }

  /* Category banner wrapper - full width on mobile */
  .category-banner-wrapper {
    width: 100%;
  }

  @media (max-width: 767.98px) {
    .category-banner-wrapper {
      padding-top: 1rem !important;
      padding-bottom: 1rem !important;
    }
  }

  /* Mobile responsiveness fixes - reduce gaps and center content */
  @media (max-width: 767.98px) {
    .homepage-container {
      padding-top: 0.25rem;
      padding-bottom: 0 !important;
      margin-bottom: 0 !important;
    }
    
    .homepage-container .container {
      margin-top: 0 !important;
      padding-top: 0 !important;
      padding-bottom: 0 !important;
      margin-bottom: 0 !important;
      padding-left: 10px;
      padding-right: 10px;
    }
    
    .hero-section-fullwidth {
      margin: 0 auto 0.25rem auto;
      max-width: 100%;
      padding: 0;
    }
    
    .hero-section-fullwidth .hero-section {
      margin: 0;
    }
    
    .homepage-section {
      padding: 0; /* Complete removal of section padding on mobile */
      margin: 0 !important; /* Force remove all margins */
    }
    
    .homepage-section:first-child {
      padding-top: 0;
      margin-top: 0 !important;
    }
    
    .homepage-section:last-child {
      padding-bottom: 1rem; /* Only add padding to last section */
      margin-bottom: 0 !important;
    }
    
    .hero-section-fullwidth {
      margin-bottom: 0; /* Remove all margin after hero section */
    }
    
    /* Force remove gaps between hero and deals - more aggressive */
    .homepage-section:nth-child(1),
    .homepage-section:first-of-type {
      margin-bottom: 0 !important;
      padding-bottom: 0 !important;
    }
    
    .homepage-section:nth-child(2),
    .homepage-section:nth-of-type(2) {
      margin-top: 0 !important;
      padding-top: 0 !important;
    }
    
    /* Target specific sections by component */
    .hero-section {
      margin-bottom: 0 !important;
      padding-bottom: 0 !important;
    }
    
    .deals-section-wrapper {
      margin-top: 0 !important;
      padding-top: 0 !important;
    }
  }

  @media (max-width: 575.98px) {
    .homepage-section {
      padding: 0; /* Ensure no padding on small mobile */
    }
    
    .homepage-section:first-child {
      padding-top: 0;
    }
    
    .hero-section-fullwidth {
      margin: 0 auto 0.25rem auto;
      width: 100%;
      max-width: 100%;
      padding: 0 5px;
    }
    
    .homepage-container .container {
      padding-left: 5px;
      padding-right: 5px;
    }
  }
`;

// Lazy loaded section components with performance optimization
const LazyDealsSection = memo(() => {
  const { isIntersecting, ref } = useLazyLoad(0.1, '200px');
  
  return (
    <div ref={ref} className="homepage-section">
      {isIntersecting ? <DealsSection /> : (
        <div style={{ height: '300px' }} className="d-flex align-items-center justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading deals...</span>
          </div>
        </div>
      )}
    </div>
  );
});

const LazySuperBuyerSection = memo(() => {
  const { isIntersecting, ref } = useLazyLoad(0.1, '200px');
  
  return (
    <div ref={ref} className="homepage-section">
      {isIntersecting ? <SuperBuyerSection /> : (
        <div style={{ height: '400px' }} className="d-flex align-items-center justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading super buyer deals...</span>
          </div>
        </div>
      )}
    </div>
  );
});

interface LocationState {
  orderSuccess?: boolean;
  orderId?: number;
  paymentUrl?: string;
}

// Category strip component: fetches products by category name or direct category ID
const CategoryStrip: React.FC<{ title: string; categoryName?: string; categoryId?: number }> = memo(({ title, categoryName, categoryId: directCategoryId }) => {
  const categories = useManifestCategories();
  
  // Try to find category with multiple variations
  const findCategoryId = (name: string) => {
    if (!categories) return undefined;
    
    const variations = [
      name,
      name.toLowerCase(),
      name.toUpperCase(),
      name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(),
      // Try singular/plural variations
      name.endsWith('s') ? name.slice(0, -1) : name + 's',
      name.endsWith('S') ? name.slice(0, -1) : name + 'S',
    ];
    
    for (const variation of variations) {
      const found = categories.find(
        (c) => c.category?.toLowerCase() === variation.toLowerCase()
      );
      if (found) return found.id;
    }
    
    return undefined;
  };
  
  // Use direct categoryId if provided, otherwise lookup by name
  const categoryId = directCategoryId || (categoryName ? findCategoryId(categoryName) : undefined);
  
  // Debug: Log available categories if no match found
  useEffect(() => {
    if (!categoryId && categories && categories.length > 0 && categoryName) {
      console.log(`Category "${categoryName}" not found. Available categories:`, 
        categories.map(c => c.category).filter(Boolean).slice(0, 20) // Show first 20
      );
    }
  }, [categoryId, categoryName, categories]);
  
  const listRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, error } = useGetProductsQuery({
    page: 1,
    limit: (categoryId === 2 || categoryId === 8 || categoryId === 27) ? 24 : 12, // Use limit 24 for Smartphones (category 2), Laptops (category 8), and Laundry (category 27), 12 for others
    category: categoryId,
    sort_by: 'created_at',
    sort_order: 'desc',
  });

  const products = data?.data || [];

  const scrollRight = useCallback(() => {
    if (listRef.current) {
      const cardWidth = 190 + 16; // card width plus gap
      listRef.current.scrollBy({ left: cardWidth * 3, behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="container" style={{ marginBottom: 0 }}>
      <div className="category-strip">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="category-strip-title mb-0">{title}</h3>
          {categoryId && (
            <a
              href={`/products?category=${categoryId}`}
              className="category-strip-view-all"
            >
              View all
            </a>
          )}
        </div>
        {isLoading && <div>Loading...</div>}
        {error && <div style={{ color: 'red' }}>Could not load {title}</div>}
        {!isLoading && !error && (
          <>
            <div className="category-strip-list" ref={listRef}>
            {products.map((product) => (
              <ProductCard2
                key={product.id}
                product={product}
                variant="flash-sales"
                className="pc2-flash"
              />
            ))}
          </div>
            <button className="category-strip-next" onClick={scrollRight} aria-label="Next">
              <i className="bi bi-chevron-right" />
            </button>
          </>
        )}
      </div>
    </div>
  );
});

const HomePage: React.FC = () => {
  const location = useLocation();
  const state = location.state as LocationState;
  const { banners } = useBanners();

  // Default banner images - use same default for both mobile and desktop
  const defaultBannerImage = 'https://www.blit.blitxpress.com/storage/images/f124a471fc367a999e8bd6f5a1a587bd.jpg';

  // Distribute banners without repeating
  // SearchAndCategorySection (desktop only) uses banners[0]
  // For mobile: first banner can use banners[0] since SearchAndCategorySection is not shown
  // For desktop: start from banners[1] since SearchAndCategorySection uses banners[0]
  // We need banners for: 1) Mobile top, 2) Desktop after deals, 3) After first category strips, 4) After second category strips
  const getBannersForPositions = useMemo(() => {
    if (banners.length === 0) {
      return [null, null, null, null];
    }

    // For desktop: start from index 1 since SearchAndCategorySection uses banners[0]
    // For mobile: we can use banners[0] for the first position
    const bannerPositions: (BannerType | null)[] = [];
    for (let i = 0; i < 4; i++) {
      const bannerIndex = i + 1; // Start from index 1 for desktop positions
      if (bannerIndex < banners.length) {
        bannerPositions.push(banners[bannerIndex]);
      } else {
        // If we don't have enough banners, use null (will fallback to default)
        bannerPositions.push(null);
      }
    }
    return bannerPositions;
  }, [banners]);

  const [banner1, banner2, banner3, banner4] = getBannersForPositions;
  
  // For mobile: first banner can use banners[0] since SearchAndCategorySection is desktop-only
  const mobileBanner1 = banners.length > 0 ? banners[0] : null;

  // Optimized success message handler with useCallback
  const handleOrderSuccess = useCallback(() => {
    if (state?.orderSuccess && state?.orderId) {
      ToastService.success(
        `🎉 Order #${state.orderId} placed successfully! Thank you for your purchase.`,
        { autoClose: 6000 }
      );
      
      // Clear the state to prevent showing message on refresh
      window.history.replaceState({}, document.title);
    }
  }, [state?.orderSuccess, state?.orderId]);

  // Optimized payment navigation handler with useCallback
  const handlePaymentNavigation = useCallback((orderId: number) => {
    window.location.href = `/payment/${orderId}`;
  }, []);

  // Optimized orders navigation handler with useCallback
  const handleOrdersNavigation = useCallback(() => {
    window.location.href = "/account/orders";
  }, []);

  useEffect(() => {
    handleOrderSuccess();
  }, [handleOrderSuccess]);

  return (
    <>
      <SEOHead config={generateHomePageMetaTags()} />
      <style dangerouslySetInnerHTML={{ __html: homePageStyles }} />
      
      {/* Search and Category Section - Desktop only */}
      <SearchAndCategorySection />

      {/* Featured Categories Section - Mobile (shown first on mobile) */}
      <div className="d-lg-none">
        <FeaturedCategoriesSection />
      </div>

      {/* Banner Image - Below Featured Categories on Mobile, Below SearchAndCategorySection on Desktop */}
      <div className="d-lg-none mobile-banner-wrapper" style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>
        <Banner
          banner={mobileBanner1 || banner1 || banner2 || banner3 || banner4}
          defaultImage={defaultBannerImage}
          className="mobile-banner"
          height="300px"
        />
      </div>

      {/* Deals Section - Right after SearchAndCategorySection on Desktop, after Banner on Mobile */}
      <div className=" deals-section-container" style={{ paddingTop: 0 }}>
        <div className="container">
          <LazyDealsSection />
        </div>
      </div>

      {/* Banner Image - Below Flash Sales on Desktop */}
      <div className="d-none d-lg-block" style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
        <div className="container">
          <div className="static-banner-wrapper" style={{ padding: '0' }}>
            <Banner
              banner={banner1 || banner2}
              defaultImage={defaultBannerImage}
              height="400px"
            />
          </div>
        </div>
      </div>

      {/* Category Strips under banner */}
      <CategoryStrip title="Trending in Smartphones" categoryId={2} />
      <CategoryStrip title="Trending in Home Electronics" categoryName="Home Appliances" />

      {/* Banner Image - Below Category Strips */}
      <div className="category-banner-wrapper" style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
        <div className="d-none d-lg-block container">
          <div className="static-banner-wrapper" style={{ padding: '0' }}>
            <Banner
              banner={banner2}
              defaultImage={defaultBannerImage}
              height="400px"
            />
          </div>
        </div>
        <div className="d-lg-none">
          <Banner
            banner={banner2 || banner3 || banner4 || banner1}
            defaultImage={defaultBannerImage}
            className="mobile-banner"
            height="300px"
          />
        </div>
      </div>

      {/* Category Strips - Below Banner */}
      <CategoryStrip title="Trending in Button Phones" categoryName="Button Phones" />
      <CategoryStrip title="Trending in Mobile Accessories" categoryName="Mobile Accessories" />

      {/* Banner Image - Below Category Strips */}
      <div className="category-banner-wrapper" style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
        <div className="d-none d-lg-block container">
          <div className="static-banner-wrapper" style={{ padding: '0' }}>
            <Banner
              banner={banner3}
              defaultImage={defaultBannerImage}
              height="400px"
            />
          </div>
        </div>
        <div className="d-lg-none">
          <Banner
            banner={banner3 || banner4 || banner1 || banner2}
            defaultImage={defaultBannerImage}
            className="mobile-banner"
            height="300px"
          />
        </div>
      </div>

      {/* Category Strips - Below Banner */}
      <CategoryStrip title="Trending in Laptops" categoryId={8} />
      <CategoryStrip title="Trending in Laundry" categoryId={27} />
      
      {/* Order Success Alert */}
      {state?.orderSuccess && state?.orderId && (
        <div className="homepage-container">
          <div className="container">
            <Alert variant="success" className="mb-4">
              <Alert.Heading>🎉 Order Placed Successfully!</Alert.Heading>
              <p>
                Your order <strong>#{state.orderId}</strong> has been confirmed and is being processed.
                You will receive a confirmation email shortly.
              </p>
              <hr />
              <div className="d-flex justify-content-between">
                <button 
                  onClick={handleOrdersNavigation}
                  className="btn btn-outline-success"
                  type="button"
                >
                  <i className="bi bi-list-ul me-2"></i>
                  View My Orders
                </button>
                {state.paymentUrl && (
                  <button 
                    onClick={() => handlePaymentNavigation(state.orderId!)}
                    className="btn btn-success"
                    type="button"
                  >
                    <i className="bi bi-credit-card me-2"></i>
                    Complete Payment
                  </button>
                )}
              </div>
            </Alert>
          </div>
        </div>
      )}
    </>
  );
};

export default memo(HomePage);
