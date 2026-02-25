import React from 'react';
import { DollarSign, CreditCard, Gift, BarChart } from 'lucide-react';

export const MonetizationManager = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold serif-title mb-2">Monetization Controls</h1>
          <p className="text-gray-400">Manage subscriptions, sponsorships, and ad placements.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg font-bold text-sm hover:bg-gray-200 transition-colors">
          <DollarSign className="w-4 h-4" />
          Add Revenue Stream
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-2 text-emerald-400">
            <BarChart className="w-5 h-5" />
            <h3 className="font-bold">Total MRR</h3>
          </div>
          <p className="text-4xl font-bold serif-title">$12,450</p>
          <p className="text-xs text-emerald-400 mt-2">+18% this month</p>
        </div>
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-2 text-emerald-400">
            <CreditCard className="w-5 h-5" />
            <h3 className="font-bold">Active Subs</h3>
          </div>
          <p className="text-4xl font-bold serif-title">1,245</p>
          <p className="text-xs text-gray-500 mt-2">Premium tier</p>
        </div>
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-2 text-emerald-400">
            <Gift className="w-5 h-5" />
            <h3 className="font-bold">Sponsorships</h3>
          </div>
          <p className="text-4xl font-bold serif-title">$4,200</p>
          <p className="text-xs text-gray-500 mt-2">This month</p>
        </div>
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-2 text-emerald-400">
            <DollarSign className="w-5 h-5" />
            <h3 className="font-bold">Ad Revenue</h3>
          </div>
          <p className="text-4xl font-bold serif-title">$850</p>
          <p className="text-xs text-gray-500 mt-2">This month</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
          <h2 className="text-xl font-bold serif-title border-b border-white/10 pb-4">Subscription Plans</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-black border border-white/10 rounded-xl">
              <div>
                <h4 className="font-bold">Free Tier</h4>
                <p className="text-xs text-gray-500">Access to limited articles</p>
              </div>
              <span className="font-bold">$0/mo</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-black border border-emerald-500/30 rounded-xl">
              <div>
                <h4 className="font-bold text-emerald-400">Pro Tier</h4>
                <p className="text-xs text-gray-500">Unlimited access + newsletter</p>
              </div>
              <span className="font-bold">$10/mo</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-black border border-white/10 rounded-xl">
              <div>
                <h4 className="font-bold">Team Tier</h4>
                <p className="text-xs text-gray-500">Up to 5 members</p>
              </div>
              <span className="font-bold">$40/mo</span>
            </div>
          </div>
          <button className="w-full py-2 border border-white/10 rounded-lg text-sm hover:bg-white/5 transition-colors">Manage Pricing Cards</button>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
          <h2 className="text-xl font-bold serif-title border-b border-white/10 pb-4">Sponsor Placements</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-black border border-white/10 rounded-xl">
              <div>
                <h4 className="font-bold">Newsletter Header</h4>
                <p className="text-xs text-gray-500">Available next week</p>
              </div>
              <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded text-xs">Active</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-black border border-white/10 rounded-xl">
              <div>
                <h4 className="font-bold">Homepage Banner</h4>
                <p className="text-xs text-gray-500">Currently: Stripe</p>
              </div>
              <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded text-xs">Active</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-black border border-white/10 rounded-xl">
              <div>
                <h4 className="font-bold">Article Sidebar</h4>
                <p className="text-xs text-gray-500">Available now</p>
              </div>
              <span className="px-2 py-1 bg-gray-500/20 text-gray-400 rounded text-xs">Inactive</span>
            </div>
          </div>
          <button className="w-full py-2 border border-white/10 rounded-lg text-sm hover:bg-white/5 transition-colors">Manage Ad Slots</button>
        </div>
      </div>
    </div>
  );
};
