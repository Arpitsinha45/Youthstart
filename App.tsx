
import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import ArticleGrid from './components/ArticleGrid';
import ArticlePage from './components/ArticlePage';
import CategoryPage from './components/CategoryPage';
import AuthorPage from './components/AuthorPage';
import AdminPage from './components/AdminPage';
import AboutPage from './components/AboutPage';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import { Story } from './types';
import { Home, TrendingUp, Cpu, Users, Search } from 'lucide-react';
import { AuthProvider, useAuth } from './lib/AuthContext';
import { getPosts } from './lib/api';

import { InteractiveMenu, InteractiveMenuItem } from './components/ui/modern-mobile-menu';

import { LATEST_STORIES } from './constants';

import { getGeminiClient } from './lib/gemini';

import ProtectedRoute from './components/ProtectedRoute';

const AppContent: React.FC = () => {
  const { user, loading, signIn } = useAuth();
  const [stories, setStories] = useState<Story[]>(LATEST_STORIES || []);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedAuthorId, setSelectedAuthorId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState<'home' | 'admin' | 'login' | 'about' | 'article'>('home');
  const [hasAIKey, setHasAIKey] = useState(false);

  useEffect(() => {
    // Check for Gemini API key availability
    const gemini = getGeminiClient();
    setHasAIKey(!!gemini);
  }, []);

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
    if (searchQuery) return 4; // If search is active, highlight search icon
    return 0; // Default to Home
  };

  const handleMobileMenuChange = (index: number, item: InteractiveMenuItem) => {
    if (item.label === 'Home') {
      handleCategorySelect(null);
    } else if (item.label === 'Search') {
      // For search, we might want to open the search bar or navigate to a search page
      // For now, let's just clear category and activate search mode if needed
      setSelectedCategory('Search Results');
      setSelectedStory(null);
      setSelectedAuthorId(null);
      setCurrentView('home');
      // Optionally, open the search input in the header if it's not already
      // setIsSearchOpen(true); // This would require passing setIsSearchOpen from AppContent to Header
    } else {
      handleCategorySelect(item.label);
    }
  };

  useEffect(() => {
    const fetchStories = async () => {
      setIsLoading(true);
      try {
        const fetchedStories = await getPosts();
        if (fetchedStories && fetchedStories.length > 0) {
          setStories(fetchedStories);
        } else {
          // Fallback to static data if Supabase is empty or fails
          setStories(LATEST_STORIES || []);
        }
      } catch (error) {
        console.error("Failed to fetch stories", error);
        setStories(LATEST_STORIES || []);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStories();
  }, []);

  useEffect(() => {
    // Ensure this only runs on the client side
    if (typeof window === 'undefined') return;

    const handleNavigation = () => {
      const path = window.location.pathname;
      if (path === '/admin') {
        setCurrentView('admin');
      } else if (path === '/about') {
        setCurrentView('about');
      } else if (path.startsWith('/article/')) {
        setCurrentView('article');
        setSelectedStory(null); 
      } else {
        setCurrentView('home');
        setSelectedStory(null);
      }
    };

    handleNavigation();
    window.addEventListener('popstate', handleNavigation);
    return () => window.removeEventListener('popstate', handleNavigation);
  }, [user]);

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
    setSelectedStory(null);
    setSelectedAuthorId(null);
    setSearchQuery('');
    setCurrentView('home');
    window.history.pushState({}, '', '/');
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      setSelectedCategory('Search Results');
      setSelectedStory(null);
      setSelectedAuthorId(null);
      setCurrentView('home');
    } else {
      setSelectedCategory(null);
    }
  };

  const handleStorySelect = (story: Story) => {
    setSelectedStory(story);
    setSelectedCategory(null);
    setSelectedAuthorId(null);
    setCurrentView('article');
    if (story.slug) {
      window.history.pushState({}, '', `/article/${story.slug}`);
    } else {
      // Fallback for old stories without slug
      window.history.pushState({}, '', `/article/${story.id}`);
    }
  };

  const handleAuthorSelect = (authorId: string) => {
    setSelectedAuthorId(authorId);
    setSelectedStory(null);
    setSelectedCategory(null);
    setCurrentView('home');
  };

  const handleAboutClick = () => {
    setCurrentView('about');
    window.history.pushState({}, '', '/about');
    setSelectedStory(null);
    setSelectedCategory(null);
    setSelectedAuthorId(null);
  };

  const toggleSidebarMinimize = () => {
    setIsSidebarMinimized(!isSidebarMinimized);
  };

  const handleLoginSuccess = () => {
    window.history.pushState({}, '', '/admin');
    setCurrentView('admin');
  };

  const handleAdminClick = () => {
    if (user) {
      setCurrentView('admin');
      window.history.pushState({}, '', '/admin');
    } else {
      signIn();
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>;
  }


  if (currentView === 'admin') {
    return (
      <AdminPage onBack={() => {
        window.history.pushState({}, '', '/');
        setCurrentView('home');
      }} posts={stories as any} setPosts={setStories as any} hasAIKey={hasAIKey} />
    );
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
          signIn={signIn}
          hasAIKey={hasAIKey}
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
          onAboutClick={handleAboutClick}
          onAdminClick={handleAdminClick}
          hasAIKey={hasAIKey}
        />

        {/* Content with top margin for fixed header */}
        <main className="mt-16 flex-grow flex flex-col pb-24 lg:pb-0">
          {currentView === 'about' ? (
            <AboutPage />
          ) : currentView === 'article' || selectedStory ? (
            <ArticlePage 
              story={selectedStory || undefined} 
              onBack={() => {
                setSelectedStory(null);
                setCurrentView('home');
                window.history.pushState({}, '', '/');
              }} 
              onStoryClick={handleStorySelect}
              onAuthorClick={handleAuthorSelect}
            />
          ) : selectedCategory ? (
            <CategoryPage 
              category={selectedCategory} 
              onStoryClick={handleStorySelect} 
              isLoading={isLoading}
              searchQuery={searchQuery}
              stories={stories}
            />
          ) : selectedAuthorId ? (
            <AuthorPage
              authorId={selectedAuthorId}
              onBack={() => setSelectedAuthorId(null)}
              onStoryClick={handleStorySelect}
              stories={stories}
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
        
        <Footer onAboutClick={handleAboutClick} />
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

import ErrorBoundary from './components/ErrorBoundary';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ErrorBoundary>
        <AppContent />
      </ErrorBoundary>
    </AuthProvider>
  );
};

export default App;
