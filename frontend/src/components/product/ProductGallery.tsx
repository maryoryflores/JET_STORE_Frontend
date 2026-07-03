'use client';

import { useState } from 'react';
import Image from 'next/image';
import { HiPhotograph } from 'react-icons/hi';
import { cn } from '@/utils/cn';

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export default function ProductGallery({ images, title }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const displayImages = images && images.length > 0 ? images : [];

  return (
    <div className="space-y-4">
      <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden flex items-center justify-center">
        {displayImages[selectedIndex] ? (
          <Image
            src={displayImages[selectedIndex]}
            alt={`${title} - ${selectedIndex + 1}`}
            width={400}
            height={300}
            className="w-full h-full object-cover"
          />
        ) : (
          <HiPhotograph className="w-20 h-20 text-gray-300" />
        )}
      </div>
      {displayImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {displayImages.map((img, index) => (
            <button
              type="button"
              key={index}
              onClick={() => setSelectedIndex(index)}
              aria-label={`Seleccionar imagen ${index + 1}`}
              className={cn(
                'flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all',
                selectedIndex === index
                  ? 'border-[#DC2626] ring-1 ring-[#DC2626]'
                  : 'border-gray-200 hover:border-gray-300',
              )}
            >
              <Image
                src={img}
                alt={`${title} miniatura ${index + 1}`}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
