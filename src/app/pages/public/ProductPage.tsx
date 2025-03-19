import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { toast } from "react-toastify";
import { http_get } from "../../services/Api";
import { ProductModel } from "../../models/ProductModel";
import Utils from "../../services/Utils";
import { toAbsoluteUrl } from "../../../_metronic/helpers";
import { useAuth } from "../../modules/auth";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
  const [error, setError] = useState<string>("");
  const { addToCart, isInCart } = useAuth();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await http_get(`/products/${id}`, {});
        if (response.code !== 1) {
          throw new Error(response.message || "Failed to fetch product.");
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

  useEffect(() => {
    if (!product) return;
    const fetchRelated = async () => {
      setRelatedLoading(true);
      try {
        const params = { category: product.category ?? "", per_page: 10 };
        const response = await ProductModel.fetchProducts(1, params);
        if (response.data && Array.isArray(response.data)) {
          const filtered = response.data.filter((p) => p.id !== product.id);
          setRelatedProducts(filtered);
        }
      } catch (err: any) {
        console.error("Error fetching related products:", err);
      } finally {
        setRelatedLoading(false);
      }
    };
    fetchRelated();
  }, [product]);

  const handleAddToCart = () => {
    if (!product) return;
    const productModel = {
      id: product.id.toString(),
      price: parseFloat(product.price_1),
      name: product.name,
      mainImage: product.feature_photo
        ? Utils.img(product.feature_photo)
        : toAbsoluteUrl("media/products/placeholder.png"),
      discount: product.discount ?? 0,
    };
    addToCart(productModel);
    toast.success(`${product.name} added to cart!`);
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container pt-4 text-center"
      >
        <h2>Loading product...</h2>
      </motion.div>
    );
  }

  if (error || !product) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container pt-4 text-center"
      >
        <h2>Error loading product</h2>
        <p>{error}</p>
        <button className="btn btn-primary" onClick={() => navigate("/shop")}>
          Back to Shop
        </button>
      </motion.div>
    );
  }

  let allImages: string[] = [];
  try {
    const rates = JSON.parse(product.rates);
    if (Array.isArray(rates)) {
      allImages = [
        product.feature_photo
          ? Utils.img(product.feature_photo)
          : toAbsoluteUrl("media/stock/600x600/img-1.jpg"),
        ...rates.map((r: any) => Utils.img(r.src)),
      ];
    } else {
      allImages = [
        product.feature_photo
          ? Utils.img(product.feature_photo)
          : toAbsoluteUrl("media/stock/600x600/img-1.jpg"),
      ];
    }
  } catch {
    allImages = [
      product.feature_photo
        ? Utils.img(product.feature_photo)
        : toAbsoluteUrl("media/stock/600x600/img-1.jpg"),
    ];
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container pt-4"
    >
      <div className="row mb-4 align-items-center">
        <div className="col-12 d-flex justify-content-between">
          <button
            className="btn btn-outline-secondary"
            onClick={() => navigate("/shop")}
          >
            ← Back
          </button>
          <h1 className="text-dark mb-0 fw-bold">Product Details</h1>
          <Link to="/cart" className="btn btn-outline-primary">
            Cart
          </Link>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-6">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={10}
            slidesPerView={1}
          >
            {allImages.map((img, idx) => (
              <SwiperSlide key={idx}>
                <Zoom>
                  <img
                    src={img}
                    alt={`${product.name} ${idx + 1}`}
                    className="img-fluid rounded border"
                    style={{ objectFit: "cover" }}
                  />
                </Zoom>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="col-md-6 d-flex flex-column">
          <h2 className="fw-bold mb-3 text-primary">{product.name}</h2>
          <h3 className="text-muted mb-3">
            UGX {parseFloat(product.price_1).toLocaleString()}
          </h3>
          {product.summary && (
            <>
              <h5 className="mt-3">Summary</h5>
              <div
                className="mb-3 bg-light p-3 border rounded"
                dangerouslySetInnerHTML={{ __html: product.summary }}
              />
            </>
          )}
          <p className="mb-1">
            <strong>Colors:</strong> {product.colors || "N/A"}
          </p>
          <p className="mb-1">
            <strong>Sizes:</strong> {product.sizes || "N/A"}
          </p>
          <p>
            <strong>Category:</strong> {product.category_text}
          </p>
          {isInCart(product.id.toString()) ? (
            <Link to="/cart" className="btn btn-success mt-3">
              View Cart
            </Link>
          ) : (
            <button className="btn btn-primary mt-3" onClick={handleAddToCart}>
              Add to Cart
            </button>
          )}
        </div>
      </div>

      <div className="row">
        <div className="col-md-8">
          <h5 className="mt-4">Product Description</h5>
          <div
            className="mb-3 bg-light p-3 border rounded"
            dangerouslySetInnerHTML={{
              __html: product.description || "No description available.",
            }}
          />
          <hr />
        </div>
      </div>
      <div className="mt-5">
        <h3 className="mb-4">Related Products</h3>
        {relatedLoading ? (
          <p>Loading related products...</p>
        ) : relatedProducts.length > 0 ? (
          <div className="row g-3">
            {relatedProducts.slice(0, 6).map((relProd) => (
              <div key={relProd.id} className="col-sm-4 col-md-2 col-6">
                <Link
                  to={`/product/${relProd.id}`}
                  className="text-decoration-none"
                >
                  <div className="text-center border rounded p-2 h-100">
                    <img
                      src={
                        relProd.feature_photo
                          ? Utils.img(relProd.feature_photo)
                          : toAbsoluteUrl("media/stock/600x600/img-1.jpg")
                      }
                      alt={relProd.name}
                      className="img-fluid mb-2"
                      style={{ objectFit: "cover" }}
                    />
                    <p className="small fw-semibold text-dark mb-1">
                      {relProd.name}
                    </p>
                  </div>
                </Link>
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
