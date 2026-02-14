
import React from 'react';
import { TrendingStartup, FundingNews } from '../types';

export const TrendingWidget: React.FC<{ startups: TrendingStartup[] }> = ({ startups }) => (
  <div className="mb-12">
    <h5 className="text-[11px] font-bold uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
      Trending Startups
      <span className="h-px flex-grow bg-gray-300"></span>
    </h5>
    <div className="space-y-6">
      {startups.map((s) => (
        <div key={s.id} className="flex gap-4 group cursor-pointer">
          <span className="text-3xl font-light serif-title text-gray-300 leading-none">{s.rank}</span>
          <div>
            <h6 className="text-sm font-bold uppercase tracking-wider group-hover:text-brand-accent transition-colors">
              {s.name}
            </h6>
            <p className="text-xs text-gray-500 mt-1 line-clamp-1">{s.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const FundingWidget: React.FC<{ news: FundingNews }> = ({ news }) => (
  <div className="bg-white border border-gray-200 p-6">
    <h5 className="text-[10px] font-bold text-brand-accent uppercase tracking-widest mb-4">Latest Funding</h5>
    <div className="mb-4">
      <span className="text-2xl font-bold serif-title">{news.startup}</span>
      <span className="block text-sm text-gray-500 mt-1">{news.stage} • {news.investor}</span>
    </div>
    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
      <span className="text-xl font-bold text-brand-dark">{news.amount}</span>
      <button className="text-[10px] font-bold uppercase tracking-widest underline underline-offset-4 hover:text-brand-accent">Full story</button>
    </div>
  </div>
);
