// ProductPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { toast } from 'react-toastify';
import { http_get } from '../../services/Api';
import { ProductModel } from '../../models/ProductModel';
import Utils from '../../services/Utils';
import { toAbsoluteUrl } from '../../../_metronic/helpers';

interface ProductPageParams {
  [key: string]: string | undefined;
  id?: string;
}

const ProductPage: React.FC = () => {
  const { id } = useParams<ProductPageParams>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductModel | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<ProductModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [relatedLoading, setRelatedLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // Fetch the product details based on id
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await http_get(`/products/${id}`, {});
        if (response.code !== 1) {
          throw new Error(response.message || 'Failed to fetch product.');
        }
        const fetchedProduct = ProductModel.fromJson(response.data);
        setProduct(fetchedProduct);
      } catch (err: any) {
        setError(err.toString());
        toast.error(err.toString());
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Once the product is loaded, fetch related products from the same category.
  useEffect(() => {
    if (!product) return;
    const fetchRelated = async () => {
      setRelatedLoading(true);
      try {
        // Fetch products by category (assuming API supports filtering by 'category')
        const params = { category: product.category ?? '', per_page: 10 };
        const response = await ProductModel.fetchProducts(1, params);
        if (response.data && Array.isArray(response.data)) {
          // Filter out the current product.
          const filtered = response.data.filter((p) => p.id !== product.id);
          setRelatedProducts(filtered);
        }
      } catch (err: any) {
        console.error('Error fetching related products:', err);
      } finally {
        setRelatedLoading(false);
      }
    };
    fetchRelated();
  }, [product]);

  if (loading) {
    return (
      <motion.div
        className="container py-5 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2>Loading product...</h2>
      </motion.div>
    );
  }

  if (error || !product) {
    return (
      <motion.div
        className="container py-5 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2>Error loading product</h2>
        <p>{error}</p>
        <button className="btn btn-primary" onClick={() => navigate('/shop')}>
          Back to Shop
        </button>
      </motion.div>
    );
  }

  // Parse rates if needed (for additional images, etc.)
  let additionalImages: string[] = [];
  try {
    const rates = JSON.parse(product.rates);
    if (Array.isArray(rates)) {
      additionalImages = rates.map((r: any) => Utils.img(r.src));
    }
  } catch (err) {
    additionalImages = [];
  }

  return (
    <motion.div className="container py-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Back button */}
      <div className="mb-4">
        <button className="btn btn-link" onClick={() => navigate('/shop')}>
          ← Back to Shop
        </button>
      </div>
      <div className="row">
        {/* Left Column: Product Image(s) */}
        <div className="col-md-6 mb-4">
          <Zoom>
            <img
              src={product.feature_photo ? Utils.img(product.feature_photo) : toAbsoluteUrl('media/stock/600x600/img-1.jpg')}
              alt={product.name}
              className="img-fluid"
              style={{ width: '100%', objectFit: 'cover', border: '1px solid #ddd', borderRadius: 0 }}
            />
          </Zoom>
          {/* Optionally, show additional images as thumbnails */}
          {additionalImages.length > 0 && (
            <div className="mt-3 d-flex flex-wrap gap-2">
              {additionalImages.map((img, idx) => (
                <Zoom key={idx}>
                  <img
                    src={img}
                    alt={`${product.name} ${idx + 2}`}
                    style={{ width: '80px', height: '80px', objectFit: 'cover', border: '1px solid #ddd', borderRadius: 0 }}
                    className="img-fluid"
                  />
                </Zoom>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Details */}
        <div className="col-md-6">
          <h1 style={{ fontWeight: 'bold', color: '#114786' }}>{product.name}</h1>
          <p className="fs-4 text-primary">
            UGX {parseFloat(product.price_1).toLocaleString()}
          </p>
          {product.summary && <h5 className="mt-3">Summary</h5>}
          {product.summary && (
            <div
              className="mb-3"
              style={{ backgroundColor: '#f8f9fa', padding: '0.75rem', border: '1px solid #ddd', borderRadius: 0 }}
              dangerouslySetInnerHTML={{ __html: product.summary }}
            ></div>
          )}
          <h5>Description</h5>
          <div
            className="mb-3"
            style={{ backgroundColor: '#f8f9fa', padding: '0.75rem', border: '1px solid #ddd', borderRadius: 0 }}
            dangerouslySetInnerHTML={{ __html: product.description || 'No description available.' }}
          ></div>
          <div className="mb-3">
            <strong>Colors:</strong> {product.colors || 'N/A'}
          </div>
          <div className="mb-3">
            <strong>Sizes:</strong> {product.sizes || 'N/A'}
          </div>
          <div className="mb-3">
            <strong>Category:</strong> {product.category_text}
          </div>
          <button className="btn btn-primary" onClick={() => navigate(`/cart/add/${product.id}`)}>
            Add to Cart
          </button>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="mt-5">
        <h3 className="mb-4">Related Products</h3>
        {relatedLoading ? (
          <p>Loading related products...</p>
        ) : relatedProducts.length > 0 ? (
          <div className="row">
            {relatedProducts.slice(0, 6).map((relProd) => (
              <div key={relProd.id} className="col-md-2 col-6 mb-4">
                <div className="text-center" style={{ border: '1px solid #ddd', padding: '0.5rem', borderRadius: 0 }}>
                  <Link to={`/product/${relProd.id}`}>
                    <img
                      src={relProd.feature_photo ? Utils.img(relProd.feature_photo) : toAbsoluteUrl('media/stock/600x600/img-1.jpg')}
                      alt={relProd.name}
                      className="img-fluid"
                      style={{ width: '100%', objectFit: 'cover' }}
                    />
                    <p className="mt-2" style={{ fontSize: '0.9rem', color: '#333' }}>
                      {relProd.name}
                    </p>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No related products found.</p>
        )}
      </div>
    </motion.div>
  );
};

export default ProductPage;
