
import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Clock, User, Calendar, Twitter, Linkedin, Globe as WebsiteIcon } from 'lucide-react';
import { Story } from '../types';
import SocialShare from './SocialShare';
import { motion, useScroll, useSpring } from 'motion/react';
import { AUTHORS, LATEST_STORIES } from '../constants';
import { getPostBySlug } from '../lib/api';

interface ArticlePageProps {
  story?: Story;
  onBack: () => void;
  onStoryClick: (story: Story) => void;
  onAuthorClick: (authorId: string) => void;
}

const ArticlePage: React.FC<ArticlePageProps> = ({ story: initialStory, onBack, onStoryClick, onAuthorClick }) => {
  const [story, setStory] = useState<Story | undefined>(initialStory);
  const [loading, setLoading] = useState(!initialStory);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const loadStory = async () => {
      // Check if we have a slug in the URL path like /article/some-slug
      const pathParts = window.location.pathname.split('/');
      const articleIndex = pathParts.indexOf('article');
      
      if (articleIndex !== -1 && pathParts[articleIndex + 1]) {
        const slug = pathParts[articleIndex + 1];
        if (!initialStory || initialStory.slug !== slug) {
          setLoading(true);
          try {
            const fetchedStory = await getPostBySlug(slug);
            if (fetchedStory) {
              setStory(fetchedStory);
            }
          } catch (error) {
            console.error("Failed to load story", error);
          } finally {
            setLoading(false);
          }
        }
      } else {
        setLoading(false);
      }
    };

    loadStory();
    window.scrollTo(0, 0);
  }, [initialStory]);

  if (loading) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading article...</div>;
  }

  if (!story) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white gap-4">
        <p>Article not found.</p>
        <button onClick={onBack} className="text-emerald-500 hover:underline">Back to Home</button>
      </div>
    );
  }

  const author = AUTHORS.find(a => a.id === story.authorId) || {
    id: 'youthstartup',
    name: story.author || 'YouthStartup Team',
    role: 'Editor',
    avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=100',
    bio: 'Bringing you the latest stories from the startup world.',
    social: {
      twitter: 'https://twitter.com/youthstartup',
      linkedin: 'https://linkedin.com/company/youthstartup',
      website: 'https://youthstartup.com'
    }
  };

  const otherArticles = LATEST_STORIES.filter(s => s.authorId === story.authorId && s.id !== story.id).slice(0, 3);
  
  const relatedArticles = LATEST_STORIES.filter(s => s.id !== story.id && s.category === story.category).slice(0, 3);
  if (relatedArticles.length < 3) {
    const additionalArticles = LATEST_STORIES.filter(s => s.id !== story.id && s.category !== story.category).slice(0, 3 - relatedArticles.length);
    relatedArticles.push(...additionalArticles);
  }

  return (
    <article className="relative min-h-screen bg-black text-white">
      {/* Reading Progress Bar */}
      <motion.div 
        className="fixed top-16 left-0 right-0 h-1 bg-white origin-left z-50" 
        style={{ scaleX }} 
      />

      <div className="max-w-4xl mx-auto px-6 md:px-8 lg:px-12 py-12 md:py-20">
        <motion.button 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-gray-500 hover:text-white mb-12 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </motion.button>

        <header className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-6"
          >
            {story.category}
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold serif-title leading-[1.1] mb-10 tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400"
          >
            {story.title}
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-6 md:gap-8 py-6 border-y border-white/10 mb-12"
          >
            <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-white">
              <User className="w-4 h-4 text-emerald-500" />
              {story.authorId ? (
                <button onClick={() => onAuthorClick(story.authorId!)} className="hover:text-emerald-400 transition-colors">
                  <span>{author.name}</span>
                </button>
              ) : (
                <span>{story.author}</span>
              )}
            </div>
            <div className="w-1 h-1 rounded-full bg-white/30 hidden md:block"></div>
            <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-gray-400">
              <Calendar className="w-4 h-4" />
              <span>{story.publishedAt}</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-white/30 hidden md:block"></div>
            <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-gray-400">
              <Clock className="w-4 h-4" />
              <span>{story.readTime} Read</span>
            </div>
            <div className="hidden md:block w-px h-4 bg-white/10 mx-2"></div>
            <SocialShare title={story.title} />
          </motion.div>
        </header>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          className="relative aspect-[21/9] w-full overflow-hidden mb-16 md:mb-20 rounded-2xl shadow-2xl ring-1 ring-white/10"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
          <img 
            src={story.featuredImage} 
            alt={story.title} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <div className="max-w-[680px] mx-auto">
          {story.excerpt && (
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-xl md:text-2xl font-serif italic leading-relaxed text-gray-200 mb-16 pl-6 border-l-2 border-emerald-500"
            >
              {story.excerpt}
            </motion.p>
          )}
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-invert prose-lg md:prose-xl max-w-none 
              prose-headings:font-serif prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-white
              prose-p:text-gray-300 prose-p:leading-8 prose-p:mb-8
              prose-a:text-emerald-500 prose-a:no-underline hover:prose-a:underline
              prose-blockquote:border-l-emerald-500 prose-blockquote:bg-white/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
              prose-strong:text-white prose-strong:font-semibold
              prose-li:text-gray-300 prose-li:marker:text-emerald-500
              font-sans"
          >
            {/* Render content safely - in a real app use a markdown parser */}
            <div dangerouslySetInnerHTML={{ __html: story.content }} />
          </motion.div>

          {/* Author Section */}
          {author && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="mt-32 p-10 border border-white/10 rounded-3xl bg-gradient-to-b from-white/5 to-transparent shadow-2xl"
            >
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
                <img 
                  src={author.avatar} 
                  alt={author.name} 
                  className="w-24 h-24 rounded-full object-cover border-2 border-brand-border"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-grow">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold serif-title">{author.name}</h3>
                      <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">{author.role}</p>
                    </div>
                    <div className="flex items-center justify-center md:justify-end gap-4">
                      {author.social?.twitter && (
                        <a href={author.social.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
                          <Twitter className="w-4 h-4" />
                        </a>
                      )}
                      {author.social?.linkedin && (
                        <a href={author.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
                          <Linkedin className="w-4 h-4" />
                        </a>
                      )}
                      {author.social?.website && (
                        <a href={author.social.website} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
                          <WebsiteIcon className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    {author.bio}
                  </p>
                  
                  {otherArticles.length > 0 && (
                    <div className="pt-6 border-t border-brand-border">
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-4">More by {author.name}</h4>
                      <ul className="space-y-3">
                        {otherArticles.map(article => (
                          <li key={article.id}>
                            <button 
                              onClick={() => onStoryClick(article)}
                              className="text-sm text-white hover:text-gray-300 transition-colors text-left line-clamp-1"
                            >
                              {article.title}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-24 pt-12 border-t border-brand-border flex flex-col items-center"
          >
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] mb-8 text-gray-600">Share this insight</h4>
            <SocialShare title={story.title} className="mb-16" />
            
            <div className="bg-white/5 border border-brand-border w-full p-10 text-center rounded-2xl backdrop-blur-sm">
              <h5 className="text-2xl font-bold serif-title mb-4">Support Independent Startup Journalism</h5>
              <p className="text-gray-400 text-sm mb-8 max-w-sm mx-auto">Get the best of YouthStartup.in delivered straight to your inbox every morning.</p>
              <button className="bg-white text-black px-10 py-4 text-[11px] font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors rounded-full shadow-lg">
                Subscribe to Newsletter
              </button>
            </div>
          </motion.div>

          {/* Related Articles Section */}
          {relatedArticles.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-24 pt-12 border-t border-brand-border"
            >
              <h4 className="text-2xl font-bold serif-title mb-8">Related Articles</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((article, index) => (
                  <div 
                    key={article.id} 
                    className="group cursor-pointer border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-all bg-white/5 flex flex-col"
                    onClick={() => onStoryClick(article)}
                  >
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={article.featuredImage} 
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="p-5 flex-grow flex flex-col">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[9px] uppercase tracking-widest text-gray-500 font-bold">
                          {article.category}
                        </span>
                        <div className="flex items-center gap-1 text-[9px] text-gray-500 font-bold uppercase tracking-widest">
                          <Clock className="w-3 h-3" />
                          {article.readTime}
                        </div>
                      </div>
                      <h5 className="text-lg font-bold serif-title leading-snug mb-3 group-hover:text-white transition-colors line-clamp-2">
                        {article.title}
                      </h5>
                      <div className="mt-auto flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        Read Story <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </article>
  );
};

export default ArticlePage;