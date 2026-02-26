import React from 'react';
import { Story } from '../types';
import { ArrowRight, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { CategoryCardSkeleton, Skeleton } from './Skeleton';

interface CategoryPageProps {
  category: string;
  onStoryClick: (story: Story) => void;
  isLoading?: boolean;
  searchQuery?: string;
  stories: Story[];
}

const CategoryPage: React.FC<CategoryPageProps> = ({ category, onStoryClick, isLoading, searchQuery, stories }) => {
  const isSearch = category === 'Search Results';
  
  const filteredStories = stories.filter(story => {
    if (isSearch && searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        story.title.toLowerCase().includes(query) ||
        story.excerpt.toLowerCase().includes(query) ||
        story.category.toLowerCase().includes(query) ||
        story.author.toLowerCase().includes(query)
      );
    }
    
    return story.category.toLowerCase() === category.toLowerCase() || 
           category === 'Trending' || 
           category === 'News';
  });

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Category Header */}
      <div className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/20 to-black z-0" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 z-0" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 text-center px-6"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-12 h-px bg-emerald-500/50"></span>
            <span className="text-[11px] uppercase tracking-[0.4em] font-bold text-emerald-400">
              {isSearch ? 'Search' : 'Category'}
            </span>
            <span className="w-12 h-px bg-emerald-500/50"></span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold serif-title text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 tracking-tight">
            {isSearch ? `"${searchQuery}"` : category}
          </h1>
          {isSearch && (
            <p className="mt-6 text-gray-400 text-sm uppercase tracking-widest font-bold">
              Found {filteredStories.length} results
            </p>
          )}
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-16 md:py-24">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => <CategoryCardSkeleton key={i} />)}
          </div>
        ) : filteredStories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden">
            {filteredStories.map((story, index) => {
              // Create a varied grid layout
              const isLarge = index % 5 === 0; // Every 5th item is large
              const colSpan = isLarge ? 'col-span-1 md:col-span-12 lg:col-span-8' : 'col-span-1 md:col-span-6 lg:col-span-4';
              const heightClass = isLarge ? 'min-h-[400px] md:min-h-[500px]' : 'min-h-[350px] md:min-h-[400px]';

              return (
                <motion.div 
                  key={story.id} 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
                  className={`group cursor-pointer bg-black relative overflow-hidden hover:bg-white/5 transition-colors flex flex-col ${colSpan} ${heightClass}`}
                  onClick={() => onStoryClick(story)}
                >
                  {isLarge ? (
                    // Large Card Layout
                    <>
                      <img 
                        src={story.featuredImage} 
                        alt={story.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-1000"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
                      
                      <div className="relative z-10 p-8 md:p-12 flex flex-col justify-end h-full">
                        <div className="flex items-center gap-4 mb-6">
                          <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                            {story.category}
                          </span>
                          <span className="flex items-center gap-1 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                            <Clock className="w-3 h-3" /> {story.readTime}
                          </span>
                        </div>
                        <h3 className="text-3xl md:text-5xl font-bold serif-title leading-tight mb-4 group-hover:text-white text-gray-100 transition-colors max-w-3xl">
                          {story.title}
                        </h3>
                        <p className="text-sm md:text-base text-gray-400 line-clamp-2 max-w-2xl mb-8">
                          {story.excerpt}
                        </p>
                        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 duration-300">
                          Read Full Story <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </>
                  ) : (
                    // Standard Card Layout
                    <>
                      <div className="h-48 md:h-56 w-full overflow-hidden relative border-b border-white/10">
                        <img 
                          src={story.featuredImage} 
                          alt={story.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                      <div className="p-8 flex flex-col flex-grow justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-[9px] uppercase tracking-widest text-gray-500 font-bold group-hover:text-gray-300 transition-colors">
                              {story.category}
                            </span>
                            <span className="flex items-center gap-1 text-[9px] text-gray-600 font-bold uppercase tracking-widest">
                              <Clock className="w-3 h-3" /> {story.readTime}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold serif-title leading-snug mb-4 group-hover:text-white text-gray-200 transition-colors">
                            {story.title}
                          </h3>
                          <p className="text-xs text-gray-500 line-clamp-3 mb-6">
                            {story.excerpt}
                          </p>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                          <span className="text-[10px] font-bold text-gray-400 group-hover:text-white transition-colors">{story.author}</span>
                          <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="py-32 text-center border border-dashed border-white/20 rounded-2xl bg-white/5 backdrop-blur-sm">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">📰</span>
            </div>
            <h3 className="text-2xl font-bold serif-title mb-2">No Articles Yet</h3>
            <p className="text-gray-500 uppercase tracking-widest text-xs max-w-md mx-auto">We're still curating the best stories for this category. Check back soon.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
