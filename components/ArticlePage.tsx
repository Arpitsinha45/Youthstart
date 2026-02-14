
import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Story } from '../types';
import SocialShare from './SocialShare';

interface ArticlePageProps {
  story: Story;
  onBack: () => void;
}

const ArticlePage: React.FC<ArticlePageProps> = ({ story, onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <article className="max-w-4xl mx-auto px-4 py-12 md:py-20 animate-in fade-in duration-500">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-gray-500 hover:text-brand-dark mb-12 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Home
      </button>

      <div className="text-center mb-16">
        <div className="text-[11px] font-bold text-brand-accent uppercase tracking-[0.2em] mb-6">
          {story.category}
        </div>
        <h1 className="text-4xl md:text-6xl font-bold serif-title leading-tight mb-8">
          {story.title}
        </h1>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 border-y border-gray-200 py-6">
          <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-brand-dark">
            <span className="text-gray-400 font-medium">By</span>
            <span>{story.author}</span>
          </div>
          <div className="hidden md:block h-4 w-px bg-gray-300"></div>
          <div className="text-[11px] font-medium uppercase tracking-widest text-gray-500">
            {story.publishedAt} • {story.readTime} Read
          </div>
          <div className="hidden md:block h-4 w-px bg-gray-300"></div>
          <SocialShare title={story.title} />
        </div>
      </div>

      <div className="aspect-[16/9] w-full overflow-hidden mb-16">
        {/* Fixed: Use story.featuredImage instead of story.imageUrl */}
        <img 
          src={story.featuredImage} 
          alt={story.title} 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Fixed: Use story.excerpt instead of story.summary */}
        <p className="text-xl md:text-2xl font-light italic leading-relaxed text-gray-700 mb-12 serif-title border-l-2 border-brand-accent pl-8">
          {story.excerpt}
        </p>
        
        <div className="prose prose-lg text-gray-800 font-sans leading-relaxed space-y-8">
          <p>
            In the fast-paced world of modern entrepreneurship, stories like this serve as a beacon for the next generation. 
            Building a business is never just about the product; it's about the resilience of the founder and the 
            strength of the community they build around their vision.
          </p>
          <p>
            Across the ecosystem, we see a shift towards sustainable models and purpose-driven innovation. 
            The journey described here highlights the critical moments of doubt and the eventual breakthroughs 
            that define the startup experience. From initial ideation to the first major funding round, 
            every step is a lesson in adaptability.
          </p>
          <p className="font-bold text-xl">"The greatest risk is not taking any risk in a world that's changing really quickly."</p>
          <p>
            As we continue to track the progress of {story.author}'s highlighted ventures, 
            one thing remains clear: the barrier to entry has never been lower, yet the competition 
            for meaningful impact has never been higher.
          </p>
        </div>

        <div className="mt-20 pt-10 border-t border-gray-200 flex flex-col items-center">
          <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] mb-8 text-gray-400">End of Article</h4>
          <SocialShare title={story.title} className="mb-12" />
          
          <div className="bg-gray-100 w-full p-8 text-center">
            <h5 className="text-lg font-bold serif-title mb-4">Support Independent Startup Journalism</h5>
            <button className="bg-brand-dark text-white px-8 py-3 text-[11px] font-bold uppercase tracking-widest hover:bg-brand-accent transition-colors">
              Subscribe to Newsletter
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ArticlePage;