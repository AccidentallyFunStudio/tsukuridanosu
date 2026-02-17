import React from 'react';
import { ArrowDown, Bell } from 'lucide-react';
import { ASSETS_BASE } from '../constants';

const Hero: React.FC = () => {
  // New cover image URL
  const coverImage = `${ASSETS_BASE}/Sajak%20Bunga%20Cover%20Square.webp`;
  // Optimize: Resize to 800px (retina ready for 400-500px container) and convert to WebP
  const optimizedCoverImage = `https://wsrv.nl/?url=${encodeURIComponent(coverImage)}&w=800&q=80&output=webp`;

  return (
    <section id="latest" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Abstract Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-intense-red/10 rounded-full blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-white/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 h-full items-center">
        
        {/* Left: Vertical Typography (Hidden on mobile) */}
        <div className="hidden md:flex col-span-2 h-full flex-col justify-center items-center border-r border-white/10">
           <h1 className="vertical-text text-8xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600 tracking-wider h-[80vh] leading-loose select-none">
             作りだノス
           </h1>
        </div>

        {/* Center: Main Artwork & Release Info */}
        <div className="col-span-1 md:col-span-8 flex flex-col items-center justify-center py-10 md:py-0">
          <div className="relative group perspective-1000 w-full max-w-[300px] md:max-w-[500px] aspect-square">
            {/* Artwork Container */}
            <div className="relative w-full h-full bg-black border border-white/20 p-2 transform transition-transform duration-700 group-hover:scale-[1.02] group-hover:rotate-1">
              <div className="w-full h-full relative overflow-hidden">
                <img 
                  src={optimizedCoverImage} 
                  alt="Sajak Bunga Single Cover" 
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6 md:p-8">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                     <p className="font-display text-intense-red text-base md:text-lg tracking-widest">MARCH 2026</p>
                  </div>
                </div>
              </div>
              
              {/* Decorative Corners */}
              <div className="absolute -top-1 -left-1 w-4 h-4 border-t border-l border-intense-red"></div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b border-r border-intense-red"></div>
            </div>
            
            {/* Glitch Shadow Effect */}
            <div className="absolute inset-0 bg-intense-red/20 -z-10 translate-x-2 translate-y-2 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          <div className="mt-8 md:mt-12 text-center px-4">
             <h2 className="text-xs md:text-base font-display tracking-[0.4em] text-intense-red mb-2 md:mb-4 animate-fade-in">NEW SINGLE</h2>
             <h3 className="text-3xl md:text-5xl lg:text-7xl font-serif font-bold text-white mb-4 md:mb-6 glitch-hover leading-tight" data-text="SAJAK BUNGA / 花の詩">
               SAJAK BUNGA / 花の詩
             </h3>
             
             {/* Mobile-only info to replace hidden sidebar */}
             <div className="flex md:hidden flex-col gap-4 mb-8 text-white/50 text-xs font-display tracking-widest">
                <span>MP RECORDS</span>
                <span>MARCH 2026</span>
             </div>

             <div className="flex flex-col md:flex-row gap-4 justify-center mt-4 md:mt-8 w-full md:w-auto">
               <a 
                 href="https://youtube.com" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="flex items-center justify-center gap-2 px-8 py-3 bg-white text-black hover:bg-intense-red hover:text-white transition-all duration-300 group w-full md:w-auto"
               >
                 <Bell size={18} />
                 <span className="font-display text-xs tracking-widest font-bold">NOTIFY ME</span>
               </a>
             </div>
             <p className="mt-4 text-xs text-gray-500 font-serif">Releasing March 2026</p>
          </div>
        </div>

        {/* Right: Modern Info (Desktop only) */}
        <div className="col-span-1 md:col-span-2 hidden md:flex flex-col justify-between h-[60vh] border-l border-white/10 pl-8">
          <div className="flex flex-col gap-2">
             <span className="font-display text-xs text-gray-500">NEXT RELEASE</span>
             <span className="font-sans text-sm">MARCH 2026</span>
          </div>
          <div className="flex flex-col gap-2">
             <span className="font-display text-xs text-gray-500">LABEL</span>
             <span className="font-sans text-sm">MP RECORDS</span>
          </div>
          <div className="flex-grow"></div>
          <div className="animate-bounce text-intense-red">
             <ArrowDown size={24} />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;