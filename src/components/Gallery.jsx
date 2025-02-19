import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Section from './Section';

const galleryImages = [
  { src: '/Gal_1.webp' },
  { src: '/Gal_2.webp' },
  { src: '/Gal_3.webp' },
  { src: '/Gal_4.webp' },
  { src: '/Gal_5.webp' },
  { src: '/Gal_6.webp' },
  { src: '/Gal_7.webp' },
  { src: '/Gal_8.webp' },
  { src: '/Gal_9.webp' }
];

function Gallery() {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [autoScroll, setAutoScroll] = useState(true);
  const [scrollDirection, setScrollDirection] = useState(1); // 1 for right, -1 for left

  useEffect(() => {
    const gallery = scrollRef.current;
    if (!gallery) return;

    let animationFrameId;
    let speed = 0.8; // Reduced speed for smoother scrolling
    let currentPosition = gallery.scrollLeft;
    let lastTimestamp = 0;

    const animate = (timestamp) => {
      if (autoScroll) {
        // Limit updates to every 16ms for consistent smooth motion
        if (timestamp - lastTimestamp >= 16) {
          const maxScroll = gallery.scrollWidth - gallery.offsetWidth;
          
          // Update position with smooth acceleration/deceleration
          currentPosition += speed * scrollDirection;
          
          // Change direction with smooth transition
          if (currentPosition >= maxScroll) {
            setScrollDirection(-1);
            currentPosition = maxScroll;
          } else if (currentPosition <= 0) {
            setScrollDirection(1);
            currentPosition = 0;
          }

          // Apply smooth scrolling
          gallery.scrollTo({
            left: currentPosition,
            behavior: 'smooth' // Changed to smooth for better transitions
          });
          
          lastTimestamp = timestamp;
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleWheel = (e) => {
      e.preventDefault();
      gallery.scrollLeft += e.deltaY;
      setAutoScroll(false);
      setTimeout(() => setAutoScroll(true), 4000); // Increased pause time
    };

    gallery.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      gallery.removeEventListener('wheel', handleWheel);
      cancelAnimationFrame(animationFrameId);
    };
  }, [autoScroll, scrollDirection]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <Section id="gallery" className="py-32">
      <h2 className="text-5xl font-bold mb-16 text-center gradient-text">Gallery</h2>
      <div
        ref={scrollRef}
        className="overflow-x-scroll scrollbar-hide"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <div className="flex space-x-8 px-8" style={{ width: 'max-content' }}>
          {galleryImages.map((src, index) => (
            <motion.div
              key={index}
              className="relative w-[300px] h-[400px] rounded-xl overflow-hidden flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={src.src}
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

export default Gallery;

