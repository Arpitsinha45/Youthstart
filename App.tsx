
import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import ArticleGrid from './components/ArticleGrid';
import ArticlePage from './components/ArticlePage';
import CategoryPage from './components/CategoryPage';
import AuthorPage from './components/AuthorPage';
import AdminPage from './components/AdminPage';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import { Story } from './types';
import { Home, TrendingUp, Cpu, Users, Search } from 'lucide-react';
import { AuthProvider } from './lib/AuthContext';

import { InteractiveMenu, InteractiveMenuItem } from './components/ui/modern-mobile-menu';

import { LATEST_STORIES } from './constants';

const AppContent: React.FC = () => {
  const [stories, setStories] = useState<Story[]>(LATEST_STORIES);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedAuthorId, setSelectedAuthorId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdminPage, setIsAdminPage] = useState(false);

  const mobileMenuItems: InteractiveMenuItem[] = [
    { label: 'Home', icon: Home },
    { label: 'Trending', icon: TrendingUp },
    { label: 'AI Tools', icon: Cpu },
    { label: 'Founders', icon: Users },
    { label: 'Search', icon: Search },
  ];

  const getActiveMobileMenuIndex = () => {
    if (selectedCategory === 'Trending') return 1;
    if (selectedCategory === 'AI Tools') return 2;
    if (selectedCategory === 'Founders') return 3;
    // Search is not implemented as a category yet, default to 0 if not matched
    return 0;
  };

  const handleMobileMenuChange = (index: number, item: InteractiveMenuItem) => {
    if (item.label === 'Home') {
      handleCategorySelect(null);
    } else if (item.label !== 'Search') {
      handleCategorySelect(item.label);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    // Simulate data fetching
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [selectedStory, selectedCategory, selectedAuthorId]);

  useEffect(() => {
    const path = window.location.pathname;
    setIsAdminPage(path === '/adminpage');
  }, [window.location.pathname]);

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
    setSelectedStory(null);
    setSelectedAuthorId(null);
    setSearchQuery('');
    setIsAdminPage(false);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      setSelectedCategory('Search Results');
      setSelectedStory(null);
      setSelectedAuthorId(null);
      setIsAdminPage(false);
    } else {
      setSelectedCategory(null);
    }
  };

  const handleStorySelect = (story: Story) => {
    setSelectedStory(story);
    setSelectedCategory(null);
    setSelectedAuthorId(null);
    setIsAdminPage(false);
  };

  const handleAuthorSelect = (authorId: string) => {
    setSelectedAuthorId(authorId);
    setSelectedStory(null);
    setSelectedCategory(null);
    setIsAdminPage(false);
  };

  const toggleSidebarMinimize = () => {
    setIsSidebarMinimized(!isSidebarMinimized);
  };

  if (isAdminPage) {
    return <AdminPage onBack={() => setIsAdminPage(false)} stories={stories} setStories={setStories} />;
  }

  return (
    <div className="min-h-screen bg-black text-white flex overflow-x-hidden">
      {/* Left Sidebar */}
      <div 
        className="hidden lg:block"
        onMouseEnter={() => setIsSidebarMinimized(false)}
        onMouseLeave={() => setIsSidebarMinimized(true)}
      >
        <Sidebar 
          onCategorySelect={handleCategorySelect} 
          onToggleMinimize={toggleSidebarMinimize}
          isMinimized={isSidebarMinimized}
          selectedCategory={selectedCategory}
        />
      </div>

      {/* Main Content Area */}
      <div className={`flex-grow flex flex-col transition-all duration-500 ${isSidebarMinimized ? 'ml-0 lg:ml-20' : 'ml-0 lg:ml-64'}`}>
        {/* Top Navigation */}
        <Header 
          onCategorySelect={handleCategorySelect} 
          isSidebarMinimized={isSidebarMinimized}
          onSearch={handleSearch}
          searchQuery={searchQuery}
        />

        {/* Content with top margin for fixed header */}
        <main className="mt-16 flex-grow flex flex-col pb-24 lg:pb-0">
          {selectedStory ? (
            <ArticlePage 
              story={selectedStory} 
              onBack={() => setSelectedStory(null)} 
              onStoryClick={handleStorySelect}
              onAuthorClick={handleAuthorSelect}
            />
          ) : selectedCategory ? (
            <CategoryPage 
              category={selectedCategory} 
              onStoryClick={handleStorySelect} 
              isLoading={isLoading}
              searchQuery={searchQuery}
            />
          ) : selectedAuthorId ? (
            <AuthorPage
              authorId={selectedAuthorId}
              onBack={() => setSelectedAuthorId(null)}
              onStoryClick={handleStorySelect}
            />
          ) : (
            <>
              {/* Hero Section */}
              <Hero onStoryClick={handleStorySelect} stories={stories} />

              {/* Article Grid Section */}
              <div className="flex-grow">
                <ArticleGrid onStoryClick={handleStorySelect} isLoading={isLoading} stories={stories} />
              </div>

              {/* Newsletter Section */}
              <Newsletter />
            </>
          )}
        </main>
        
        <Footer />
      </div>

      {/* Mobile Sticky Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 p-4 pb-6 bg-gradient-to-t from-black via-black/90 to-transparent pointer-events-none">
        <div className="pointer-events-auto">
          <InteractiveMenu 
            items={mobileMenuItems} 
            onChange={handleMobileMenuChange}
            defaultActiveIndex={getActiveMobileMenuIndex()}
          />
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
