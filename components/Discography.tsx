import React, { useRef, useState } from 'react';
import { DISCOGRAPHY } from '../constants';
import { Release } from '../types';
import { ChevronRight, ChevronLeft, Disc, Lock, X, Play } from 'lucide-react';

const Discography: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeRelease, setActiveRelease] = useState<Release | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handlePlay = (release: Release) => {
    if (release.year === 'Coming Soon') return;
    setActiveRelease(release);
  };

  const closePlayer = () => {
    setActiveRelease(null);
  };

  return (
    <>
      <section id="discography" className="pt-24 pb-8 bg-deep-black relative border-t border-white/5">
        <div className="container mx-auto px-6 mb-12 flex justify-between items-end">
          <div>
             <h2 className="text-intense-red font-display text-sm tracking-[0.3em] mb-2">DISCOGRAPHY</h2>
             <h3 className="text-4xl md:text-5xl font-serif font-bold text-white">作品集</h3>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={() => scroll('left')}
              className="p-3 border border-white/20 hover:border-intense-red hover:bg-intense-red text-white transition-all rounded-full"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-3 border border-white/20 hover:border-intense-red hover:bg-intense-red text-white transition-all rounded-full"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-8 px-6 md:px-24 pb-8 snap-x snap-mandatory hide-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {DISCOGRAPHY.map((release, index) => {
            const isComingSoon = release.year === 'Coming Soon';
            const isActive = activeRelease?.id === release.id;
            
            return (
              <div 
                key={release.id} 
                className="flex-shrink-0 w-[300px] md:w-[400px] snap-center group cursor-pointer"
                onClick={() => handlePlay(release)}
              >
                <div className={`relative aspect-square overflow-hidden mb-6 bg-charcoal border transition-colors duration-300 ${isActive ? 'border-intense-red' : 'border-white/5'}`}>
                   <img 
                     src={release.coverUrl} 
                     alt={release.title} 
                     className={`w-full h-full transition-transform duration-700 group-hover:scale-110 
                       ${isComingSoon ? 'object-contain p-12 opacity-50 grayscale' : 'object-cover grayscale group-hover:grayscale-0'}
                     `}
                   />
                   
                   <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                     {isComingSoon ? (
                       <div className="flex flex-col items-center text-white/70">
                         <Lock size={32} />
                         <span className="font-display text-xs mt-2 tracking-widest">UNRELEASED</span>
                       </div>
                     ) : (
                       <button className="p-4 bg-white text-black rounded-full hover:bg-intense-red hover:text-white transition-all transform hover:scale-110">
                         <Play size={24} fill="currentColor" />
                       </button>
                     )}
                   </div>
                   
                   {/* Stylized index number */}
                   <span className="absolute top-0 right-0 p-4 font-display text-6xl text-white/10 font-bold pointer-events-none group-hover:text-intense-red/20 transition-colors">
                     0{index + 1}
                   </span>
                </div>

                <div className="flex justify-between items-start border-b border-white/10 pb-4">
                  <div>
                    <h4 className={`text-2xl font-serif font-bold mb-1 transition-colors ${isActive ? 'text-intense-red' : 'text-white group-hover:text-intense-red'}`}>
                        {release.title}
                    </h4>
                    <p className="text-sm text-gray-400 font-display">{release.type} • {release.year}</p>
                  </div>
                  {isActive && (
                      <div className="animate-pulse text-intense-red">
                          <Disc size={20} className="animate-spin" />
                      </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Decorative Line - Moved closer to elements via padding changes */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-intense-red/50 to-transparent mt-4 opacity-30"></div>
      </section>

      {/* Persistent Audio Player Overlay */}
      <div className={`fixed bottom-0 left-0 w-full z-[100] transition-transform duration-500 ease-in-out ${activeRelease ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="bg-deep-black/95 backdrop-blur-lg border-t border-intense-red/30 shadow-[0_-10px_40px_rgba(0,0,0,0.8)]">
            <div className="container mx-auto px-4 py-2 flex items-center justify-center relative">
                
                {/* Close Button */}
                <button 
                    onClick={closePlayer}
                    className="absolute -top-12 right-4 md:right-0 bg-deep-black border border-white/20 text-white p-2 rounded-full hover:bg-intense-red hover:border-intense-red transition-all"
                >
                    <X size={20} />
                </button>

                {/* Spotify Iframe */}
                {activeRelease?.spotifyEmbedUrl && (
                    <div className="w-full max-w-3xl animate-fade-in">
                        <iframe 
                            src={activeRelease.spotifyEmbedUrl} 
                            width="100%" 
                            height="152" 
                            frameBorder="0" 
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                            loading="lazy"
                            className="rounded-xl mx-auto"
                            style={{ borderRadius: '12px' }}
                        ></iframe>
                    </div>
                )}
            </div>
        </div>
      </div>
    </>
  );
};

export default Discography;