// src/app/components/HomePage/HeroCarousel.tsx
import React from "react";
import { Carousel } from "react-bootstrap";

const HeroCarousel: React.FC = () => {
  return (
    <div className="hero-carousel-wrapper">
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            style={{ objectFit: "cover", height: "400px" }}
            src="https://picsum.photos/id/1018/1000/400" // Placeholder Image 1
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            style={{ objectFit: "cover", height: "400px" }}
            src="https://picsum.photos/id/1015/1000/400" // Placeholder Image 2
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            style={{ objectFit: "cover", height: "400px" }}
            src="https://picsum.photos/id/1025/1000/400" // Placeholder Image 3
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default HeroCarousel;
