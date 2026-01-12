// src/app/components/shared/Banner.tsx
import React from 'react';
import { Banner as BannerType } from '../../services/BannerService';
import './Banner.css';

interface BannerProps {
  banner: BannerType | null;
  defaultImage?: string;
  defaultUrl?: string;
  className?: string;
  style?: React.CSSProperties;
  height?: string;
  mobileHeight?: string;
  onClick?: () => void;
}

const Banner: React.FC<BannerProps> = ({
  banner,
  defaultImage,
  defaultUrl = '#',
  className = '',
  style = {},
  height = '400px',
  mobileHeight = '300px',
  onClick,
}) => {
  const imageUrl = banner?.image || defaultImage || '';
  const url = banner?.url || defaultUrl;
  const target = banner?.target || '_self';

  if (!imageUrl) {
    return null;
  }

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    // Track click if banner has ID
    if (banner?.id) {
      // You can add analytics tracking here if needed
      console.log('Banner clicked:', banner.id);
    }
  };

  return (
    <a
      href={url}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      className={`banner-link ${className}`}
      style={{ textDecoration: 'none', display: 'block', ...style }}
      onClick={handleClick}
    >
      <div
        className={`banner ${className}`}
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          width: '100%',
          height: height,
          borderRadius: '0',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.3s ease',
          ...style,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.02)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      />
    </a>
  );
};

export default Banner;
