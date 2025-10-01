// src/components/LookbookInteractive.jsx
import React, { useState } from 'react';

const LookbookInteractive = ({ gallery }) => {
  const [hoveredHotspot, setHoveredHotspot] = useState(null);

  if (!gallery) {
    return <div>Galeri tidak ditemukan</div>;
  }

  return (
    <div className="relative">
      <img 
        src={gallery.cover_image_url} 
        alt={gallery.title} 
        className="w-full h-auto rounded-lg shadow-md"
      />

      {/* Hotspot markers */}
      {gallery.lookbook_hotspots.map((hotspot) => (
        <a
          key={hotspot.id}
          href={`/produk/${hotspot.product_id}`}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-indigo-600 border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold hover:bg-indigo-700 transition-all duration-200 hover:scale-125"
          style={{
            left: `${hotspot.coordinates.x}%`,
            top: `${hotspot.coordinates.y}%`
          }}
          title={hotspot.product.name}
          onMouseEnter={() => setHoveredHotspot(hotspot)}
          onMouseLeave={() => setHoveredHotspot(null)}
        >
          ?
        </a>
      ))}

      {/* Product preview tooltip */}
      {hoveredHotspot && (
        <div 
          className="absolute bg-white p-4 rounded-lg shadow-xl border border-gray-200 max-w-xs z-10"
          style={{
            left: `${hoveredHotspot.coordinates.x + 5}%`,
            top: `${hoveredHotspot.coordinates.y}%`,
            transform: 'translateY(-50%)'
          }}
        >
          <div className="flex items-center">
            {hoveredHotspot.product.product_images && hoveredHotspot.product.product_images[0]?.image_url ? (
              <img 
                src={hoveredHotspot.product.product_images[0].image_url} 
                alt={hoveredHotspot.product.name} 
                className="w-16 h-16 object-cover rounded mr-3"
              />
            ) : (
              <div className="bg-gray-200 border-2 border-dashed rounded w-16 h-16 flex items-center justify-center text-gray-500 mr-3">
                ?
              </div>
            )}
            <div>
              <h3 className="font-semibold text-gray-900">{hoveredHotspot.product.name}</h3>
              <p className="text-indigo-600 font-bold">Rp{Number(hoveredHotspot.product.price).toLocaleString('id-ID')}</p>
              <p className="text-sm text-gray-600 mt-1">Klik untuk detail</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LookbookInteractive;