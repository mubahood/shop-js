// src/app/pages/ShopPage.tsx
import React, { useState, useMemo } from "react";
import { Container, Row, Col, Form, Button, Dropdown, Pagination } from "react-bootstrap";
import { useSearchParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/shared/ProductCard";
import { dealsData, topProductsData } from "../data/optimized/products";
import type { ProductWithExtras } from "../types";
import { formatPrice } from "../utils";
import { useManifestCategories } from "../hooks/useManifest";
import "./ShopPage.css";

const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "newest");
  const [priceRange, setPriceRange] = useState({
    min: searchParams.get("minPrice") || "",
    max: searchParams.get("maxPrice") || ""
  });
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get("categories")?.split(",") || []
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Combine all products
  const allProducts: ProductWithExtras[] = useMemo(() => {
    return [...dealsData, ...topProductsData];
  }, []);

  // Get categories from manifest
  const manifestCategories = useManifestCategories();
  
  // Available categories - combine manifest categories with product categories
  const categories = useMemo(() => {
    const productCats = new Set<string>();
    allProducts.forEach(product => {
      if (product.category_text) productCats.add(product.category_text);
    });
    
    const manifestCats = new Set<string>();
    manifestCategories.forEach(category => {
      if (category.category_text) manifestCats.add(category.category_text);
    });
    
    // Combine both sets and return as array
    return Array.from(new Set([...productCats, ...manifestCats]));
  }, [allProducts, manifestCategories]);

  // Price ranges for filtering
  const priceRanges = [
    { label: "Under $50", min: 0, max: 50 },
    { label: "$50 - $100", min: 50, max: 100 },
    { label: "$100 - $200", min: 100, max: 200 },
    { label: "$200 - $500", min: 200, max: 500 },
    { label: "Over $500", min: 500, max: Infinity }
  ];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...allProducts];

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => 
        product.category_text && selectedCategories.includes(product.category_text)
      );
    }

    // Filter by price range
    if (priceRange.min || priceRange.max) {
      filtered = filtered.filter(product => {
        const price = parseFloat(product.price_1);
        const min = priceRange.min ? parseFloat(priceRange.min) : 0;
        const max = priceRange.max ? parseFloat(priceRange.max) : Infinity;
        return price >= min && price <= max;
      });
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => parseFloat(a.price_1) - parseFloat(b.price_1));
        break;
      case "price-high":
        filtered.sort((a, b) => parseFloat(b.price_1) - parseFloat(a.price_1));
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "rating":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default: // newest
        filtered.sort((a, b) => b.id - a.id);
    }

    return filtered;
  }, [allProducts, selectedCategories, priceRange, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked 
      ? [...selectedCategories, category]
      : selectedCategories.filter(c => c !== category);
    
    setSelectedCategories(newCategories);
    setCurrentPage(1);
    
    // Update URL params
    const params = new URLSearchParams(searchParams);
    if (newCategories.length > 0) {
      params.set("categories", newCategories.join(","));
    } else {
      params.delete("categories");
    }
    setSearchParams(params);
  };

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    setCurrentPage(1);
    
    const params = new URLSearchParams(searchParams);
    params.set("sort", newSort);
    setSearchParams(params);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange({ min: "", max: "" });
    setSortBy("newest");
    setCurrentPage(1);
    setSearchParams(new URLSearchParams());
  };

  return (
    <div className="shop-page">
      <Container>
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="my-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/" className="text-decoration-none">Home</Link>
            </li>
            <li className="breadcrumb-item active">Shop</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="shop-header mb-4">
          <h1 className="h2 mb-3">All Products</h1>
          <p className="text-muted">
            Discover our complete collection of quality products
          </p>
        </div>

        <Row>
          {/* Sidebar - Filters */}
          <Col lg={3} className="mb-4">
            <div className="shop-sidebar">
              <div className="filter-section mb-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0">Filters</h5>
                  <Button 
                    variant="outline-secondary" 
                    size="sm"
                    onClick={clearFilters}
                  >
                    Clear All
                  </Button>
                </div>

                {/* Categories */}
                <div className="filter-group mb-4">
                  <h6 className="fw-bold mb-3">Categories</h6>
                  {categories.map(category => (
                    <Form.Check
                      key={category}
                      type="checkbox"
                      id={`category-${category}`}
                      label={category}
                      checked={selectedCategories.includes(category)}
                      onChange={(e) => handleCategoryChange(category, e.target.checked)}
                      className="mb-2"
                    />
                  ))}
                </div>

                {/* Price Range */}
                <div className="filter-group mb-4">
                  <h6 className="fw-bold mb-3">Price Range</h6>
                  {priceRanges.map((range, index) => (
                    <Form.Check
                      key={index}
                      type="radio"
                      name="priceRange"
                      id={`price-${index}`}
                      label={range.label}
                      checked={
                        priceRange.min === range.min.toString() && 
                        priceRange.max === (range.max === Infinity ? "" : range.max.toString())
                      }
                      onChange={() => setPriceRange({
                        min: range.min.toString(),
                        max: range.max === Infinity ? "" : range.max.toString()
                      })}
                      className="mb-2"
                    />
                  ))}
                </div>

                {/* Custom Price Range */}
                <div className="filter-group">
                  <h6 className="fw-bold mb-3">Custom Price Range</h6>
                  <Row className="g-2">
                    <Col>
                      <Form.Control
                        type="number"
                        placeholder="Min"
                        value={priceRange.min}
                        onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        type="number"
                        placeholder="Max"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                      />
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </Col>

          {/* Main Content */}
          <Col lg={9}>
            {/* Results Header */}
            <div className="results-header d-flex justify-content-between align-items-center mb-4 p-3 bg-light rounded">
              <div>
                <span className="text-muted">
                  Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredProducts.length)} of {filteredProducts.length} products
                </span>
              </div>
              
              <div className="d-flex align-items-center gap-3">
                <span className="text-muted">Sort by:</span>
                <Dropdown>
                  <Dropdown.Toggle variant="outline-secondary" size="sm">
                    {sortBy === "newest" && "Newest"}
                    {sortBy === "price-low" && "Price: Low to High"}
                    {sortBy === "price-high" && "Price: High to Low"}
                    {sortBy === "name" && "Name"}
                    {sortBy === "rating" && "Rating"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleSortChange("newest")}>
                      Newest
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSortChange("price-low")}>
                      Price: Low to High
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSortChange("price-high")}>
                      Price: High to Low
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSortChange("name")}>
                      Name
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSortChange("rating")}>
                      Rating
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>

            {/* Products Grid */}
            {paginatedProducts.length > 0 ? (
              <>
                <Row>
                  {paginatedProducts.map(product => (
                    <Col sm={6} lg={4} key={product.id} className="mb-4">
                      <ProductCard 
                        product={product}
                      />
                    </Col>
                  ))}
                </Row>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="d-flex justify-content-center mt-5">
                    <Pagination>
                      <Pagination.Prev
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                      />
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <Pagination.Item
                          key={page}
                          active={page === currentPage}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </Pagination.Item>
                      ))}
                      <Pagination.Next
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                      />
                    </Pagination>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-5">
                <i className="bi bi-search fs-1 text-muted mb-3 d-block"></i>
                <h4>No products found</h4>
                <p className="text-muted">Try adjusting your filters to see more results.</p>
                <Button variant="primary" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ShopPage;
