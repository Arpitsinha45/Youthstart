
import React from 'react';
import { UserCircle } from 'lucide-react';

interface HeaderProps {
  onNavClick?: (view: string) => void;
  onAdminClick?: () => void;
  currentView?: string;
}

const Header: React.FC<HeaderProps> = ({ onNavClick, onAdminClick, currentView }) => {
  const navItems = [
    { label: 'Home', id: 'HOME' },
    { label: 'Founder Stories', id: 'FOUNDER_STORIES' },
    { label: 'Funding News', id: 'FUNDING_NEWS' },
    { label: 'Student Startups', id: 'STUDENT_STARTUPS' },
    { label: 'Side Hustles', id: 'SIDE_HUSTLES' },
    { label: 'Tech', id: 'TECH' },
    { label: 'Strategy', id: 'STRATEGY' },
  ];

  return (
    <header className="w-full bg-brand-bg text-brand-dark border-b border-gray-200">
      {/* Top Utility Bar */}
      <div className="border-b border-gray-200 py-2.5 px-4 md:px-8 flex flex-col md:flex-row justify-between items-center text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase">
        <div className="flex gap-4 md:gap-8 mb-2 md:mb-0">
          <button onClick={() => onNavClick?.('ABOUT')} className={`hover:text-brand-accent transition-colors ${currentView === 'ABOUT' ? 'text-brand-accent' : ''}`}>ABOUT</button>
          <button onClick={() => onNavClick?.('SUBMIT_STORY')} className={`hover:text-brand-accent transition-colors ${currentView === 'SUBMIT_STORY' ? 'text-brand-accent' : ''}`}>SUBMIT STORY</button>
          <button onClick={() => onNavClick?.('STARTUP_DIRECTORY')} className={`hover:text-brand-accent transition-colors ${currentView === 'STARTUP_DIRECTORY' ? 'text-brand-accent' : ''}`}>STARTUP DIRECTORY</button>
          <button onClick={() => onNavClick?.('CONTACT')} className={`hover:text-brand-accent transition-colors ${currentView === 'CONTACT' ? 'text-brand-accent' : ''}`}>CONTACT</button>
        </div>
        <div className="flex gap-6 items-center">
          <a href="mailto:hello@youthstartups.in" className="lowercase text-gray-500 font-medium hover:text-brand-accent transition-colors tracking-normal">hello@youthstartups.in</a>
          <div className="flex items-center gap-4 border-l border-gray-300 pl-6">
            <button onClick={onAdminClick} className="flex items-center gap-1.5 hover:text-brand-accent transition-colors">
              <UserCircle className="w-3.5 h-3.5" /> Staff Login
            </button>
          </div>
        </div>
      </div>

      {/* Main Branding - Centered Logo Only */}
      <div className="py-10 md:py-16 px-4 md:px-8 max-w-screen-2xl mx-auto flex items-center justify-center">
        <div className="flex flex-col items-center justify-center text-center cursor-pointer group" onClick={() => onNavClick?.('HOME')}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter serif-title whitespace-nowrap leading-none transition-transform group-hover:scale-[1.02] duration-500">
            YOUTHSTARTUPS.IN
          </h1>
          <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.5em] text-brand-accent mt-6 opacity-90">
            Inspiring the Next Generation of Entrepreneurs
          </p>
        </div>
      </div>

      {/* Primary Navigation Bar */}
      <nav className="border-t border-gray-300 bg-white shadow-sm overflow-x-auto no-scrollbar">
        <ul className="flex items-center justify-center min-w-max px-4 md:px-0 py-5 gap-8 md:gap-14 text-[10px] md:text-[11px] font-black tracking-[0.2em] uppercase">
          {navItems.map((item) => (
            <li 
              key={item.id}
              onClick={() => onNavClick?.(item.id)}
              className={`cursor-pointer transition-all relative pb-1 whitespace-nowrap ${
                currentView === item.id 
                ? 'text-brand-accent' 
                : 'text-gray-400 hover:text-brand-dark'
              }`}
            >
              {item.label}
              {currentView === item.id && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-accent animate-in fade-in slide-in-from-left-1 duration-300"></span>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
