import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Newspaper, 
  Tag, 
  Calendar, 
  User, 
  Search, 
  Megaphone, 
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

export const Announcements = () => {
  const { announcements } = useApp();
  const [selectedCat, setSelectedCat] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Update', 'Event', 'Recruitment'];

  const filteredNews = announcements.filter(item => {
    const matchesCat = selectedCat === 'All' || item.category === selectedCat;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section className="py-16 bg-dark-900/60 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ems-red/10 border border-ems-red/30 text-ems-red text-xs font-semibold uppercase tracking-wider mb-3">
              <Megaphone className="w-3.5 h-3.5" />
              Official Directives & News
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-heading tracking-tight">
              ANNOUNCEMENTS & BULLETIN
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              Stay up-to-date with department updates, recruitment drives, and community events.
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Search announcements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-dark-850 text-white placeholder-slate-500 text-sm rounded-xl pl-10 pr-4 py-3 border border-white/10 focus:outline-none focus:border-ems-red"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                selectedCat === cat
                  ? 'bg-ems-red text-white shadow-glow-red font-bold'
                  : 'bg-dark-850 text-slate-300 hover:text-white border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((news) => (
            <div 
              key={news.id}
              className={`glass-panel p-6 rounded-2xl border transition-all flex flex-col justify-between hover:border-ems-red/50 ${
                news.important ? 'border-ems-red/40 bg-gradient-to-b from-ems-red/10 to-dark-850' : 'border-white/10'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    news.category === 'Recruitment' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                    news.category === 'Event' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                    'bg-ems-red/20 text-ems-red border border-ems-red/30'
                  }`}>
                    {news.category}
                  </span>

                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-ems-red" />
                    <span>{news.date}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white font-heading mb-3 line-clamp-2">
                  {news.title}
                </h3>

                <p className="text-slate-300 text-xs leading-relaxed mb-4">
                  {news.content}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-1.5 font-mono">
                  <User className="w-3.5 h-3.5 text-ems-red" />
                  <span>Posted by: {news.author}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
