
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { 
  LatestStoryCard, 
  FeaturedStoryCard, 
  SecondaryStoryCard, 
  MoreStoryCard 
} from './components/StoryCards';
import { TrendingWidget, FundingWidget } from './components/SidebarWidgets';
import Newsletter from './components/Newsletter';
import ArticlePage from './components/ArticlePage';
import AdminEditor from './components/AdminEditor';
import { Story } from './types';
import { 
  LATEST_STORIES, 
  FEATURED_STORY, 
  CENTER_SECONDARY_STORIES, 
  TRENDING_STARTUPS, 
  FUNDING_NEWS, 
  MORE_STORIES 
} from './constants';
import { Mail, MapPin, Send, Search, Filter, Lock } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState('HOME');
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [isAdminMode, setIsAdminMode] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedStory, view, isAdminMode]);

  const handleNavClick = (newView: string) => {
    setView(newView);
    setSelectedStory(null);
    setIsAdminMode(false);
  };

  const handleAdminClick = () => {
    setView('STAFF_LOGIN');
    setSelectedStory(null);
  };

  const renderHome = () => (
    <main className="max-w-screen-2xl mx-auto px-4 md:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <aside className="lg:col-span-3">
          <h5 className="text-[11px] font-bold uppercase tracking-[0.2em] mb-8 flex items-center gap-3 text-gray-400">
            The Latest
            <span className="h-px flex-grow bg-gray-200"></span>
          </h5>
          <div className="space-y-2">
            {LATEST_STORIES.map(story => (
              <LatestStoryCard key={story.id} story={story} onClick={setSelectedStory} />
            ))}
          </div>
        </aside>

        <div className="lg:col-span-6 lg:border-x border-gray-200 px-0 lg:px-10">
          {FEATURED_STORY && (
            <FeaturedStoryCard story={FEATURED_STORY} onClick={setSelectedStory} />
          )}
          <div className="mt-12 divide-y divide-gray-100">
            {CENTER_SECONDARY_STORIES.map(story => (
              <SecondaryStoryCard key={story.id} story={story} onClick={setSelectedStory} />
            ))}
          </div>
        </div>

        <aside className="lg:col-span-3 space-y-12">
          <TrendingWidget startups={TRENDING_STARTUPS} />
          {FUNDING_NEWS && <FundingWidget news={FUNDING_NEWS} />}
          <Newsletter />
        </aside>
      </div>

      <section className="mt-20 pt-16 border-t border-gray-300">
        <h5 className="text-[11px] font-bold uppercase tracking-[0.2em] mb-12 text-center text-gray-500">More from YouthStartups</h5>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {MORE_STORIES.map(story => (
            <MoreStoryCard key={story.id} story={story} onClick={setSelectedStory} />
          ))}
        </div>
      </section>
    </main>
  );

  const renderAbout = () => (
    <div className="max-w-4xl mx-auto px-4 py-24 text-center animate-in fade-in duration-700">
      <h1 className="text-5xl md:text-8xl font-bold serif-title mb-10 tracking-tight leading-[1.1]">Building India’s Next Generation of Founders</h1>
      <div className="w-20 h-1 bg-brand-accent mx-auto mb-16"></div>
      <p className="text-xl md:text-2xl font-light text-gray-700 mb-16 leading-relaxed italic border-l-4 border-brand-accent pl-8 text-left inline-block">
        YouthStartups.in is more than just a media platform. It is a digital archive of resilience, 
        a chronicle of ambition, and a resource for the relentless.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-left mt-24">
        <div>
          <h3 className="text-2xl font-bold serif-title mb-6">Our Mission</h3>
          <p className="text-base text-gray-600 leading-loose">
            To bridge the gap between aspirational ideas and operational reality by sharing the unvarnished stories 
            of real entrepreneurs. We focus on the "how" and the "why," not just the valuation. Our platform serves 
            as a mentor-in-print for those navigating the early stages of their venture.
          </p>
        </div>
        <div>
          <h3 className="text-2xl font-bold serif-title mb-6">Integrity First</h3>
          <p className="text-base text-gray-600 leading-loose">
            Every story we publish is fact-checked and verified. We believe in high-impact journalism 
            that serves the ecosystem rather than just chasing clicks. In a world of noise, we aim to 
            be the signal for serious entrepreneurs.
          </p>
        </div>
      </div>
      <div className="mt-24 p-16 bg-white border border-gray-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-2 h-full bg-brand-accent"></div>
        <h3 className="text-3xl font-bold serif-title mb-6">Have a story worth telling?</h3>
        <p className="text-gray-500 mb-8 max-w-lg mx-auto text-sm">We are always looking for authentic journeys of resilience, innovation, and impact within the Indian startup ecosystem.</p>
        <button 
          onClick={() => setView('SUBMIT_STORY')}
          className="bg-brand-dark text-white px-12 py-5 text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-brand-accent transition-all"
        >
          Submit Your Story
        </button>
      </div>
    </div>
  );

  const renderSubmit = () => (
    <div className="max-w-3xl mx-auto px-4 py-24 animate-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-bold serif-title mb-6">Share Your Journey</h1>
        <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-brand-accent">Join the elite list of India's startup founders</p>
      </div>
      <form className="bg-white p-10 md:p-16 border border-gray-200 shadow-2xl space-y-10" onSubmit={(e) => {e.preventDefault(); alert("Submission received! We'll be in touch."); setView('HOME');}}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Full Name</label>
            <input type="text" required className="w-full border-b border-gray-200 py-3 focus:border-brand-accent outline-none text-base transition-colors" placeholder="e.g. Rahul Sharma" />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Email Address</label>
            <input type="email" required className="w-full border-b border-gray-200 py-3 focus:border-brand-accent outline-none text-base transition-colors" placeholder="rahul@startup.in" />
          </div>
        </div>
        <div className="space-y-3">
          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Startup Name</label>
          <input type="text" required className="w-full border-b border-gray-200 py-3 focus:border-brand-accent outline-none text-base transition-colors" placeholder="The name of your venture" />
        </div>
        <div className="space-y-3">
          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Story Summary</label>
          <textarea required className="w-full border border-gray-200 p-6 focus:border-brand-accent outline-none text-base h-40 resize-none transition-colors leading-relaxed" placeholder="What makes your journey unique? Describe your biggest challenge and breakthrough..." />
        </div>
        <div className="flex items-start gap-4 p-4 bg-gray-50">
          <input type="checkbox" id="consent" required className="mt-1 w-4 h-4 accent-brand-accent" />
          <label htmlFor="consent" className="text-xs text-gray-500 leading-relaxed">I agree to the Terms and Conditions of editorial review and confirm all shared information is accurate.</label>
        </div>
        <button type="submit" className="w-full bg-brand-dark text-white py-6 text-[11px] font-bold uppercase tracking-[0.4em] hover:bg-brand-accent transition-all shadow-lg">
          Submit for Review
        </button>
      </form>
    </div>
  );

  const renderDirectory = () => (
    <div className="max-w-7xl mx-auto px-4 py-20 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
        <div>
          <h1 className="text-5xl md:text-7xl font-bold serif-title mb-6">Startup Directory</h1>
          <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-gray-400">A verified index of the Indian ecosystem</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-grow md:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" className="w-full bg-white border border-gray-200 py-3.5 pl-12 pr-4 text-xs outline-none focus:border-brand-accent transition-all" placeholder="Search startups..." />
          </div>
          <button className="bg-white border border-gray-200 px-6 py-3.5 text-[10px] font-bold uppercase tracking-widest flex items-center gap-3 hover:bg-gray-50 transition-colors">
            <Filter className="w-3.5 h-3.5" /> Filter
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {[1,2,3,4,5,6].map(i => (
          <div key={i} className="bg-white border border-gray-200 p-10 hover:shadow-2xl transition-all group cursor-pointer relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-brand-bg -mr-8 -mt-8 rotate-45 group-hover:bg-brand-accent transition-colors"></div>
            <div className="w-20 h-20 bg-brand-bg mb-8 flex items-center justify-center font-bold text-gray-300 rounded-sm">LOGO</div>
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-bold serif-title group-hover:text-brand-accent transition-colors">Startup Name {i}</h3>
              <span className="text-[9px] font-bold uppercase tracking-widest bg-brand-accent/10 text-brand-accent px-3 py-1.5 rounded-full">Series A</span>
            </div>
            <p className="text-sm text-gray-600 leading-loose mb-10">Innovative solution for the next generation of digital payments in regional Indian markets, focusing on Tier-2 connectivity.</p>
            <div className="flex items-center justify-between pt-8 border-t border-gray-100">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Fintech</span>
              <button className="text-[10px] font-bold uppercase tracking-[0.2em] underline underline-offset-8 decoration-brand-accent hover:text-brand-accent transition-colors">View Profile</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContact = () => (
    <div className="max-w-6xl mx-auto px-4 py-24 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
        <div>
          <h1 className="text-6xl font-bold serif-title mb-10 leading-tight">Get in Touch</h1>
          <p className="text-lg text-gray-600 mb-14 leading-relaxed font-light">
            Whether you are a founder with a story, an investor looking for insights, or a brand 
            aiming to reach India’s startup ecosystem, our doors are always open.
          </p>
          <div className="space-y-12">
            <div className="flex items-start gap-6 group">
              <div className="p-4 bg-white border border-gray-200 group-hover:border-brand-accent transition-colors"><Mail className="w-6 h-6 text-brand-accent" /></div>
              <div>
                <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-1">Email Us</h4>
                <a href="mailto:hello@youthstartups.in" className="text-lg font-semibold hover:text-brand-accent transition-colors">hello@youthstartups.in</a>
              </div>
            </div>
            <div className="flex items-start gap-6 group">
              <div className="p-4 bg-white border border-gray-200 group-hover:border-brand-accent transition-colors"><MapPin className="w-6 h-6 text-brand-accent" /></div>
              <div>
                <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-1">Editorial Office</h4>
                <p className="text-lg font-semibold">Indiranagar, Bengaluru, KA 560038</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-12 md:p-16 border border-gray-200 shadow-2xl relative">
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-brand-accent/5 -z-10"></div>
          <form className="space-y-8" onSubmit={(e) => {e.preventDefault(); alert("Message sent! We'll be in touch.");}}>
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Your Name</label>
              <input type="text" required className="w-full border-b border-gray-200 py-3 outline-none focus:border-brand-accent transition-colors text-base" />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Email Address</label>
              <input type="email" required className="w-full border-b border-gray-200 py-3 outline-none focus:border-brand-accent transition-colors text-base" />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Message</label>
              <textarea required className="w-full border-b border-gray-200 py-3 outline-none focus:border-brand-accent h-32 resize-none transition-colors text-base leading-relaxed" />
            </div>
            <button className="w-full bg-brand-dark text-white py-5 text-[11px] font-bold uppercase tracking-[0.4em] flex items-center justify-center gap-3 hover:bg-brand-accent transition-all shadow-xl">
              <Send className="w-4 h-4" /> Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  const renderStaffLogin = () => (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-20 bg-brand-bg">
      <div className="max-w-md w-full bg-white border border-gray-200 p-12 shadow-2xl animate-in zoom-in-95 duration-500">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-50 mb-6 border border-gray-100">
            <Lock className="w-8 h-8 text-brand-dark" />
          </div>
          <h2 className="text-3xl font-bold serif-title mb-2">Staff Portal</h2>
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Authorized Personnel Only</p>
        </div>
        <form className="space-y-6" onSubmit={(e) => {e.preventDefault(); setIsAdminMode(true);}}>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Email Address</label>
            <input type="email" required className="w-full border border-gray-200 px-4 py-3 outline-none focus:border-brand-dark text-sm" placeholder="staff@youthstartups.in" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Secure Password</label>
            <input type="password" required className="w-full border border-gray-200 px-4 py-3 outline-none focus:border-brand-dark text-sm" placeholder="••••••••" />
          </div>
          <button type="submit" className="w-full bg-brand-dark text-white py-4 text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-brand-accent transition-all">
            Access Dashboard
          </button>
        </form>
        <div className="mt-8 pt-8 border-t border-gray-100 text-center">
          <button onClick={() => setView('HOME')} className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-brand-dark">Back to Public Site</button>
        </div>
      </div>
    </div>
  );

  if (isAdminMode) {
    return (
      <div className="min-h-screen bg-gray-100 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <AdminEditor 
            onSave={(data) => {console.log(data); setIsAdminMode(false); setView('HOME');}} 
            onCancel={() => setIsAdminMode(false)} 
          />
        </div>
      </div>
    );
  }

  if (selectedStory) {
    return (
      <div className="min-h-screen bg-brand-bg">
        <Header onNavClick={handleNavClick} onAdminClick={handleAdminClick} />
        <ArticlePage story={selectedStory} onBack={() => setSelectedStory(null)} />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg font-sans selection:bg-brand-accent/30 text-brand-dark">
      <Header onNavClick={handleNavClick} onAdminClick={handleAdminClick} currentView={view} />
      
      {view === 'HOME' && renderHome()}
      {view === 'ABOUT' && renderAbout()}
      {view === 'SUBMIT_STORY' && renderSubmit()}
      {view === 'STARTUP_DIRECTORY' && renderDirectory()}
      {view === 'CONTACT' && renderContact()}
      {view === 'STAFF_LOGIN' && renderStaffLogin()}
      
      {(['FOUNDER_STORIES', 'FUNDING_NEWS', 'STUDENT_STARTUPS', 'SIDE_HUSTLES', 'TECH', 'STRATEGY'].includes(view)) && (
        <div className="max-w-screen-2xl mx-auto px-4 md:px-8 py-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold serif-title mb-6 tracking-tight uppercase leading-tight">
              {view.replace('_', ' ')}
            </h2>
            <div className="h-1 w-24 bg-brand-accent mx-auto mb-10"></div>
            <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-gray-400">Curated stories from our {view.toLowerCase().replace('_', ' ')} archives</p>
          </div>
          {renderHome()}
        </div>
      )}

      <Footer />
    </div>
  );
};

export default App;
