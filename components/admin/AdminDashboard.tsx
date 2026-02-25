import React from 'react';
import { Users, FileText, Eye, TrendingUp } from 'lucide-react';

export const AdminDashboard = () => {
  const stats = [
    { label: 'Total Views', value: '2.4M', change: '+12%', icon: Eye },
    { label: 'Active Subscribers', value: '54,230', change: '+5%', icon: Users },
    { label: 'Published Posts', value: '842', change: '+24', icon: FileText },
    { label: 'Revenue (MRR)', value: '$12,450', change: '+18%', icon: TrendingUp },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold serif-title mb-2">Dashboard Overview</h1>
        <p className="text-gray-400">Welcome back. Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-gray-300" />
                </div>
                <span className="text-emerald-400 text-sm font-bold">{stat.change}</span>
              </div>
              <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
              <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">{stat.label}</p>
            </div>
          );
        })}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white/5 border border-white/10 p-6 rounded-2xl h-96 flex flex-col justify-center items-center">
          <p className="text-gray-500 mb-4">Analytics Chart Integration</p>
          <div className="w-full h-full border border-dashed border-white/10 rounded-xl flex items-center justify-center">
             <span className="text-xs uppercase tracking-widest text-gray-600">Chart Area</span>
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
          <h3 className="text-lg font-bold mb-6">Recent Activity</h3>
          <div className="space-y-6">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="flex items-start gap-4 text-sm">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5"></div>
                <div>
                  <p className="text-gray-300">New post published</p>
                  <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
