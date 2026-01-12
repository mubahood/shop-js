import React, { useRef, useCallback, memo } from 'react';
import './FeaturedBrands.css';

const featuredBrandsStyles = `
  .featured-brands-section {
    background: #ffffff;
    padding: 1.5rem 0;
    margin: 0;
    padding-left: 18px;
    padding-right: 20px;
  }

  .featured-brands-container {
    max-width: 100%;
    margin: 0;
    padding: 0;
  }

  .featured-brands-title {
    font-size: 1.5rem;
    font-weight: 800;
    color: #4a4a4a;
    margin: 0 0 1.5rem 0;
    padding: 0;
  }

  .featured-brands-carousel-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .featured-brands-carousel-btn {
    background: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    flex-shrink: 0;
    z-index: 2;
    color: #666;
    font-size: 1.2rem;
  }

  .featured-brands-carousel-btn:hover {
    background: #f5f5f5;
    border-color: #ccc;
    color: #000;
  }

  .featured-brands-carousel-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .featured-brands-carousel-btn.prev {
    order: 1;
  }

  .featured-brands-carousel-btn.next {
    order: 3;
  }

  .featured-brands-list {
    order: 2;
    flex: 1;
    display: flex;
    gap: 2rem;
    overflow-x: auto;
    scroll-behavior: smooth;
    scrollbar-width: none;
    -ms-overflow-style: none;
    padding: 1rem 0;
  }

  .featured-brands-list::-webkit-scrollbar {
    display: none;
  }

  .featured-brands-item {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 150px;
    max-width: 200px;
    height: 80px;
    padding: 1rem;
    background: #ffffff;
    border-radius: 8px;
    transition: transform 0.2s ease;
  }

  .featured-brands-item:hover {
    transform: scale(1.05);
  }

  .featured-brands-item img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    filter: grayscale(0%);
    transition: filter 0.2s ease;
  }

  .featured-brands-item:hover img {
    filter: grayscale(0%);
  }

  @media (max-width: 767.98px) {
    .featured-brands-section {
      padding: 1.5rem 12px;
    }

    .featured-brands-container {
      padding: 0;
    }

    .featured-brands-title {
      font-size: 1.25rem;
      margin-bottom: 1rem;
    }

    .featured-brands-carousel-btn {
      width: 36px;
      height: 36px;
      font-size: 1rem;
    }

    .featured-brands-item {
      min-width: 120px;
      max-width: 150px;
      height: 60px;
      padding: 0.75rem;
    }

    .featured-brands-list {
      gap: 1.5rem;
    }
  }

  @media (max-width: 480px) {
    .featured-brands-item {
      min-width: 100px;
      max-width: 120px;
      height: 50px;
      padding: 0.5rem;
    }

    .featured-brands-list {
      gap: 1rem;
    }
  }
`;

// Brand logos from the brands folder
const brandLogos = [
  { name: 'Hoffmans Electronics', file: 'Hoffmans Electronics.svg' },
  { name: 'oraimo', file: 'oraimo.svg' },
  { name: 'Samsung', file: 'Samsung.svg' },
  { name: 'TECNO', file: 'tecno.svg' },
  { name: 'Geepas', file: 'geepas.svg' },
  { name: 'Hisense', file: 'Hisense.svg' },
  { name: 'TCL', file: 'TCL.svg' },
  { name: 'Skyworth', file: 'skyworth.svg' },
  { name: 'Infinix', file: 'infinix.svg' },
  { name: 'itel', file: 'itel.svg' },
  { name: 'Chiq', file: 'chiq.svg' },
  { name: 'iPhone', file: 'iPhone.svg' },
  { name: 'Google Pixel', file: 'Google Pixel.svg' },
  { name: 'Aldeepo', file: 'Aldeepo.svg' },
  { name: 'Blackark', file: 'blackark.svg' },
  { name: 'RAF', file: 'raf.svg' },
];

const FeaturedBrands: React.FC = memo(() => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = useCallback(() => {
    if (carouselRef.current) {
      const scrollAmount = 300; // Scroll by approximately 2 brand widths
      carouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  }, []);

  const scrollRight = useCallback(() => {
    if (carouselRef.current) {
      const scrollAmount = 300; // Scroll by approximately 2 brand widths
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: featuredBrandsStyles }} />
      <section className="featured-brands-section">
        <div className="featured-brands-container">
          <h2 className="featured-brands-title">Featured Brands</h2>
          <div className="featured-brands-carousel-wrapper">
            <button
              className="featured-brands-carousel-btn prev"
              onClick={scrollLeft}
              aria-label="Previous brands"
            >
              <i className="bi bi-chevron-left"></i>
            </button>
            <div className="featured-brands-list" ref={carouselRef}>
              {brandLogos.map((brand, index) => (
                <div key={index} className="featured-brands-item">
                  <img
                    src={`/media/brands/${brand.file}`}
                    alt={brand.name}
                    loading="lazy"
                    onError={(e) => {
                      // Fallback if image fails to load
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              ))}
            </div>
            <button
              className="featured-brands-carousel-btn next"
              onClick={scrollRight}
              aria-label="Next brands"
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>
      </section>
    </>
  );
});

FeaturedBrands.displayName = 'FeaturedBrands';

export default FeaturedBrands;
