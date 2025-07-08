// src/app/pages/account/AccountWishlist.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { 
  loadWishlistFromAPI, 
  removeFromWishlistAPI,
  selectIsInWishlist,
  selectWishlistLoading
} from '../../store/slices/wishlistSlice';
import { formatPrice } from '../../utils';
import Utils from '../../services/Utils';
import ToastService from '../../services/ToastService';

interface WishlistItem {
  id: number;
  user_id: number;
  product_id: number;
  product_name: string;
  product_price: string;
  product_sale_price?: string;
  product_photo?: string;
  created_at: string;
  updated_at: string;
}

const AccountWishlist: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { items: wishlistItems, isLoading } = useSelector((state: RootState) => state.wishlist);
  const [removingItems, setRemovingItems] = useState<Set<number>>(new Set());
  const [imageLoadStates, setImageLoadStates] = useState<Map<number, boolean>>(new Map());

  useEffect(() => {
    if (user && user.id) {
      dispatch(loadWishlistFromAPI() as any);
    }
  }, [user, dispatch]);

  const handleRemoveFromWishlist = async (productId: number, productName: string) => {
    setRemovingItems(prev => new Set(prev).add(productId));
    try {
      await dispatch(removeFromWishlistAPI(productId) as any);
      ToastService.removeFromWishlist(productName);
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      ToastService.error('Failed to remove item from wishlist');
    } finally {
      setRemovingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }
  };

  const getProductImage = (productPhoto?: string) => {
    if (!productPhoto) {
      return Utils.img(''); // This will return the default image
    }
    return Utils.img(productPhoto);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleRefreshWishlist = () => {
    if (user && user.id) {
      dispatch(loadWishlistFromAPI() as any);
    }
  };

  const handleImageLoad = (productId: number) => {
    setImageLoadStates(prev => new Map(prev).set(productId, true));
  };

  const handleImageError = (productId: number, e: React.SyntheticEvent<HTMLImageElement>) => {
    setImageLoadStates(prev => new Map(prev).set(productId, false));
    const target = e.currentTarget;
    target.style.display = 'none';
    const parent = target.parentElement;
    if (parent && !parent.querySelector('.placeholder-icon')) {
      const icon = document.createElement('i');
      icon.className = 'bi bi-image placeholder-icon';
      icon.style.fontSize = '2rem';
      icon.style.color = 'var(--text-color-medium)';
      parent.appendChild(icon);
    }
  };

  if (!user || !user.id) {
    return (
      <div className="acc-card" style={{
        backgroundColor: 'var(--warning-bg)',
        borderColor: 'var(--warning-border)',
        color: 'var(--warning-color)'
      }}>
        <div className="acc-card-body">
          <i className="bi bi-exclamation-triangle" style={{ marginRight: '8px' }}></i>
          Please log in to view your wishlist.
        </div>
      </div>
    );
  }

  return (
    <div className="acc-wishlist-container">
      {/* Page Header */}
      <div className="acc-page-header">
        <div>
          <h1 className="acc-page-title">My Wishlist</h1>
          <p className="acc-page-subtitle">
            {wishlistItems.length > 0 
              ? `${wishlistItems.length} item${wishlistItems.length !== 1 ? 's' : ''} saved for later`
              : 'Save your favorite products here'
            }
          </p>
        </div>
        <button className="acc-btn acc-btn-outline" onClick={handleRefreshWishlist}>
          <i className="bi bi-arrow-clockwise" style={{ marginRight: '8px' }}></i>
          Refresh
        </button>
      </div>

      {isLoading ? (
        <div style={{
          textAlign: 'center',
          padding: 'var(--spacing-12) var(--spacing-4)'
        }}>
          <div style={{
            display: 'inline-block',
            width: '40px',
            height: '40px',
            border: '4px solid var(--border-color)',
            borderTop: '4px solid var(--primary-color)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          <p style={{
            marginTop: 'var(--spacing-3)',
            color: 'var(--text-color-medium)',
            fontSize: 'var(--font-size-base)'
          }}>Loading wishlist...</p>
        </div>
      ) : (
        <>
          {wishlistItems.length === 0 ? (
            <div className="acc-card">
              <div className="acc-card-body">
                <div style={{
                  textAlign: 'center',
                  padding: 'var(--spacing-12) var(--spacing-4)'
                }}>
                  <i className="bi bi-heart" style={{
                    fontSize: '4rem',
                    color: 'var(--text-color-medium)',
                    marginBottom: 'var(--spacing-4)',
                    display: 'block'
                  }}></i>
                  <h3 style={{
                    fontSize: 'var(--font-size-xl)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--text-color)',
                    marginBottom: 'var(--spacing-2)'
                  }}>Your Wishlist is Empty</h3>
                  <p style={{
                    color: 'var(--text-color-medium)',
                    marginBottom: 'var(--spacing-4)',
                    fontSize: 'var(--font-size-base)',
                    maxWidth: '400px',
                    margin: '0 auto var(--spacing-4)'
                  }}>
                    Start adding products to your wishlist by clicking the heart icon on any product you like.
                  </p>
                  <Link to="/products" className="acc-btn acc-btn-primary">
                    Browse Products
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: 'var(--spacing-4)' }}>
              {wishlistItems.map((item: WishlistItem) => {
                const isRemoving = removingItems.has(item.product_id);
                const productImage = getProductImage(item.product_photo);
                const salePrice = item.product_sale_price ? parseFloat(item.product_sale_price) : null;
                const regularPrice = parseFloat(item.product_price || '0');
                const finalPrice = salePrice && salePrice > 0 ? salePrice : regularPrice;
                const hasDiscount = salePrice && salePrice > 0 && salePrice < regularPrice;

                return (
                  <div key={item.id} className="acc-card" style={{
                    opacity: isRemoving ? 0.6 : 1,
                    transition: 'opacity 0.3s ease'
                  }}>
                    <div className="acc-card-body">
                      <div style={{
                        display: 'flex',
                        gap: 'var(--spacing-4)',
                        alignItems: 'flex-start'
                      }}>
                        {/* Product Image */}
                        <div style={{
                          width: '120px',
                          height: '120px',
                          flexShrink: 0,
                          borderRadius: 'var(--border-radius)',
                          overflow: 'hidden',
                          backgroundColor: 'var(--background-light)',
                          border: '1px solid var(--border-color)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          position: 'relative'
                        }}>
                          {!imageLoadStates.get(item.product_id) && (
                            <div style={{
                              position: 'absolute',
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                              color: 'var(--text-color-medium)'
                            }}>
                              <div style={{
                                width: '20px',
                                height: '20px',
                                border: '2px solid var(--border-color)',
                                borderTop: '2px solid var(--primary-color)',
                                borderRadius: '50%',
                                animation: 'spin 1s linear infinite'
                              }}></div>
                            </div>
                          )}
                          <img
                            src={productImage}
                            alt={item.product_name}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              opacity: imageLoadStates.get(item.product_id) ? 1 : 0,
                              transition: 'opacity 0.3s ease'
                            }}
                            onLoad={() => handleImageLoad(item.product_id)}
                            onError={(e) => handleImageError(item.product_id, e)}
                          />
                        </div>

                        {/* Product Details */}
                        <div style={{ flex: 1 }}>
                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            marginBottom: 'var(--spacing-2)'
                          }}>
                            <div style={{ flex: 1, paddingRight: 'var(--spacing-3)' }}>
                              <Link
                                to={`/products/${item.product_id}`}
                                style={{
                                  color: 'var(--text-color)',
                                  textDecoration: 'none',
                                  fontSize: 'var(--font-size-lg)',
                                  fontWeight: 'var(--font-weight-semibold)',
                                  display: 'block',
                                  marginBottom: 'var(--spacing-1)',
                                  lineHeight: '1.4'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.color = 'var(--primary-color)';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.color = 'var(--text-color)';
                                }}
                              >
                                {item.product_name}
                              </Link>
                              <p style={{
                                fontSize: 'var(--font-size-sm)',
                                color: 'var(--text-color-medium)',
                                margin: 0,
                                marginBottom: 'var(--spacing-2)'
                              }}>
                                Added on {formatDate(item.created_at)}
                              </p>
                            </div>

                            {/* Remove Button */}
                            <button
                              onClick={() => handleRemoveFromWishlist(item.product_id, item.product_name)}
                              disabled={isRemoving}
                              style={{
                                background: 'none',
                                border: 'none',
                                padding: 'var(--spacing-1)',
                                cursor: isRemoving ? 'not-allowed' : 'pointer',
                                color: 'var(--danger-color)',
                                fontSize: 'var(--font-size-lg)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 'var(--border-radius)',
                                transition: 'background-color 0.2s ease'
                              }}
                              onMouseEnter={(e) => {
                                if (!isRemoving) {
                                  e.currentTarget.style.backgroundColor = 'var(--danger-bg)';
                                }
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                              }}
                            >
                              {isRemoving ? (
                                <div style={{
                                  width: '16px',
                                  height: '16px',
                                  border: '2px solid var(--danger-color)',
                                  borderTop: '2px solid transparent',
                                  borderRadius: '50%',
                                  animation: 'spin 1s linear infinite'
                                }}></div>
                              ) : (
                                <i className="bi bi-heart-fill"></i>
                              )}
                            </button>
                          </div>

                          {/* Price and Actions */}
                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingTop: 'var(--spacing-3)',
                            borderTop: '1px solid var(--border-color)'
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
                              <span style={{
                                fontSize: 'var(--font-size-lg)',
                                fontWeight: 'var(--font-weight-bold)',
                                color: hasDiscount ? 'var(--danger-color)' : 'var(--text-color)'
                              }}>
                                {formatPrice(finalPrice)}
                              </span>
                              {hasDiscount && (
                                <>
                                  <span style={{
                                    fontSize: 'var(--font-size-base)',
                                    color: 'var(--text-color-medium)',
                                    textDecoration: 'line-through'
                                  }}>
                                    {formatPrice(regularPrice)}
                                  </span>
                                  <span style={{
                                    fontSize: 'var(--font-size-xs)',
                                    backgroundColor: 'var(--danger-color)',
                                    color: 'var(--white)',
                                    padding: 'var(--spacing-1) var(--spacing-2)',
                                    borderRadius: 'var(--border-radius)',
                                    fontWeight: 'var(--font-weight-medium)'
                                  }}>
                                    {Math.round(((regularPrice - salePrice) / regularPrice) * 100)}% OFF
                                  </span>
                                </>
                              )}
                            </div>

                            <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
                              <Link
                                to={`/products/${item.product_id}`}
                                className="acc-btn acc-btn-outline acc-btn-sm"
                              >
                                View Details
                              </Link>
                              <button className="acc-btn acc-btn-primary acc-btn-sm">
                                <i className="bi bi-cart-plus" style={{ marginRight: '6px' }}></i>
                                Add to Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* Quick Actions */}
      {wishlistItems.length > 0 && (
        <div style={{
          marginTop: 'var(--spacing-6)',
          display: 'flex',
          gap: 'var(--spacing-3)',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button className="acc-btn acc-btn-outline">
            <i className="bi bi-share" style={{ marginRight: '8px' }}></i>
            Share Wishlist
          </button>
          <Link to="/products" className="acc-btn acc-btn-primary">
            <i className="bi bi-plus-circle" style={{ marginRight: '8px' }}></i>
            Add More Items
          </Link>
        </div>
      )}

      {/* Spinner animation styles */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default AccountWishlist;