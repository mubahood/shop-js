import React, { useState } from 'react'
import { motion } from 'framer-motion'
// Swiper imports (for version 10+)
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'

// Simple fade animation variant
const fadeVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
}

// We have 22 product images
const categories_photos = [
  'media/products/1.png',
  'media/products/2.png',
  'media/products/3.png',
  'media/products/4.png',
  'media/products/5.png',
  'media/products/6.png',
  'media/products/7.png',
  'media/products/8.png',
  'media/products/9.png',
  'media/products/10.png',
  'media/products/11.png',
  'media/products/12.png',
  'media/products/13.png',
  'media/products/14.png',
  'media/products/15.png',
  'media/products/16.png',
  'media/products/17.png',
  'media/products/18.png',
  'media/products/19.png',
  'media/products/20.png',
  'media/products/21.png',
  'media/products/23.png',
  'media/products/24.png',
  'media/products/25.png',
  'media/products/26.png',
  'media/products/27.png',
  'media/products/28.png',
  'media/products/29.png',
  'media/products/30.png',
]

// Define a Product interface for clarity
interface Product {
  id: number
  title: string
  imageUrl: string
  price: string
  discount?: string
}

// 1) Spring Sale (indexes 0 - 6)
const springSaleProducts: Product[] = [
  {
    id: 1,
    title: 'Wireless Headphones',
    imageUrl: categories_photos[0],
    price: '$49.99',
    discount: '-20%',
  },
  {
    id: 2,
    title: 'Smartwatch',
    imageUrl: categories_photos[1],
    price: '$129.99',
    discount: '-30%',
  },
  {
    id: 3,
    title: 'Portable Speaker',
    imageUrl: categories_photos[2],
    price: '$29.99',
    discount: '-15%',
  },
  {
    id: 4,
    title: 'Drone with Camera',
    imageUrl: categories_photos[3],
    price: '$399.99',
    discount: '-10%',
  },
  {
    id: 5,
    title: 'USB-C Charger',
    imageUrl: categories_photos[4],
    price: '$9.99',
    discount: '-5%',
  },
  {
    id: 6,
    title: 'Wireless Keyboard',
    imageUrl: categories_photos[5],
    price: '$19.99',
    discount: '-25%',
  },
  {
    id: 7,
    title: 'Noise-Cancelling Earbuds',
    imageUrl: categories_photos[6],
    price: '$59.99',
    discount: '-12%',
  },
]

// 2) All Under $1 (indexes 7 - 13)
const allUnderOneProducts: Product[] = [
  {
    id: 8,
    title: 'USB Cable',
    imageUrl: categories_photos[7],
    price: '$0.99',
    discount: '-45%',
  },
  {
    id: 9,
    title: 'Phone Ring Holder',
    imageUrl: categories_photos[8],
    price: '$0.89',
    discount: '-30%',
  },
  {
    id: 10,
    title: 'Screen Protector',
    imageUrl: categories_photos[9],
    price: '$0.75',
    discount: '-25%',
  },
  {
    id: 11,
    title: 'Cable Organizer',
    imageUrl: categories_photos[10],
    price: '$0.50',
    discount: '-20%',
  },
  {
    id: 12,
    title: 'Earbud Case',
    imageUrl: categories_photos[11],
    price: '$0.99',
    discount: '-10%',
  },
  {
    id: 13,
    title: 'Stylus Pen',
    imageUrl: categories_photos[12],
    price: '$0.70',
    discount: '-22%',
  },
  {
    id: 14,
    title: 'OTG Adapter',
    imageUrl: categories_photos[13],
    price: '$0.90',
    discount: '-15%',
  },
]

// 3) QuickShip (indexes 14 - 21)
const quickShipProducts: Product[] = [
  {
    id: 15,
    title: 'Laptop Stand',
    imageUrl: categories_photos[14],
    price: '$14.99',
    discount: '-22%',
  },
  {
    id: 16,
    title: 'Bluetooth Mouse',
    imageUrl: categories_photos[15],
    price: '$12.99',
    discount: '-10%',
  },
  {
    id: 17,
    title: 'Gaming Controller',
    imageUrl: categories_photos[16],
    price: '$29.99',
    discount: '-15%',
  },
  {
    id: 18,
    title: 'Smart Bulb',
    imageUrl: categories_photos[17],
    price: '$9.99',
    discount: '-25%',
  },
  {
    id: 19,
    title: 'Portable Charger',
    imageUrl: categories_photos[18],
    price: '$24.99',
    discount: '-18%',
  },
  {
    id: 20,
    title: 'Smart Plug',
    imageUrl: categories_photos[19],
    price: '$8.99',
    discount: '-12%',
  },
  {
    id: 21,
    title: 'Car Phone Mount',
    imageUrl: categories_photos[20],
    price: '$5.99',
    discount: '-8%',
  },
  {
    id: 22,
    title: 'Wi-Fi Range Extender',
    imageUrl: categories_photos[21],
    price: '$14.49',
    discount: '-17%',
  },
]

const tabData = [
  { label: 'Spring Sale', products: springSaleProducts },
  { label: 'All Under $1', products: allUnderOneProducts },
  { label: 'QuickShip', products: quickShipProducts },
]

// MAIN COMPONENT
const LandingTopProductsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0)

  const handleTabClick = (index: number) => {
    setActiveTab(index)
  }

  return (
    <motion.div
      className="container py-5"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={fadeVariant}
    >
      {/* Tabs */}
      <div className="d-flex justify-content-center mb-4 gap-4">
        {tabData.map((tab, index) => {
          const isActive = activeTab === index
          return (
            <button
              key={index}
              onClick={() => handleTabClick(index)}
              className="btn btn-link fw-semibold position-relative p-0"
              style={{
                color: isActive ? '#f33d02' : '#767676',
                textDecoration: 'none',
                borderBottom: isActive ? '2px solid #f33d02' : '2px solid transparent',
                outline: 'none',
                transition: 'border-color 0.25s, color 0.25s',
              }}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Horizontal Slider */}
      <Swiper
        modules={[Navigation]}
        navigation={true}
        spaceBetween={10}
        slidesPerView={2}
        breakpoints={{
          576: { slidesPerView: 3 },  // small screens ≥576px
          768: { slidesPerView: 4 },  // medium screens ≥768px
          992: { slidesPerView: 5 },  // large screens ≥992px
          1200: { slidesPerView: 6 }, // extra-large screens ≥1200px
        }}
      >
        {tabData[activeTab].products.map((product) => (
          <SwiperSlide key={product.id}>
            <motion.div
              className="card border-0"
              whileHover={{ scale: 1.02 }}
              style={{ overflow: 'hidden' }}
            >
              <div
                className="position-relative w-100"
                style={{ height: '220px' }}
              >
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="img-fluid w-100 h-100"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="card-body p-2">
                <h6 className="fw-semibold mb-1" style={{ fontSize: '0.9rem' }}>
                  {product.title}
                </h6>
                <div className="d-flex align-items-center">
                  <span
                    className="text-primary fw-bold me-2"
                    style={{ fontSize: '1rem' }}
                  >
                    {product.price}
                  </span>
                  {product.discount && (
                    <span
                      className="badge bg-danger text-white"
                      style={{ fontSize: '0.75rem' }}
                    >
                      {product.discount}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  )
}

export default LandingTopProductsSection
