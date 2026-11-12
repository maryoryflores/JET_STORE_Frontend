'use client';

import { useState } from 'react';

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export default function ProductGallery({ images, title }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [imgError] = useState(false);
  const hasImage = images.length > 0 && images[0] && !imgError;

  return (
    <div className="space-y-4">
      <div className="relative aspect-[4/3] bg-gradient-to-br from-red-50 to-red-100 rounded-2xl overflow-hidden flex items-center justify-center">
        {hasImage ? (
          <img src={images[selectedIndex]} alt={title} className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <span className="text-red-300 text-8xl font-bold opacity-30">{title.charAt(0)}</span>
        )}
      </div>
      {hasImage && images.length > 1 && (
        <div className="flex gap-3">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${
                idx === selectedIndex
                  ? 'border-[#DC2626] ring-1 ring-[#DC2626]'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <img src={img} alt={`${title} ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
