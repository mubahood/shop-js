// src/app/components/Header/ModernMainNav.tsx
import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { selectIsAuthenticated, selectUser, logout } from "../../store/slices/authSlice";
import "./ModernMainNav.css";

const ModernMainNav: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Cart and Wishlist selectors
  const { items } = useSelector((state: RootState) => state.cart);
  const { items: wishlistItems } = useSelector((state: RootState) => state.wishlist);
  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlistItems.length;
  
  // Auth selectors
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isMegaMenuOpen, setMegaMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const categoryRef = useRef<HTMLDivElement>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const toggleMenu = () => setMenuOpen(!isMenuOpen);
  const hasNotifications = false; // This would come from notifications state

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setMenuOpen(false);
  };

  // Enhanced mega menu hover handling
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      const categoryElement = categoryRef.current;
      const megaMenuElement = megaMenuRef.current;
      
      if (categoryElement && megaMenuElement) {
        const isOverCategory = categoryElement.contains(e.relatedTarget as Node);
        const isOverMegaMenu = megaMenuElement.contains(e.relatedTarget as Node);
        
        if (!isOverCategory && !isOverMegaMenu) {
          setMegaMenuOpen(false);
        }
      }
    };

    const categoryElement = categoryRef.current;
    const megaMenuElement = megaMenuRef.current;

    if (categoryElement) {
      categoryElement.addEventListener('mouseleave', handleMouseLeave);
    }
    if (megaMenuElement) {
      megaMenuElement.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (categoryElement) {
        categoryElement.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (megaMenuElement) {
        megaMenuElement.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  const recentSearches = ["Smartphones", "Laptops", "Headphones"];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchValue.trim())}`);
      setShowSearchSuggestions(false);
    }
  };

  const handleSearchFocus = () => {
    if (recentSearches.length > 0 && !searchValue) {
      setShowSearchSuggestions(true);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    setShowSearchSuggestions(value.length > 0 || (!value && recentSearches.length > 0));
  };

  return (
    <>
      {/* Modern Mobile Navigation Layout */}
      <div className="modern-mobile-nav d-lg-none">
        {/* Top Row: Menu Toggle + Logo + Action Icons */}
        <div className="mobile-nav-top">
          <div className="container-fluid">
            <div className="mobile-top-row">
              {/* Menu Toggle */}
              <button
                className="mobile-menu-toggle"
                type="button"
                onClick={toggleMenu}
                aria-label="Toggle navigation menu"
              >
                <i className={`bi ${isMenuOpen ? 'bi-x' : 'bi-list'}`}></i>
              </button>

              {/* Logo */}
              <Link to="/" className="mobile-logo-wrapper">
                <img
                  src="/media/logos/logo.png"
                  alt="Blitxpress"
                  className="mobile-logo"
                />
              </Link>

              {/* Action Icons */}
              <div className="mobile-action-icons">
                <Link to="/shop" className="mobile-action-link">
                  <div className="mobile-action-icon-wrapper">
                    <i className="bi bi-shop"></i>
                  </div>
                </Link>
                {isAuthenticated ? (
                  <Link to="/account" className="mobile-action-link">
                    <div className="mobile-action-icon-wrapper">
                      <i className="bi bi-person"></i>
                      {hasNotifications && <span className="mobile-notification-dot"></span>}
                    </div>
                  </Link>
                ) : (
                  <Link to="/auth/login" className="mobile-action-link">
                    <div className="mobile-action-icon-wrapper">
                      <i className="bi bi-box-arrow-in-right"></i>
                    </div>
                  </Link>
                )}
                <Link to="/cart" className="mobile-action-link">
                  <div className="mobile-action-icon-wrapper">
                    <i className="bi bi-bag"></i>
                    {cartItemCount > 0 && (
                      <span className="mobile-cart-badge">{cartItemCount}</span>
                    )}
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row: Search Bar */}
        <div className="mobile-nav-bottom">
          <div className="container-fluid">
            <form className="mobile-search-form" onSubmit={handleSearchSubmit}>
              <div className="mobile-search-input-group">
                <input
                  type="search"
                  className="mobile-search-input"
                  placeholder="Search for products, brands, categories..."
                  value={searchValue}
                  onChange={handleSearchChange}
                />
                <button className="btn btn-search" type="submit" aria-label="Search">
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="main-nav-wrapper d-none d-lg-block">
        <nav className="container d-flex align-items-center h-100">
          {/* Desktop Logo */}
          <Link to="/" className="logo-wrapper me-4">
            <img
              src="/media/logos/logo.png"
              alt="Blitxpress"
              className="main-logo"
            />
          </Link>

          {/* Enhanced Category Mega Menu */}
          <div 
            ref={categoryRef}
            className={`category-toggle  ${isMegaMenuOpen ? 'active' : ''}`}
            onMouseEnter={() => setMegaMenuOpen(true)}
          >
            <div className="category-toggle-content">
              <i className="bi bi-grid-3x3-gap-fill category-icon"></i>
              <span className="category-text">Categories</span>
              <i className="bi bi-chevron-down chevron-icon"></i>
            </div>
            
            {/* Enhanced Mega Menu */}
            <div 
              ref={megaMenuRef}
              className={`mega-menu m-0 ${isMegaMenuOpen ? 'show' : ''}`}
              onMouseEnter={() => setMegaMenuOpen(true)}
            >
              <div className="mega-menu-content">
                <div className="row g-4">
                  <div className="col-md-4">
                    <div className="mega-menu-section">
                      <h5 className="mega-menu-heading">
                        <i className="bi bi-cpu category-section-icon"></i>
                        Consumer Electronics
                      </h5>
                      <div className="mega-menu-links">
                        <a href="/category/mobile-phones" className="mega-menu-link">
                          <i className="bi bi-phone link-icon"></i> 
                          <span>Mobile Phones</span>
                          <span className="item-count">2.5k+</span>
                        </a>
                        <a href="/category/laptops" className="mega-menu-link">
                          <i className="bi bi-laptop link-icon"></i> 
                          <span>Laptops & PCs</span>
                          <span className="item-count">1.8k+</span>
                        </a>
                        <a href="/category/tablets" className="mega-menu-link">
                          <i className="bi bi-tablet-landscape link-icon"></i> 
                          <span>Tablets</span>
                          <span className="item-count">890+</span>
                        </a>
                        <a href="/category/wearables" className="mega-menu-link">
                          <i className="bi bi-smartwatch link-icon"></i> 
                          <span>Wearable Devices</span>
                          <span className="item-count">650+</span>
                        </a>
                        <a href="/category/gaming" className="mega-menu-link">
                          <i className="bi bi-controller link-icon"></i> 
                          <span>Gaming Consoles</span>
                          <span className="item-count">420+</span>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mega-menu-section">
                      <h5 className="mega-menu-heading">
                        <i className="bi bi-bag-heart category-section-icon"></i>
                        Apparel & Fashion
                      </h5>
                      <div className="mega-menu-links">
                        <a href="/category/mens-clothing" className="mega-menu-link">
                          <i className="bi bi-person-fill link-icon"></i> 
                          <span>Men's Clothing</span>
                          <span className="item-count">3.2k+</span>
                        </a>
                        <a href="/category/womens-clothing" className="mega-menu-link">
                          <i className="bi bi-person-dress link-icon"></i> 
                          <span>Women's Clothing</span>
                          <span className="item-count">4.1k+</span>
                        </a>
                        <a href="/category/bags-shoes" className="mega-menu-link">
                          <i className="bi bi-handbag link-icon"></i> 
                          <span>Bags & Shoes</span>
                          <span className="item-count">2.7k+</span>
                        </a>
                        <a href="/category/watches-jewelry" className="mega-menu-link">
                          <i className="bi bi-gem link-icon"></i> 
                          <span>Watches & Jewelry</span>
                          <span className="item-count">1.3k+</span>
                        </a>
                        <a href="/category/accessories" className="mega-menu-link">
                          <i className="bi bi-sunglasses link-icon"></i> 
                          <span>Accessories</span>
                          <span className="item-count">950+</span>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mega-menu-section">
                      <h5 className="mega-menu-heading">
                        <i className="bi bi-house-door category-section-icon"></i>
                        Home & Garden
                      </h5>
                      <div className="mega-menu-links">
                        <a href="/category/lighting" className="mega-menu-link">
                          <i className="bi bi-lightbulb link-icon"></i> 
                          <span>Lights & Lighting</span>
                          <span className="item-count">1.1k+</span>
                        </a>
                        <a href="/category/tools" className="mega-menu-link">
                          <i className="bi bi-tools link-icon"></i> 
                          <span>Tools & Hardware</span>
                          <span className="item-count">1.9k+</span>
                        </a>
                        <a href="/category/garden" className="mega-menu-link">
                          <i className="bi bi-flower1 link-icon"></i> 
                          <span>Garden Supplies</span>
                          <span className="item-count">780+</span>
                        </a>
                        <a href="/category/furniture" className="mega-menu-link">
                          <i className="bi bi-chair link-icon"></i> 
                          <span>Furniture</span>
                          <span className="item-count">1.5k+</span>
                        </a>
                        <a href="/category/appliances" className="mega-menu-link">
                          <i className="bi bi-refrigerator link-icon"></i> 
                          <span>Home Appliances</span>
                          <span className="item-count">990+</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Featured Categories Banner */}
                <div className="mega-menu-banner mt-4 pt-4">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="featured-category-card">
                        <div className="featured-content">
                          <div className="featured-icon">
                            <i className="bi bi-lightning-charge"></i>
                          </div>
                          <div className="featured-text">
                            <h6>Flash Sales</h6>
                            <p>Up to 70% off selected items</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="featured-category-card">
                        <div className="featured-content">
                          <div className="featured-icon featured-icon-secondary">
                            <i className="bi bi-truck"></i>
                          </div>
                          <div className="featured-text">
                            <h6>Free Shipping</h6>
                            <p>On orders above UGX 50,000</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Enhanced Search Form */}
          <form className="search-form flex-grow-1 position-relative" role="search" onSubmit={handleSearchSubmit}>
            <div className="search-input-wrapper">
              <div className="search-input-group">
                <input
                  ref={searchRef}
                  type="search"
                  className="search-input"
                  placeholder="Search for products, brands, categories..."
                  value={searchValue}
                  onChange={handleSearchChange}
                  onFocus={handleSearchFocus}
                  onBlur={() => setTimeout(() => setShowSearchSuggestions(false), 200)}
                />
                <button className="btn btn-search" type="submit" aria-label="Search">
                  <i className="bi bi-search"></i>
                </button>
              </div>
              
              {/* Search Suggestions Dropdown */}
              {showSearchSuggestions && (
                <div className="search-suggestions">
                  {searchValue ? (
                    <div className="suggestions-section">
                      <div className="suggestion-header">
                        <i className="bi bi-search"></i>
                        <span>Search for "{searchValue}"</span>
                      </div>
                      <div className="suggestion-item active">
                        <i className="bi bi-search"></i>
                        <span>{searchValue} in Electronics</span>
                      </div>
                      <div className="suggestion-item">
                        <i className="bi bi-search"></i>
                        <span>{searchValue} in Fashion</span>
                      </div>
                    </div>
                  ) : (
                    <div className="suggestions-section">
                      <div className="suggestion-header">
                        <i className="bi bi-clock-history"></i>
                        <span>Recent Searches</span>
                      </div>
                      {recentSearches.map((search, index) => (
                        <div key={index} className="suggestion-item" onClick={() => setSearchValue(search)}>
                          <i className="bi bi-clock"></i>
                          <span>{search}</span>
                          <i className="bi bi-arrow-up-left suggestion-action"></i>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </form>

          {/* Enhanced Action Icons */}
          <div className="action-icons">
            <Link to="/shop" className="action-link">
              <div className="action-icon-wrapper">
                <i className="bi bi-shop action-icon"></i>
              </div>
              <div className="action-text">Shop</div>
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/account" className="action-link">
                  <div className="action-icon-wrapper">
                    <i className="bi bi-person action-icon"></i>
                    {hasNotifications && <span className="notification-dot"></span>}
                  </div>
                  <div className="action-text">
                    {user?.firstName || 'Account'}
                  </div>
                </Link>
                <Link to="/wishlist" className="action-link">
                  <div className="action-icon-wrapper">
                    <i className="bi bi-heart action-icon"></i>
                    {wishlistCount > 0 && (
                      <span className="cart-badge">{wishlistCount}</span>
                    )}
                  </div>
                  <div className="action-text">Wishlist</div>
                </Link>
              </>
            ) : (
              <>
                <Link to="/auth/login" className="action-link">
                  <div className="action-icon-wrapper">
                    <i className="bi bi-box-arrow-in-right action-icon"></i>
                  </div>
                  <div className="action-text">Login</div>
                </Link>
                <Link to="/auth/register" className="action-link">
                  <div className="action-icon-wrapper">
                    <i className="bi bi-person-plus action-icon"></i>
                  </div>
                  <div className="action-text">Sign Up</div>
                </Link>
              </>
            )}
            
            <Link to="/cart" className="action-link">
              <div className="action-icon-wrapper">
                <i className="bi bi-bag action-icon"></i>
                {cartItemCount > 0 && (
                  <span className="cart-badge">{cartItemCount}</span>
                )}
              </div>
              <div className="action-text">Cart</div>
            </Link>
          </div>
        </nav>
      </div>

      {/* Enhanced Mobile Off-Canvas Menu */}
      <div
        className={`nav-overlay ${isMenuOpen ? "show" : ""}`}
        onClick={toggleMenu}
      ></div>
      <div className={`mobile-nav-offcanvas ${isMenuOpen ? "show" : ""}`}>
        <div className="offcanvas-header">
          <div className="offcanvas-logo">
            <img src="/media/logos/logo.png" alt="Blitxpress" className="mobile-offcanvas-logo" />
          </div>
          <button 
            className="offcanvas-close-btn"
            onClick={toggleMenu}
            aria-label="Close menu"
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <div className="offcanvas-body">
          {/* Mobile Navigation Links */}
          <div className="mobile-nav-section">
            <h6 className="mobile-nav-heading">Categories</h6>
            <ul className="nav-links">
              <li>
                <a href="/category/electronics">
                  <i className="bi bi-cpu"></i>
                  <span>Electronics</span>
                  <i className="bi bi-chevron-right"></i>
                </a>
              </li>
              <li>
                <a href="/category/fashion">
                  <i className="bi bi-bag-heart"></i>
                  <span>Fashion</span>
                  <i className="bi bi-chevron-right"></i>
                </a>
              </li>
              <li>
                <a href="/category/home-garden">
                  <i className="bi bi-house-door"></i>
                  <span>Home & Garden</span>
                  <i className="bi bi-chevron-right"></i>
                </a>
              </li>
              <li>
                <a href="/category/sports">
                  <i className="bi bi-trophy"></i>
                  <span>Sports & Outdoors</span>
                  <i className="bi bi-chevron-right"></i>
                </a>
              </li>
              <li>
                <a href="/category/books">
                  <i className="bi bi-book"></i>
                  <span>Books & Media</span>
                  <i className="bi bi-chevron-right"></i>
                </a>
              </li>
            </ul>
          </div>

          {/* Mobile Account Actions */}
          {isAuthenticated ? (
            <div className="mobile-nav-section">
              <h6 className="mobile-nav-heading">
                Welcome, {user?.firstName || 'User'}!
              </h6>
              <ul className="nav-links">
                <li>
                  <Link to="/account" onClick={toggleMenu}>
                    <i className="bi bi-person"></i>
                    <span>My Account</span>
                    {hasNotifications && <span className="mobile-notification-dot"></span>}
                  </Link>
                </li>
                <li>
                  <Link to="/account/orders" onClick={toggleMenu}>
                    <i className="bi bi-box-seam"></i>
                    <span>My Orders</span>
                  </Link>
                </li>
                <li>
                  <Link to="/wishlist" onClick={toggleMenu}>
                    <i className="bi bi-heart"></i>
                    <span>Wishlist</span>
                    {wishlistCount > 0 && (
                      <span className="mobile-cart-badge">{wishlistCount}</span>
                    )}
                  </Link>
                </li>
                <li>
                  <Link to="/account/addresses" onClick={toggleMenu}>
                    <i className="bi bi-geo-alt"></i>
                    <span>Addresses</span>
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="nav-logout-btn">
                    <i className="bi bi-box-arrow-right"></i>
                    <span>Logout</span>
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="mobile-nav-section">
              <h6 className="mobile-nav-heading">Account</h6>
              <ul className="nav-links">
                <li>
                  <Link to="/auth/login" onClick={toggleMenu}>
                    <i className="bi bi-box-arrow-in-right text-primary"></i>
                    <span>Login</span>
                  </Link>
                </li>
                <li>
                  <Link to="/auth/register" onClick={toggleMenu}>
                    <i className="bi bi-person-plus text-success"></i>
                    <span>Create Account</span>
                  </Link>
                </li>
                <li>
                  <Link to="/wishlist" onClick={toggleMenu}>
                    <i className="bi bi-heart"></i>
                    <span>Wishlist</span>
                    {wishlistCount > 0 && (
                      <span className="mobile-cart-badge">{wishlistCount}</span>
                    )}
                  </Link>
                </li>
              </ul>
            </div>
          )}

          {/* Mobile Quick Links */}
          <div className="mobile-nav-section">
            <h6 className="mobile-nav-heading">Quick Links</h6>
            <ul className="nav-links">
              <li>
                <Link to="/shop" onClick={toggleMenu}>
                  <i className="bi bi-shop text-primary"></i>
                  <span>Shop All Products</span>
                </Link>
              </li>
              <li>
                <a href="/deals">
                  <i className="bi bi-lightning-charge text-warning"></i>
                  <span>Today's Deals</span>
                </a>
              </li>
              <li>
                <a href="/new-arrivals">
                  <i className="bi bi-star text-info"></i>
                  <span>New Arrivals</span>
                </a>
              </li>
              <li>
                <a href="/customer-service">
                  <i className="bi bi-headset"></i>
                  <span>Customer Service</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModernMainNav;
