import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Menu, Bell, Search, User } from 'lucide-react';
import { AdminSidebar } from './admin/AdminSidebar';
import { AdminDashboard } from './admin/AdminDashboard';
import { PostEditor } from './admin/PostEditor';
import { PageBuilder } from './admin/PageBuilder';
import { FeaturedContentManager } from './admin/FeaturedContentManager';
import { HeaderNavigationBuilder } from './admin/HeaderNavigationBuilder';
import { FooterBuilder } from './admin/FooterBuilder';
import { CategoriesTagsManager } from './admin/CategoriesTagsManager';
import { NewsletterManager } from './admin/NewsletterManager';
import { AdsSponsorsManager } from './admin/AdsSponsorsManager';
import { SEOSettings } from './admin/SEOSettings';
import { ThemeCustomizer } from './admin/ThemeCustomizer';
import { UserManagement } from './admin/UserManagement';
import { SiteSettings } from './admin/SiteSettings';
import { MediaManager } from './admin/MediaManager';
import { Post } from '../src/types/admin';
import { useAuth } from '../lib/AuthContext';

interface AdminPageProps {
  onBack: () => void;
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  hasAIKey: boolean;
}

const AdminPage: React.FC<AdminPageProps> = ({ onBack, posts, setPosts, hasAIKey }) => {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <AdminDashboard setActiveTab={setActiveTab} />;
      case 'posts': return <PostEditor posts={posts} setPosts={setPosts} hasAIKey={hasAIKey} />;
      case 'pages': return <PageBuilder />;
      case 'media': return <MediaManager />;
      case 'featured': return <FeaturedContentManager />;
      case 'header-nav': return <HeaderNavigationBuilder />;
      case 'footer': return <FooterBuilder />;
      case 'categories-tags': return <CategoriesTagsManager />;
      case 'newsletter': return <NewsletterManager />;
      case 'ads': return <AdsSponsorsManager />;
      case 'seo': return <SEOSettings />;
      case 'theme': return <ThemeCustomizer />;
      case 'users': return <UserManagement />;
      case 'site-settings': return <SiteSettings />;
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
                <div className="text-sm font-bold text-white">{user?.user_metadata?.full_name || 'Guest Admin'}</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider">{user ? 'Administrator' : 'Public Access'}</div>
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
