import React, { useState } from 'react';

interface PostGalleryProps {
  images: string[];
  postId: string;
}

export function PostGallery({ images, postId }: PostGalleryProps) {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  const handleImageLoad = (url: string) => {
    setLoadedImages(prev => new Set([...prev, url]));
  };

  const handleImageError = (url: string) => {
    console.error(`Failed to load image: ${url}`);
    // Remove failed image from loaded set
    setLoadedImages(prev => {
      const newSet = new Set(prev);
      newSet.delete(url);
      return newSet;
    });
  };

  if (!images || images.length === 0) return null;

  if (images.length === 1) {
    return (
      <div className="mt-3">
        <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-slate-700/30">
          <img 
            src={images[0]} 
            alt="Post content"
            className="w-full h-full object-cover hover:opacity-90 transition-opacity"
            loading="lazy"
            onLoad={() => handleImageLoad(images[0])}
            onError={() => handleImageError(images[0])}
          />
          {!loadedImages.has(images[0]) && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-t-transparent border-[#00D1FF] rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (images.length === 2) {
    return (
      <div className="mt-3 grid grid-cols-2 gap-2">
        {images.map((img, index) => (
          <div 
            key={`${postId}-gallery-${index}`} 
            className="relative aspect-square rounded-xl overflow-hidden bg-slate-700/30"
          >
            <img 
              src={img} 
              alt={`Gallery item ${index + 1}`} 
              className="w-full h-full object-cover hover:opacity-90 transition-opacity"
              loading="lazy"
              onLoad={() => handleImageLoad(img)}
              onError={() => handleImageError(img)}
            />
            {!loadedImages.has(img) && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-t-transparent border-[#00D1FF] rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-3 grid grid-cols-2 gap-2">
      {/* First image takes full height */}
      <div className="relative row-span-2 rounded-xl overflow-hidden bg-slate-700/30">
        <img 
          src={images[0]} 
          alt="Gallery item 1"
          className="w-full h-full object-cover hover:opacity-90 transition-opacity"
          loading="lazy"
          onLoad={() => handleImageLoad(images[0])}
          onError={() => handleImageError(images[0])}
        />
        {!loadedImages.has(images[0]) && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-t-transparent border-[#00D1FF] rounded-full animate-spin"></div>
          </div>
        )}
      </div>
      {/* Remaining images */}
      <div className="grid grid-rows-2 gap-2">
        {images.slice(1, 3).map((img, index) => (
          <div 
            key={`${postId}-gallery-${index + 1}`} 
            className="relative rounded-xl overflow-hidden bg-slate-700/30"
          >
            <img 
              src={img} 
              alt={`Gallery item ${index + 2}`} 
              className="w-full h-full object-cover hover:opacity-90 transition-opacity"
              loading="lazy"
              onLoad={() => handleImageLoad(img)}
              onError={() => handleImageError(img)}
            />
            {!loadedImages.has(img) && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-t-transparent border-[#00D1FF] rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        ))}
      </div>
      {images.length > 3 && (
        <div className="absolute bottom-2 right-2 bg-black/75 px-2 py-1 rounded text-xs">
          +{images.length - 3}
        </div>
      )}
    </div>
  );
}