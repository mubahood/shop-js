// src/app/pages/ProductsPage.tsx
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Spinner, Alert, Pagination } from 'react-bootstrap';
import { useGetProductsQuery } from '../services/realProductsApi';
import { useManifestCategories } from '../hooks/useManifest';
import ProductCard from '../components/shared/ProductCard';
import { ProductModel } from '../models/ProductModel';

const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>();
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  // Initialize state from URL params
  useEffect(() => {
    const page = parseInt(searchParams.get('page') || '1');
    const category = searchParams.get('category');
    const sort_by = searchParams.get('sort_by') || 'created_at';
    const sort_order = searchParams.get('sort_order') || 'desc';
    const min_price = searchParams.get('min_price') || '';
    const max_price = searchParams.get('max_price') || '';

    setCurrentPage(page);
    setSortBy(sort_by);
    setSortOrder(sort_order);
    setSelectedCategory(category ? parseInt(category) : undefined);
    setPriceRange({ min: min_price, max: max_price });
  }, [searchParams]);

  // Fetch products with current filters
  const { 
    data: productsData, 
    isLoading, 
    error 
  } = useGetProductsQuery({
    page: currentPage,
    limit: 20,
    category: selectedCategory,
    sort_by: sortBy,
    sort_order: sortOrder,
    min_price: priceRange.min ? parseFloat(priceRange.min) : undefined,
    max_price: priceRange.max ? parseFloat(priceRange.max) : undefined,
    search: searchParams.get('search') || undefined
  });

  // Fetch categories for filter from manifest
  const categories = useManifestCategories();

  const products = productsData?.data || [];
  const totalPages = productsData?.last_page || 1;

  // Update URL params when filters change
  const updateSearchParams = (updates: Record<string, string | number | undefined>) => {
    const newParams = new URLSearchParams(searchParams);
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        newParams.set(key, value.toString());
      } else {
        newParams.delete(key);
      }
    });

    setSearchParams(newParams);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateSearchParams({ page });
  };

  const handleSortChange = (newSortBy: string, newSortOrder: string) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    setCurrentPage(1);
    updateSearchParams({ sort_by: newSortBy, sort_order: newSortOrder, page: 1 });
  };

  const handleCategoryChange = (categoryId: string) => {
    const newCategory = categoryId ? parseInt(categoryId) : undefined;
    setSelectedCategory(newCategory);
    setCurrentPage(1);
    updateSearchParams({ category: newCategory, page: 1 });
  };

  const handlePriceFilter = () => {
    setCurrentPage(1);
    updateSearchParams({ 
      min_price: priceRange.min, 
      max_price: priceRange.max, 
      page: 1 
    });
  };

  const clearFilters = () => {
    setSelectedCategory(undefined);
    setPriceRange({ min: '', max: '' });
    setSortBy('created_at');
    setSortOrder('desc');
    setCurrentPage(1);
    setSearchParams({});
  };

  // Get page title based on filters
  const getPageTitle = () => {
    if (searchParams.get('deals')) return 'Flash Deals';
    if (searchParams.get('search')) return `Search Results for "${searchParams.get('search')}"`;
    if (selectedCategory && categories) {
      const category = categories.find(c => c.id === selectedCategory);
      return category ? `${category.category} Products` : 'Products';
    }
    return 'All Products';
  };

  return (
    <Container className="py-4">
      <Row>
        <Col>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1>{getPageTitle()}</h1>
            <div className="d-flex align-items-center gap-2">
              <Form.Select 
                size="sm" 
                style={{ width: 'auto' }}
                value={`${sortBy}_${sortOrder}`}
                onChange={(e) => {
                  const [newSortBy, newSortOrder] = e.target.value.split('_');
                  handleSortChange(newSortBy, newSortOrder);
                }}
              >
                <option value="created_at_desc">Newest First</option>
                <option value="created_at_asc">Oldest First</option>
                <option value="price_1_asc">Price: Low to High</option>
                <option value="price_1_desc">Price: High to Low</option>
                <option value="name_asc">Name: A to Z</option>
                <option value="name_desc">Name: Z to A</option>
              </Form.Select>
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        {/* Filters Sidebar */}
        <Col md={3}>
          <Card className="mb-4">
            <Card.Header>
              <div className="d-flex justify-content-between align-items-center">
                <h6 className="mb-0">Filters</h6>
                <Button variant="link" size="sm" onClick={clearFilters}>
                  Clear All
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              {/* Category Filter */}
              <div className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  value={selectedCategory || ''}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories?.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.category}
                    </option>
                  ))}
                </Form.Select>
              </div>

              {/* Price Range Filter */}
              <div className="mb-3">
                <Form.Label>Price Range</Form.Label>
                <Row>
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
                <Button 
                  variant="outline-primary" 
                  size="sm" 
                  className="mt-2 w-100"
                  onClick={handlePriceFilter}
                >
                  Apply Price Filter
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Products Grid */}
        <Col md={9}>
          {isLoading && (
            <div className="d-flex justify-content-center p-5">
              <Spinner animation="border" />
            </div>
          )}

          {error && (
            <Alert variant="danger">
              Error loading products: {JSON.stringify(error)}
            </Alert>
          )}

          {!isLoading && !error && products.length === 0 && (
            <div className="text-center p-5">
              <h4>No products found</h4>
              <p>Try adjusting your filters or search terms.</p>
              <Button variant="primary" onClick={clearFilters}>
                View All Products
              </Button>
            </div>
          )}

          {!isLoading && !error && products.length > 0 && (
            <>
              <Row>
                {products.map((product: ProductModel) => (
                  <Col key={product.id} sm={6} lg={4} className="mb-4">
                    <ProductCard product={product} />
                  </Col>
                ))}
              </Row>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-4">
                  <Pagination>
                    <Pagination.First 
                      disabled={currentPage === 1}
                      onClick={() => handlePageChange(1)}
                    />
                    <Pagination.Prev 
                      disabled={currentPage === 1}
                      onClick={() => handlePageChange(currentPage - 1)}
                    />
                    
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                      return (
                        <Pagination.Item
                          key={pageNum}
                          active={pageNum === currentPage}
                          onClick={() => handlePageChange(pageNum)}
                        >
                          {pageNum}
                        </Pagination.Item>
                      );
                    })}
                    
                    <Pagination.Next 
                      disabled={currentPage === totalPages}
                      onClick={() => handlePageChange(currentPage + 1)}
                    />
                    <Pagination.Last 
                      disabled={currentPage === totalPages}
                      onClick={() => handlePageChange(totalPages)}
                    />
                  </Pagination>
                </div>
              )}
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductsPage;
