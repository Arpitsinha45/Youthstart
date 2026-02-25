import React from 'react';
import { Hexagon, Menu, ChevronDown, Home, Sparkles, ListPlus, Lightbulb, Zap, Newspaper, UserCircle, Landmark, Rocket, PlusCircle } from 'lucide-react';
import { SIDEBAR_MENU } from '../constants';
import { useAuth } from '../lib/AuthContext';

interface SidebarProps {
  onCategorySelect: (category: string | null) => void;
  onToggleMinimize: () => void;
  isMinimized: boolean;
  selectedCategory?: string | null;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const ICON_MAP: Record<string, any> = {
  'trending': Sparkles,
  'ai-news': ListPlus,
  'founder-stories': Lightbulb,
  'funding-updates': Landmark,
  'startup-ideas': Rocket
};

const Sidebar: React.FC<SidebarProps> = ({ onCategorySelect, onToggleMinimize, isMinimized, selectedCategory, onMouseEnter, onMouseLeave }) => {
  const { user } = useAuth();

  return (
    <aside 
      className={`fixed left-0 top-0 h-screen border-r border-brand-border flex flex-col z-50 bg-[#050505] transition-all duration-500 ease-in-out overflow-y-auto ${isMinimized ? 'w-20 p-4' : 'w-64 p-6'}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      
      {/* Top Header */}
      <div className={`flex items-center ${isMinimized ? 'justify-center' : 'justify-between'} mb-8`}>
        <div 
          className={`flex items-center gap-2 cursor-pointer ${isMinimized ? 'justify-center' : ''}`}
          onClick={() => onCategorySelect(null)}
        >
          <Hexagon className="w-6 h-6 text-white shrink-0" />
          {!isMinimized && <span className="text-xl font-bold tracking-tight">Union</span>}
        </div>
        {!isMinimized && (
          <Menu 
            className="w-5 h-5 text-gray-400 cursor-pointer hover:text-white transition-colors" 
            onClick={onToggleMinimize} 
          />
        )}
      </div>

      {/* User Profile */}
      {!isMinimized && (
        <div className="flex items-center justify-between mb-8 cursor-pointer group px-2">
          <div className="flex items-center gap-3">
            <img 
              src={user?.avatar || "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=100"} 
              alt="User" 
              className="w-10 h-10 rounded-full object-cover" 
            />
            <div>
              <div className="text-sm font-semibold text-white group-hover:text-gray-200">
                {user?.name || "Randy Carder"}
              </div>
              <div className="text-xs text-gray-500">Premium Plan</div>
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </div>
      )}
      {isMinimized && (
        <div className="flex justify-center mb-8">
          <img 
            src={user?.avatar || "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=100"} 
            alt="User" 
            className="w-10 h-10 rounded-full object-cover" 
          />
        </div>
      )}

      {/* Main Navigation */}
      <nav className="mb-6">
        <ul className={`space-y-1 ${isMinimized ? 'flex flex-col items-center' : ''}`}>
          <li>
            <button 
              onClick={() => onCategorySelect(null)}
              title={isMinimized ? "Home" : ""}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${selectedCategory === null || selectedCategory === undefined ? 'bg-white text-black' : 'text-gray-400 hover:bg-white/5 hover:text-white'} ${isMinimized ? 'justify-center' : ''}`}
            >
              <Home className="w-5 h-5 shrink-0" />
              {!isMinimized && <span className="text-sm font-medium">Home</span>}
            </button>
          </li>
          {SIDEBAR_MENU.map((item) => {
            const Icon = ICON_MAP[item.id] || Zap;
            const isActive = selectedCategory === item.label;
            return (
              <li key={item.id}>
                <button 
                  onClick={() => onCategorySelect(item.label)}
                  title={isMinimized ? item.label : ""}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${isActive ? 'bg-white text-black' : 'text-gray-400 hover:bg-white/5 hover:text-white'} ${isMinimized ? 'justify-center' : ''}`}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  {!isMinimized && <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Divider */}
      <div className="h-px bg-white/10 w-full my-2"></div>

      {/* Upload Button */}
      {user && (
        <div className={`mt-auto pt-4 ${isMinimized ? 'flex justify-center' : 'px-3'}`}>
          <button 
            className={`flex items-center gap-3 text-emerald-500 hover:text-emerald-400 transition-colors ${isMinimized ? 'justify-center' : ''}`}
            title={isMinimized ? 'Upload News' : ''}
          >
            <PlusCircle className="w-5 h-5 shrink-0" />
            {!isMinimized && <span className="text-sm font-bold whitespace-nowrap">Upload News</span>}
          </button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
