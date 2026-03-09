'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function ImageModal({ images = [], initialIndex = 0, isOpen, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!isOpen) return null;

  return (
    <div className="image-modal-overlay" onClick={onClose}>
      <button className="image-modal-close" onClick={onClose}>
        <i className="fa-solid fa-xmark"></i>
      </button>
      
      <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="image-modal-nav prev" onClick={handlePrev}>
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        
        <div className="image-modal-image-container">
          <Image
            src={images[currentIndex]}
            alt={`Image ${currentIndex + 1}`}
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>

        <button className="image-modal-nav next" onClick={handleNext}>
          <i className="fa-solid fa-chevron-right"></i>
        </button>

        <div className="image-modal-counter">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
}
