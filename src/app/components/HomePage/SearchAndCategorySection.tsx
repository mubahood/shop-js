// src/app/components/HomePage/SearchAndCategorySection.tsx
import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useManifestCategories, useManifest } from '../../hooks/useManifest';
import { Spinner } from 'react-bootstrap';
import Utils from '../../utils/imageUtils';
import FeaturedBrands from './FeaturedBrands';
import Banner from '../shared/Banner';
import { useBanners } from '../../hooks/useBanners';
import './SearchAndCategorySection.css';

const SearchAndCategorySection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const categories = useManifestCategories();
  const { isLoading } = useManifest();
  const { banners } = useBanners();
  
  // Default banner image URL
  const defaultBannerImage = '/media/bans/banner1.png';
  
  // Get first banner for this section (near search and promotional links)
  const sectionBanner = useMemo(() => {
    return banners.length > 0 ? banners[0] : null;
  }, [banners]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Promotional links
  const promotionalLinks = [
    { label: 'Flash Sale', path: '/products?deals=flash' },
    { label: 'New Arrivals', path: '/products?sort=newest' },
    { label: 'Clearance Sales', path: '/products?deals=clearance' },
    { label: 'Smart TVS', path: '/products?category=tvs' },
    { label: 'Smart Phones', path: '/products?category=smartphones' },
    { label: 'Home Appliances', path: '/products?category=appliances' },
  ];

  return (
    <div className="search-category-section">
      {/* Top Band: Categories and Search */}
      <div className="search-category-top">
        <div className="search-category-container">
          <div className="row g-0">
            {/* Category Sidebar */}
            <div className="col-lg-3">
              <div className="category-sidebar-wrapper">
                <div className="category-sidebar-header">
                  <h3>Shop by Category</h3>
                </div>
                <div className="category-sidebar-content">
                  {isLoading ? (
                    <div className="category-loading">
                      <Spinner animation="border" size="sm" />
                    </div>
                  ) : (
                    <ul className="category-list">
                      {categories && categories.map((category) => (
                        <li key={category.id}>
                          <Link
                            to={`/products?category=${category.id}`}
                            className="category-item"
                          >
                            <span className="category-name">{category.category}</span>
                            <i className="bi bi-chevron-right category-arrow"></i>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="col-lg-9">
              <div className="search-bar-wrapper">
                <form className="search-form" onSubmit={handleSearch}>
                  <input
                    type="search"
                    className="search-input"
                    placeholder="Search for products, brands..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button type="submit" className="search-button">
                    <i className="bi bi-search"></i>
                  </button>
                </form>
              </div>
              
              {/* Promotional Links - Below Search Bar */}
              <div className="promotional-links-wrapper">
                <div className="promotional-links">
                  <div className="promotional-links-inner">
                    {promotionalLinks.map((link, index) => (
                      <React.Fragment key={link.path}>
                        <Link to={link.path} className="promotional-link">
                          {link.label}
                        </Link>
                        {index < promotionalLinks.length - 1 && (
                          <span className="promotional-separator">|</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Dynamic Banner - Below promotional links in white space */}
              <div className="static-banner-wrapper">
                <Banner
                  banner={sectionBanner}
                  defaultImage={defaultBannerImage}
                  height="300px"
                  mobileHeight="200px"
                />
              </div>
              
              {/* Featured Brands - Below Banner */}
              <FeaturedBrands />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchAndCategorySection;

