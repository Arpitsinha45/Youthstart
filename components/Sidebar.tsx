import React from 'react';
import { Menu, ChevronDown, Home, Sparkles, ListPlus, Lightbulb, Zap, PlusCircle } from 'lucide-react';
import { SIDEBAR_MENU } from '../constants';
import { useAuth } from '../lib/AuthContext';
import { motion } from 'motion/react';

interface SidebarProps {
  onCategorySelect: (category: string | null) => void;
  onToggleMinimize: () => void;
  isMinimized: boolean;
  selectedCategory?: string | null;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  signIn: () => Promise<void>;
  hasAIKey: boolean;
}

const ICON_MAP: Record<string, any> = {
  'trending': Sparkles,
  'ai-news': ListPlus,
  'founder-stories': Lightbulb,
  'funding-updates': Zap, // Using Zap as a fallback, adjust as needed
  'startup-ideas': Zap, // Using Zap as a fallback, adjust as needed
};

const Tooltip = ({ text }: { text: string }) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -10 }}
    transition={{ duration: 0.2, ease: 'easeOut' }}
    className="absolute left-full top-1/2 -translate-y-1/2 ml-4 px-3 py-1.5 bg-white text-black text-xs font-bold rounded-lg whitespace-nowrap z-50 shadow-xl"
  >
    {text}
    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-white rotate-45"></div>
  </motion.div>
);

const Sidebar: React.FC<SidebarProps> = ({ onCategorySelect, onToggleMinimize, isMinimized, selectedCategory, onMouseEnter, onMouseLeave, signIn, hasAIKey }) => {
  const { user } = useAuth();

  return (
    <motion.aside 
      animate={{ width: isMinimized ? '80px' : '256px' }}
      transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
      className={`fixed left-0 top-0 h-screen border-r border-brand-border flex flex-col z-50 bg-[#050505] p-4`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      
      {/* Top Header */}
      <div className={`flex items-center ${isMinimized ? 'justify-center' : 'justify-between'} mb-8 shrink-0`}>
        <div 
          className={`flex items-center gap-2 cursor-pointer ${isMinimized ? 'justify-center' : ''}`}
          onClick={() => onCategorySelect(null)}
        >
          {!isMinimized && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-xl font-bold tracking-tight">youthstartup.in</motion.span>}
        </div>
        {!isMinimized && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <Menu 
              className="w-5 h-5 text-gray-400 cursor-pointer hover:text-white transition-colors" 
              onClick={onToggleMinimize} 
            />
          </motion.div>
        )}
      </div>



      {/* Main Navigation */}
      <nav className="mb-6 overflow-y-auto overflow-x-hidden flex-grow">
        <ul className={`space-y-1 ${isMinimized ? 'flex flex-col items-center' : ''}`}>
          <li className="relative group">
            <button 
              onClick={() => onCategorySelect(null)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${selectedCategory === null || selectedCategory === undefined ? 'bg-white text-black shadow-lg shadow-white/10' : 'text-gray-400 hover:bg-white/10 hover:text-white'} ${isMinimized ? 'justify-center' : ''}`}
            >
              <Home className="w-5 h-5 shrink-0" />
              {!isMinimized && <span className="text-sm font-medium">Home</span>}
            </button>
            {isMinimized && <div className="absolute opacity-0 group-hover:opacity-100"><Tooltip text="Home" /></div>}
          </li>
          {SIDEBAR_MENU.map((item) => {
            const Icon = ICON_MAP[item.id] || Zap;
            const isActive = selectedCategory === item.label;
            return (
              <li key={item.id} className="relative group">
                <button 
                  onClick={() => onCategorySelect(item.label)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${isActive ? 'bg-white text-black shadow-lg shadow-white/10' : 'text-gray-400 hover:bg-white/10 hover:text-white'} ${isMinimized ? 'justify-center' : ''}`}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  {!isMinimized && <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>}
                </button>
                {isMinimized && <div className="absolute opacity-0 group-hover:opacity-100"><Tooltip text={item.label} /></div>}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Divider */}
      <div className="h-px bg-white/10 w-full my-2 shrink-0"></div>

      {/* Upload Button */}
      <div className={`mt-auto pt-4 shrink-0 ${isMinimized ? '' : 'px-3'}`}>
        <div className="relative group">
          {hasAIKey && !user && (
            <button 
              onClick={signIn}
              className={`w-full flex items-center gap-3 text-emerald-500 hover:text-emerald-400 transition-colors ${isMinimized ? 'justify-center' : ''}`}
            >
              <PlusCircle className="w-5 h-5 shrink-0" />
              {!isMinimized && <span className="text-sm font-bold whitespace-nowrap">Sign In & Upload</span>}
            </button>
          )}
          {isMinimized && <div className="absolute opacity-0 group-hover:opacity-100"><Tooltip text="Sign In & Upload" /></div>}
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
