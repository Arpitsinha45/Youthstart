import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Menu, Bell, Search, User } from 'lucide-react';
import { AdminSidebar } from './admin/AdminSidebar';
import { AdminDashboard } from './admin/AdminDashboard';
import { PostEditor } from './admin/PostEditor';
import { PageBuilder } from './admin/PageBuilder';
import { StartupManager } from './admin/StartupManager';
import { SubmissionsManager } from './admin/SubmissionsManager';
import { MediaManager } from './admin/MediaManager';
import { MonetizationManager } from './admin/MonetizationManager';
import { NewsletterManager } from './admin/NewsletterManager';
import { AppearanceSettings } from './admin/AppearanceSettings';
import { SettingsPanel } from './admin/SettingsPanel';
import { Story } from '../types';
import { useAuth } from '../lib/AuthContext';

interface AdminPageProps {
  onBack: () => void;
  stories: Story[];
  setStories: React.Dispatch<React.SetStateAction<Story[]>>;
}

const AdminPage: React.FC<AdminPageProps> = ({ onBack, stories, setStories }) => {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p className="text-gray-400 mb-8">Please sign in to access the admin panel.</p>
        <button onClick={onBack} className="bg-white text-black px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs">
          Back to Home
        </button>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <AdminDashboard />;
      case 'posts': return <PostEditor stories={stories} setStories={setStories} />;
      case 'pages': return <PageBuilder />;
      case 'startups': return <StartupManager />;
      case 'submissions': return <SubmissionsManager />;
      case 'media': return <MediaManager />;
      case 'monetization': return <MonetizationManager />;
      case 'newsletter': return <NewsletterManager />;
      case 'appearance': return <AppearanceSettings />;
      case 'settings': return <SettingsPanel />;
      default: return <div className="text-gray-400">Module under construction.</div>;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col lg:flex-row font-sans">
      <AdminSidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onBack={onBack} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onSignOut={signOut}
      />
      
      <div className="flex-1 lg:ml-64 flex flex-col h-screen overflow-hidden bg-[#0a0a0a]">
        {/* Header */}
        <header className="h-16 border-b border-white/10 bg-[#0a0a0a]/50 backdrop-blur-md flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 text-gray-400 hover:text-white">
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden md:flex items-center gap-2 text-gray-400 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 w-64">
              <Search className="w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-gray-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-white relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full border border-black"></span>
            </button>
            
            <div className="h-8 w-px bg-white/10 mx-2 hidden md:block"></div>
            
            <div className="flex items-center gap-3">
              <div className="text-right hidden md:block">
                <div className="text-sm font-bold text-white">{user?.user_metadata?.full_name || 'Admin User'}</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider">Administrator</div>
              </div>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 p-[1px]">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                  {user?.user_metadata?.avatar_url ? (
                    <img src={user?.user_metadata?.avatar_url} alt="User" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-7xl mx-auto"
          >
            {renderContent()}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
