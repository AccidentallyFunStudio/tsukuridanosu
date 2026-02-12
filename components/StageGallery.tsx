import React from 'react';
import { STAGE_PHOTOS } from '../constants';
import { MapPin, Calendar } from 'lucide-react';

const StageGallery: React.FC = () => {
  
  // Expanded transforms to accommodate more photos and create a denser "pile" look
  const transforms = [
    { rotate: '-rotate-6', translate: 'md:translate-y-4 md:-translate-x-4', margin: 'md:-mr-16' },
    { rotate: 'rotate-3', translate: 'md:-translate-y-8', margin: 'md:-mr-12 md:-ml-4' },
    { rotate: '-rotate-12', translate: 'md:translate-y-2', margin: 'md:-mr-16' },
    { rotate: 'rotate-6', translate: 'md:translate-y-12', margin: 'md:-mr-10' },
    { rotate: '-rotate-3', translate: 'md:-translate-y-4', margin: 'md:-mr-14' },
    { rotate: 'rotate-12', translate: 'md:translate-y-6', margin: 'md:-mr-12' },
    { rotate: '-rotate-2', translate: 'md:-translate-y-2', margin: 'md:-mr-8' },
  ];

  return (
    <section id="gallery" className="py-16 md:py-24 bg-deep-black relative border-t border-white/5 overflow-hidden flex flex-col">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-20 pointer-events-none"></div>

      <div className="container mx-auto px-6 mb-12 relative z-10 text-center">
         <h2 className="text-intense-red font-display text-sm tracking-[0.3em] mb-4">LIVE DOCUMENTATION</h2>
         <h3 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">舞台記録 / MEMORIES</h3>
         <p className="text-gray-500 text-xs font-display tracking-widest max-w-md mx-auto">
            FRAGMENTS SCATTERED IN THE VOID. <br/> HOVER TO BRING THEM INTO FOCUS.
         </p>
      </div>

      <div className="container mx-auto px-6">
        {/* The "Pile" Container */}
        <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-6 md:gap-y-12 md:gap-x-0 md:min-h-[500px] max-w-6xl mx-auto">
          {STAGE_PHOTOS.map((photo, index) => {
            const style = transforms[index % transforms.length];
            
            // Image Optimization: Use wsrv.nl to resize and compress on the fly
            // w=500: Enough resolution for the card size and hover zoom
            // q=80: Good balance of quality and file size
            // output=webp: Modern efficient format
            const optimizedUrl = `https://wsrv.nl/?url=${encodeURIComponent(photo.url)}&w=500&q=80&output=webp`;

            return (
              <div 
                key={photo.id}
                className={`
                  relative group cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
                  ${style.rotate} ${style.translate} ${style.margin}
                  hover:scale-[1.6] hover:rotate-0 hover:z-50 hover:translate-y-0 hover:translate-x-0
                  w-[220px] md:w-[260px]
                `}
                style={{ zIndex: 10 + index }} // Base z-index to maintain some order before hover
              >
                {/* Polaroid Frame */}
                <div className="bg-white p-2 pb-3 shadow-2xl group-hover:shadow-[0_25px_60px_rgba(0,0,0,0.5)] transition-shadow duration-500">
                  
                  {/* Image Wrapper */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 mb-2">
                    <img 
                      src={optimizedUrl} 
                      alt={photo.title} 
                      className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-500"
                      loading="lazy"
                      width="500"
                      height="375"
                    />
                    
                    {/* Tape Effect (Decorative) */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-4 bg-white/30 backdrop-blur-sm rotate-2 shadow-sm border border-white/20"></div>
                  </div>

                  {/* Handwritten-style Caption */}
                  <div className="px-1">
                    <div className="flex justify-between items-start border-b border-black/10 pb-1 mb-1">
                       <h4 className="text-black font-sans font-bold text-xs leading-tight group-hover:text-intense-red transition-colors truncate max-w-[80%]">
                         {photo.title}
                       </h4>
                       <span className="text-black/40 font-display text-[9px] font-bold">0{index + 1}</span>
                    </div>

                    <div className="flex justify-between items-center text-[9px] text-gray-500 font-sans tracking-tight">
                      <div className="flex items-center gap-1">
                        <MapPin size={8} />
                        <span>{photo.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={8} />
                        <span>{photo.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StageGallery;