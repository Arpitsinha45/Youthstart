
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, Bell, User, LogOut, PlusCircle, X, Menu } from 'lucide-react';
import { CATEGORIES } from '../constants';
import { useAuth } from '../lib/AuthContext';

interface HeaderProps {
  onCategorySelect: (category: string | null) => void;
  isSidebarMinimized: boolean;
  onSearch: (query: string) => void;
  searchQuery: string;
  onAboutClick: () => void;
  onAdminClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCategorySelect, isSidebarMinimized, onSearch, searchQuery, onAboutClick, onAdminClick }) => {
  const { user, signIn, signOut } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const clearSearch = () => {
    onSearch('');
    setIsSearchOpen(false);
  };

  const handleCategoryClick = (category: string | null) => {
    onCategorySelect(category);
    setIsMobileMenuOpen(false);
  };

  const handleAboutClick = () => {
    onAboutClick();
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 right-0 h-16 border-b md:border-b-0 border-brand-border bg-black/80 backdrop-blur-md z-40 flex items-center px-4 md:px-8 lg:px-12 transition-all duration-500 ${isSidebarMinimized ? 'left-0 lg:left-20' : 'left-0 lg:left-64'}`}>
      <div className="flex items-center justify-between w-full relative">
        
        {/* Search Bar Overlay */}
        {isSearchOpen ? (
          <div className="absolute inset-0 flex items-center bg-black/90 z-10 w-full">
            <form onSubmit={handleSearchSubmit} className="flex-grow flex items-center gap-3">
              <Search className="w-5 h-5 text-gray-400" />
              <input 
                ref={searchInputRef}
                type="text" 
                placeholder="Search articles, founders, topics..."
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                className="flex-grow bg-transparent border-none outline-none text-white text-sm placeholder:text-gray-600"
              />
              <button 
                type="button"
                onClick={clearSearch}
                className="text-gray-500 hover:text-white transition-colors p-2"
              >
                <X className="w-5 h-5" />
              </button>
            </form>
          </div>
        ) : (
          <nav className="hidden md:flex items-center gap-8 overflow-x-auto no-scrollbar">
            <button 
              onClick={() => handleCategoryClick(null)}
              className="text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors whitespace-nowrap"
            >
              Home
            </button>
            <button 
              onClick={handleAboutClick}
              className="text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors whitespace-nowrap"
            >
              About
            </button>
            {CATEGORIES.map((cat) => (
              <button 
                key={cat} 
                onClick={() => handleCategoryClick(cat)}
                className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors whitespace-nowrap"
              >
                {cat}
                <ChevronDown className="w-3 h-3 opacity-50" />
              </button>
            ))}
          </nav>
        )}

        {/* Mobile Logo & Hamburger (Visible when sidebar is hidden and search is closed) */}
        {!isSearchOpen && (
          <div className="md:hidden flex items-center gap-3">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-500 hover:text-white transition-colors p-1"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            {user && (
              <button 
                onClick={onAdminClick}
                className="flex items-center gap-1.5 px-3 py-1 bg-white text-black rounded-full text-[9px] font-bold uppercase tracking-widest hover:bg-gray-200 transition-all"
              >
                <PlusCircle className="w-3 h-3" />
                Write
              </button>
            )}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleCategoryClick(null)}>
              <span className="text-sm font-bold tracking-tighter">YouthStartup.in</span>
            </div>
          </div>
        )}

        <div className={`flex items-center gap-4 sm:gap-6 ${isSearchOpen ? 'hidden' : ''}`}>
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="text-gray-500 hover:text-white transition-colors"
          >
            <Search className="w-4 h-4" />
          </button>
          
          {user ? (
            <div className="flex items-center gap-4">
              <button 
                onClick={onAdminClick}
                className="hidden sm:flex items-center gap-2 px-4 py-1.5 bg-white text-black rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-gray-200 transition-all"
              >
                <PlusCircle className="w-3 h-3" />
                Write Article
              </button>
              <div className="flex items-center gap-2 group relative">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-brand-border cursor-pointer">
                  <User className="w-4 h-4" />
                </div>
                <div className="absolute top-full right-0 mt-2 w-48 bg-black border border-brand-border rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all p-2 z-50">
                  <div className="px-4 py-2 border-b border-brand-border mb-2">
                    <p className="text-[10px] font-bold text-white truncate">{user.user_metadata?.full_name || user.email}</p>
                    <p className="text-[9px] text-gray-500 truncate">{user.email}</p>
                  </div>
                  <button 
                    onClick={signOut}
                    className="w-full flex items-center gap-2 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-white hover:bg-white/5 rounded transition-all"
                  >
                    <LogOut className="w-3 h-3" />
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <button 
                onClick={signIn}
                className="hidden sm:flex items-center gap-2 px-4 py-1.5 bg-white text-black rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-gray-200 transition-all"
              >
                <PlusCircle className="w-3 h-3" />
                Write Article
              </button>
              <button 
                onClick={signIn}
                className="sm:hidden text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors"
              >
                Sign In
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-black/95 backdrop-blur-xl border-b border-brand-border md:hidden flex flex-col py-4 px-6 z-50 shadow-2xl">
          <button 
            onClick={() => handleCategoryClick(null)}
            className="py-3 text-left text-sm font-bold uppercase tracking-widest text-white border-b border-white/10"
          >
            Home
          </button>
          <button 
            onClick={handleAboutClick}
            className="py-3 text-left text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-white border-b border-white/10 transition-colors"
          >
            About
          </button>
          {CATEGORIES.map((cat) => (
            <button 
              key={cat} 
              onClick={() => handleCategoryClick(cat)}
              className="py-3 text-left text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-white border-b border-white/10 transition-colors"
            >
              {cat}
            </button>
          ))}
          {!user && (
            <button className="mt-4 flex items-center justify-center gap-2 px-4 py-3 bg-white text-black rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-gray-200 transition-all">
              <Bell className="w-4 h-4" />
              Subscribe
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
