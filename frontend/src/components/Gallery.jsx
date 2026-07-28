import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Image as ImageIcon, X, ZoomIn, Eye, Sparkles } from 'lucide-react';

export const Gallery = () => {
  const { galleryItems } = useApp();
  const [activeTab, setActiveTab] = useState('All');
  const [lightboxImg, setLightboxImg] = useState(null);

  const categories = ['All', 'Air Rescue', 'Hospital', 'Fleet', 'Events'];

  const filteredGallery = galleryItems.filter(item => 
    activeTab === 'All' || item.category === activeTab
  );

  return (
    <section className="py-16 bg-dark-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ems-red/10 border border-ems-red/30 text-ems-red text-xs font-semibold uppercase tracking-wider mb-3">
            <ImageIcon className="w-3.5 h-3.5" />
            Media & Operations
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-heading tracking-tight mb-4">
            PILLBOX EMS GALLERY
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Operational photos, fleet showcases, and roleplay highlights from San Andreas emergency operations.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                activeTab === cat
                  ? 'bg-ems-red text-white shadow-glow-red font-bold'
                  : 'bg-dark-850 text-slate-300 hover:text-white border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              onClick={() => setLightboxImg(item)}
              className="glass-panel-interactive rounded-2xl overflow-hidden cursor-pointer group relative"
            >
              <div className="relative h-64 overflow-hidden bg-dark-900">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                
                {/* Hover overlay zoom icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm">
                  <div className="p-3.5 rounded-full bg-ems-red text-white shadow-glow-red transform scale-75 group-hover:scale-100 transition-transform">
                    <ZoomIn className="w-6 h-6" />
                  </div>
                </div>

                {/* Category badge */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-dark-950/90 text-ems-red text-[11px] font-mono font-bold border border-ems-red/40">
                  {item.category}
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold text-white font-heading group-hover:text-ems-red transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-xs mt-1">
                  {item.description}
                </p>
              </div>

            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {lightboxImg && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
            <button 
              onClick={() => setLightboxImg(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-dark-850 text-white hover:bg-ems-red transition-colors z-50 border border-white/20"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="max-w-4xl w-full max-h-[90vh] glass-panel rounded-2xl overflow-hidden border border-ems-red/40 shadow-glow-red-lg flex flex-col">
              <div className="relative flex-1 bg-black overflow-hidden flex items-center justify-center max-h-[70vh]">
                <img 
                  src={lightboxImg.image} 
                  alt={lightboxImg.title} 
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              <div className="p-6 bg-dark-900 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="px-2.5 py-1 rounded-full bg-ems-red/20 text-ems-red text-xs font-mono font-bold border border-ems-red/40">
                    {lightboxImg.category}
                  </span>
                  <h3 className="text-xl font-bold text-white font-heading mt-2">{lightboxImg.title}</h3>
                  <p className="text-slate-300 text-xs mt-1">{lightboxImg.description}</p>
                </div>

                <button
                  onClick={() => setLightboxImg(null)}
                  className="px-5 py-2.5 rounded-xl bg-ems-red text-white text-xs font-bold uppercase tracking-wider shadow-glow-red hover:bg-ems-red-hover"
                >
                  Close Preview
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
