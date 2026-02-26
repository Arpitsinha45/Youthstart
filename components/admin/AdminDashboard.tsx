import React, { useEffect, useState } from 'react';
import { Users, FileText, Eye, TrendingUp, Briefcase, Send, Plus } from 'lucide-react';
import { getDashboardStats } from '@/lib/adminApi';

export const AdminDashboard = ({ setActiveTab }: { setActiveTab: (tab: string) => void }) => {
  const [stats, setStats] = useState({
    posts: 0,
    startups: 0,
    submissions: 0,
    featuredStartups: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const statCards = [
    { label: 'Total Posts', value: stats.posts, icon: FileText, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { label: 'Total Startups', value: stats.startups, icon: Briefcase, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: 'Pending Submissions', value: stats.submissions, icon: Send, color: 'text-amber-400', bg: 'bg-amber-500/10' },
    { label: 'Featured Startups', value: stats.featuredStartups, icon: TrendingUp, color: 'text-purple-400', bg: 'bg-purple-500/10' },
  ];

  if (loading) {
    return <div className="text-white">Loading dashboard stats...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold serif-title mb-2">Dashboard Overview</h1>
        <p className="text-gray-400">Welcome back. Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-full ${stat.bg} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
              <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
              <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-500" />
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button 
            onClick={() => setActiveTab('posts')}
            className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
              <Plus className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <div className="text-sm font-bold">New Post</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wider">Create article</div>
            </div>
          </button>
          <button 
            onClick={() => setActiveTab('media')}
            className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
              <Plus className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <div className="text-sm font-bold">Upload Media</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wider">Add images</div>
            </div>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white/5 border border-white/10 p-6 rounded-2xl h-96 flex flex-col justify-center items-center">
          <p className="text-gray-500 mb-4">Analytics Chart Integration</p>
          <div className="w-full h-full border border-dashed border-white/10 rounded-xl flex items-center justify-center">
             <span className="text-xs uppercase tracking-widest text-gray-600">Chart Area (Coming Soon)</span>
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
          <h3 className="text-lg font-bold mb-6">Recent Activity</h3>
          <div className="space-y-6">
            <div className="text-sm text-gray-500">Activity log coming soon...</div>
          </div>
        </div>
      </div>
    </div>
  );
};
