import React from 'react';
import { Mail, Users, Send, Download } from 'lucide-react';

export const NewsletterManager = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold serif-title mb-2">Newsletter System</h1>
          <p className="text-gray-400">Manage subscribers, campaigns, and email templates.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5 transition-colors text-sm flex items-center gap-2">
            <Download className="w-4 h-4" /> Export List
          </button>
          <button className="px-4 py-2 rounded-lg bg-white text-black hover:bg-gray-200 transition-colors text-sm font-bold flex items-center gap-2">
            <Send className="w-4 h-4" /> New Campaign
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-2 text-emerald-400">
            <Users className="w-5 h-5" />
            <h3 className="font-bold">Total Subscribers</h3>
          </div>
          <p className="text-4xl font-bold serif-title">54,230</p>
          <p className="text-xs text-gray-500 mt-2">+1,204 this month</p>
        </div>
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-2 text-emerald-400">
            <Mail className="w-5 h-5" />
            <h3 className="font-bold">Avg. Open Rate</h3>
          </div>
          <p className="text-4xl font-bold serif-title">42.8%</p>
          <p className="text-xs text-gray-500 mt-2">Industry avg: 21%</p>
        </div>
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-2 text-emerald-400">
            <Send className="w-5 h-5" />
            <h3 className="font-bold">Campaigns Sent</h3>
          </div>
          <p className="text-4xl font-bold serif-title">124</p>
          <p className="text-xs text-gray-500 mt-2">Last sent 2 days ago</p>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-x-auto">
        <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h3 className="font-bold">Recent Subscribers</h3>
          <input type="text" placeholder="Search emails..." className="w-full sm:w-auto bg-black border border-white/10 rounded-lg p-2 text-sm focus:outline-none focus:border-white/30" />
        </div>
        <table className="w-full text-left text-sm min-w-[500px]">
          <thead className="bg-white/5 border-b border-white/10 text-gray-400">
            <tr>
              <th className="p-4 font-medium">Email</th>
              <th className="p-4 font-medium">Subscribed Date</th>
              <th className="p-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {[1, 2, 3, 4, 5].map((i) => (
              <tr key={i} className="hover:bg-white/5 transition-colors">
                <td className="p-4 font-medium text-white">founder{i}@startup.com</td>
                <td className="p-4 text-gray-400">Oct 24, 2023</td>
                <td className="p-4"><span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded text-xs">Active</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
