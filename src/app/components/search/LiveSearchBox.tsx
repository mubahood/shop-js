// src/app/components/search/LiveSearchBox.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Form, Button, ListGroup, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useManifest } from '../../hooks/useManifest';
import { ApiService } from '../../services/ApiService';
import { ProductModel } from '../../models/ProductModel';
import { BASE_URL } from '../../../Constants';
import './LiveSearchBox.css';

// Simple debounce function
const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

interface LiveSearchBoxProps {
  placeholder?: string;
  className?: string;
  size?: 'sm' | 'lg';
  showRecentSearches?: boolean;
  onProductSelect?: (product: ProductModel) => void;
  onSearchSubmit?: (query: string) => void;
}

interface SearchResults {
  products: ProductModel[];
  suggestions: string[];
  total: number;
  search_term: string;
}

const LiveSearchBox: React.FC<LiveSearchBoxProps> = ({
  placeholder = "Search for products, brands, categories...",
  className = "",
  size,
  showRecentSearches = true,
  onProductSelect,
  onSearchSubmit
}) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResults | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  
  const navigate = useNavigate();
  const searchRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Get recent search suggestions from manifest
  const { manifest } = useManifest();
  
  // Load recent searches on component mount
  useEffect(() => {
    const loadRecentSearches = async () => {
      try {
        // First try to get from manifest
        const manifestSuggestions = manifest?.recent_search_suggestions || [];
        if (manifestSuggestions.length > 0) {
          setRecentSearches(manifestSuggestions);
        } else {
          // Fallback to API call
          const recent = await ApiService.getSearchHistory(10);
          setRecentSearches(recent);
        }
      } catch (error) {
        console.warn('Failed to load recent searches:', error);
      }
    };

    if (showRecentSearches) {
      loadRecentSearches();
    }
  }, [manifest, showRecentSearches]);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (searchQuery: string) => {
      if (searchQuery.trim().length < 2) {
        setSearchResults(null);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const results = await ApiService.liveSearch(searchQuery, 6);
        setSearchResults(results);
      } catch (error) {
        console.error('Live search failed:', error);
        setSearchResults(null);
      } finally {
        setIsLoading(false);
      }
    }, 300),
    []
  );

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.trim().length === 0) {
      setSearchResults(null);
      setShowDropdown(showRecentSearches && recentSearches.length > 0);
    } else {
      setShowDropdown(true);
      debouncedSearch(value);
    }
  };

  // Handle input focus
  const handleInputFocus = () => {
    if (query.trim().length === 0 && showRecentSearches && recentSearches.length > 0) {
      setShowDropdown(true);
    } else if (query.trim().length >= 2) {
      setShowDropdown(true);
    }
  };

  // Handle input blur
  const handleInputBlur = (e: React.FocusEvent) => {
    // Delay hiding dropdown to allow clicking on items
    setTimeout(() => {
      if (!dropdownRef.current?.contains(e.relatedTarget as Node)) {
        setShowDropdown(false);
      }
    }, 200);
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      performSearch(query.trim());
    }
  };

  // Perform search and navigation
  const performSearch = (searchQuery: string) => {
    setShowDropdown(false);
    setQuery(searchQuery);
    
    if (onSearchSubmit) {
      onSearchSubmit(searchQuery);
    } else {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    performSearch(suggestion);
  };

  // Handle product click
  const handleProductClick = (product: ProductModel) => {
    setShowDropdown(false);
    
    if (onProductSelect) {
      onProductSelect(product);
    } else {
      navigate(`/product/${product.id}`);
    }
  };

  // Clear search history
  const handleClearHistory = async () => {
    try {
      await ApiService.clearSearchHistory();
      setRecentSearches([]);
    } catch (error) {
      console.error('Failed to clear search history:', error);
    }
  };

  return (
    <div className={`live-search-box ${className}`}>
      <Form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-wrapper position-relative">
          <div className={`search-input-group ${size ? `search-input-group-${size}` : ''}`}>
            <input
              ref={searchRef}
              type="search"
              className="search-input form-control"
              placeholder={placeholder}
              value={query}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              autoComplete="off"
            />
            <button 
              className="btn btn-search" 
              type="submit" 
              disabled={!query.trim()}
              aria-label="Search"
            >
              {isLoading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                <i className="bi bi-search"></i>
              )}
            </button>
          </div>

          {/* Search Dropdown */}
          {showDropdown && (
            <div 
              ref={dropdownRef}
              className="search-dropdown"
              onMouseDown={(e) => e.preventDefault()} // Prevent blur when clicking
            >
              {/* Loading State */}
              {isLoading && (
                <div className="search-dropdown-section">
                  <div className="search-dropdown-loading">
                    <Spinner animation="border" size="sm" />
                    <span className="ms-2">Searching...</span>
                  </div>
                </div>
              )}

              {/* Search Results */}
              {searchResults && !isLoading && (
                <>
                  {/* Products */}
                  {searchResults.products.length > 0 && (
                    <div className="search-dropdown-section">
                      <div className="search-dropdown-header">
                        <i className="bi bi-box"></i>
                        <span>Products</span>
                      </div>
                      {searchResults.products.map((product) => (
                        <div
                          key={product.id}
                          className="search-dropdown-item product-item"
                          onClick={() => handleProductClick(product)}
                        >
                          <div className="product-image">
                            <img
                              src={`${BASE_URL}/storage/${product.feature_photo || 'placeholder-image.jpg'}`}
                              alt={product.name}
                              onError={(e) => {
                                e.currentTarget.src = '/placeholder-image.jpg';
                              }}
                            />
                          </div>
                          <div className="product-info">
                            <div className="product-name">{product.name}</div>
                            <div className="product-price">
                              UGX {parseInt(product.price_1 || '0').toLocaleString()}
                            </div>
                          </div>
                          <i className="bi bi-arrow-up-right search-item-action"></i>
                        </div>
                      ))}
                      {searchResults.total > searchResults.products.length && (
                        <div className="search-dropdown-footer">
                          <button
                            className="btn btn-link btn-sm"
                            onClick={() => performSearch(query)}
                          >
                            View all {searchResults.total} results
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Search Suggestions */}
                  {searchResults.suggestions.length > 0 && (
                    <div className="search-dropdown-section">
                      <div className="search-dropdown-header">
                        <i className="bi bi-search"></i>
                        <span>Suggestions</span>
                      </div>
                      {searchResults.suggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          className="search-dropdown-item"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          <i className="bi bi-search"></i>
                          <span>{suggestion}</span>
                          <i className="bi bi-arrow-up-left search-item-action"></i>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* No Results */}
                  {searchResults.products.length === 0 && searchResults.suggestions.length === 0 && (
                    <div className="search-dropdown-section">
                      <div className="search-no-results">
                        <i className="bi bi-search"></i>
                        <span>No results found for "{query}"</span>
                        <button
                          className="btn btn-link btn-sm"
                          onClick={() => performSearch(query)}
                        >
                          Search anyway
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Recent Searches */}
              {!searchResults && !isLoading && showRecentSearches && recentSearches.length > 0 && (
                <div className="search-dropdown-section">
                  <div className="search-dropdown-header">
                    <i className="bi bi-clock-history"></i>
                    <span>Recent Searches</span>
                    <button
                      className="btn btn-link btn-sm ms-auto"
                      onClick={handleClearHistory}
                    >
                      Clear
                    </button>
                  </div>
                  {recentSearches.map((search, index) => (
                    <div
                      key={index}
                      className="search-dropdown-item"
                      onClick={() => handleSuggestionClick(search)}
                    >
                      <i className="bi bi-clock"></i>
                      <span>{search}</span>
                      <i className="bi bi-arrow-up-left search-item-action"></i>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </Form>
    </div>
  );
};

export default LiveSearchBox;
