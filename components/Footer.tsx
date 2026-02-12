import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const Footer: React.FC = () => {
  const contactInfo = {
    email: 'tsukuridanosu@gmail.com',
    phone: '+6288988880110',
    whatsappUrl: 'https://wa.me/6288988880110'
  };

  const SocialLinks = [
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/tsukuridanosu/',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      )
    },
    {
      name: 'YouTube',
      href: 'https://www.youtube.com/@tsukuridanosu',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path>
          <path d="m10 15 5-3-5-3z"></path>
        </svg>
      )
    },
    {
      name: 'WhatsApp',
      href: contactInfo.whatsappUrl,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"></path>
        </svg>
      )
    },
    {
      name: 'Mail',
      href: `mailto:${contactInfo.email}`,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="16" x="2" y="4" rx="2"></rect>
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
        </svg>
      )
    }
  ];

  return (
    <footer id="contact" className="bg-deep-black border-t border-white/10 py-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
          
          {/* Left: Branding */}
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-display font-bold text-white tracking-widest">TSUKURIDANOSU</h2>
            <p className="text-gray-500 text-xs font-serif">© 2022 TSUKURIDANOSU. All Rights Reserved.</p>
          </div>

          {/* Center: Contact Details Text */}
          <div className="flex flex-col md:items-center gap-1 text-sm font-display tracking-widest text-gray-400">
             <a href={`mailto:${contactInfo.email}`} className="hover:text-intense-red transition-colors">
                {contactInfo.email}
              </a>
              <a href={contactInfo.whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-intense-red transition-colors">
                {contactInfo.phone}
              </a>
          </div>

          {/* Right: Actions & Socials */}
          <div className="flex flex-col items-start md:items-end gap-6">
            <a 
              href={`mailto:${contactInfo.email}`}
              className="group relative px-6 py-3 bg-white text-black hover:bg-intense-red hover:text-white transition-all duration-300 overflow-hidden"
            >
              <div className="relative z-10 flex items-center gap-3">
                <span className="font-display font-bold tracking-[0.2em] text-xs">CONTACT US</span>
                <ArrowUpRight size={16} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </a>

            <div className="flex gap-6">
              {SocialLinks.map((item, i) => (
                <a 
                  key={i} 
                  href={item.href} 
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  className="text-gray-400 hover:text-intense-red transition-colors transform hover:-translate-y-1 duration-300"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;