import React from 'react';
import { LogOut, ArrowLeft, X } from 'lucide-react';
import { ADMIN_SIDEBAR_MENU, ADMIN_ICON_MAP } from '../../src/constants/admin';
import { useAuth } from '../../lib/AuthContext';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onBack: () => void;
  isOpen: boolean;
  onClose: () => void;
  onSignOut: () => void;
}

export const AdminSidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onBack, isOpen, onClose, onSignOut }) => {
  const { user, signIn } = useAuth();
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-40 lg:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}
      
      <div className={`w-64 bg-[#0a0a0a] border-r border-white/10 h-screen flex flex-col fixed left-0 top-0 overflow-y-auto z-50 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold serif-title text-white">YouthStartup</h2>
            <p className="text-[10px] uppercase tracking-widest text-emerald-500 mt-1">Admin OS</p>
          </div>
          <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="flex-1 py-6 px-3 space-y-1">
          {ADMIN_SIDEBAR_MENU.map((item) => {
            const Icon = ADMIN_ICON_MAP[item.id];
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); onClose(); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-white/10 text-white' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-2">
          <button 
            onClick={onBack}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Site
          </button>
          <button 
            onClick={user ? onSignOut : signIn}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${user ? 'text-red-400 hover:bg-red-400/10' : 'text-emerald-400 hover:bg-emerald-400/10'}`}
          >
            <LogOut className="w-4 h-4" />
            {user ? 'Sign Out' : 'Sign In'}
          </button>
        </div>
      </div>
    </>
  );
};
