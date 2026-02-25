import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Menu } from 'lucide-react';
import { AdminSidebar } from './admin/AdminSidebar';
import { AdminDashboard } from './admin/AdminDashboard';
import { PostEditor } from './admin/PostEditor';
import { PageBuilder } from './admin/PageBuilder';
import { StartupManager } from './admin/StartupManager';
import { MonetizationManager } from './admin/MonetizationManager';
import { NewsletterManager } from './admin/NewsletterManager';
import { AppearanceSettings } from './admin/AppearanceSettings';
import { SettingsPanel } from './admin/SettingsPanel';
import { Story } from '../types';

interface AdminPageProps {
  onBack: () => void;
  stories: Story[];
  setStories: React.Dispatch<React.SetStateAction<Story[]>>;
}

const AdminPage: React.FC<AdminPageProps> = ({ onBack, stories, setStories }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <AdminDashboard />;
      case 'posts': return <PostEditor stories={stories} setStories={setStories} />;
      case 'pages': return <PageBuilder />;
      case 'startups': return <StartupManager />;
      case 'monetization': return <MonetizationManager />;
      case 'newsletter': return <NewsletterManager />;
      case 'appearance': return <AppearanceSettings />;
      case 'settings': return <SettingsPanel />;
      default: return <div className="text-gray-400">Module under construction.</div>;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col lg:flex-row">
      <AdminSidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onBack={onBack} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      
      <div className="flex-1 lg:ml-64 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-white/10 bg-[#0a0a0a]">
          <h2 className="text-xl font-bold serif-title text-white">YouthStartup</h2>
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-gray-400 hover:text-white">
            <Menu className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-6xl mx-auto"
          >
            {renderContent()}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
