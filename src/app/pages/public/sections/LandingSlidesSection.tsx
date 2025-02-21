import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    title: "Develop Yourself for Better Career",
    description:
      "Get relevant trainings and develop yourself as a keen professional to stand out in this competitive job market.",
    buttonLabel: "Join 8learning",
    backgroundImage: "https://bdjobs.com/images/bdjobs-training-bg.jpg",
  },
  {
    title: "Customize Everything",
    description:
      "Customize your profile, job preference, and everything to get a better job in shorter time with Skills.ug.",
    buttonLabel: "Join Skills.ug",
    backgroundImage: "https://bdjobs.com/images/mybdjobs-bg.jpg",
  },
  {
    title: "Download SkillsUg Android App",
    description:
      "Never miss a single opportunity. Search and apply on the go and get the perfect job for you.",
    buttonLabel: "Download App",
    backgroundImage: "https://bdjobs.com/images/android-app-bg.jpg",
  },
];

const slideVariants = {
  hidden: { opacity: 0, x: 100, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    x: -100,
    scale: 0.95,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const inlineStyles = `
.landing-slides-section {
  position: relative;
  width: 100%;
  height: min(80vh, 500px);
  overflow: hidden;
  background-color: #000;
  border-radius: 1rem;
  margin: 2rem 0;
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
}

@media (max-width: 768px) {
  .landing-slides-section {
    height: 60vh;
    border-radius: 0.5rem;
    margin: 1rem 0;
  }
}

.landing-slides-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.landing-slide {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-size: cover;
  background-position: center;
  padding: 2rem;
}

.landing-slide::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(45deg, rgba(0,0,0,0.6) 30%, rgba(0,0,0,0.4) 100%);
}

.slide-content {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  padding: 2rem;
  color: #fff;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.slide-content h2 {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  letter-spacing: -0.03em;
}

.slide-content p {
  font-size: clamp(1rem, 2vw, 1.3rem);
  margin-bottom: 2rem;
  line-height: 1.6;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  opacity: 0.9;
}

.slide-content button {
  padding: 1rem 2rem;
  background: #2563eb;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
  box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
}

.slide-content button:hover {
  background: #1d4ed8;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4);
}

.slides-controls {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;
  z-index: 3;
}

.slides-controls button {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.3);
  background-color: rgba(0,0,0,0.3);
  color: #fff;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(4px);
}

.slides-controls button:hover {
  background-color: rgba(255,255,255,0.2);
  transform: scale(1.1);
}

.slide-indicators {
  position: absolute;
  bottom: 5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.8rem;
  z-index: 4;
}

.dot {
  width: 14px;
  height: 14px;
  background-color: rgba(255,255,255,0.4);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  position: relative;
}

.dot:hover {
  transform: scale(1.2);
}

.dot.active {
  background-color: #fff;
  transform: scale(1.3);
}

@media (max-width: 768px) {
  .slide-indicators {
    bottom: 4rem;
  }
  
  .slides-controls {
    bottom: 1rem;
  }
  
  .slides-controls button {
    width: 40px;
    height: 40px;
    font-size: 1.1rem;
  }
}
`;

const LandingSlidesSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!paused) {
      const timer = setInterval(nextSlide, 7000);
      return () => clearInterval(timer);
    }
  }, [paused, currentSlide]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const goToSlide = (index: number) => setCurrentSlide(index);
  const togglePause = () => setPaused(!paused);

  return (
    <div className="landing-slides-section">
      <style>{inlineStyles}</style>
      <div className="landing-slides-container">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className="landing-slide"
            style={{
              backgroundImage: `url(${slides[currentSlide].backgroundImage})`,
            }}
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="slide-content">
              <h2 className="text-warning">{slides[currentSlide].title}</h2>
              <p>{slides[currentSlide].description}</p>
              <button onClick={() => alert("Button clicked!")}>
                {slides[currentSlide].buttonLabel}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="slide-indicators">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`dot ${i === currentSlide ? "active" : ""}`}
              onClick={() => goToSlide(i)}
              role="button"
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <div className="slides-controls">
          <button onClick={prevSlide} aria-label="Previous slide">
            <i className="bi bi-chevron-left" />
          </button>
          <button
            onClick={togglePause}
            aria-label={paused ? "Play slideshow" : "Pause slideshow"}
          >
            {paused ? (
              <i className="bi bi-play-fill" />
            ) : (
              <i className="bi bi-pause-fill" />
            )}
          </button>
          <button onClick={nextSlide} aria-label="Next slide">
            <i className="bi bi-chevron-right" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingSlidesSection;
