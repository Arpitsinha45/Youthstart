import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, ExternalLink, Star, Loader2, Save, X } from 'lucide-react';
import { getStartups, updateStartup, deleteStartup } from '../../lib/adminApi';
import { Startup } from '../../types';

export const StartupManager = () => {
  const [startups, setStartups] = useState<Startup[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingStartup, setEditingStartup] = useState<Startup | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchStartups();
  }, []);

  const fetchStartups = async () => {
    try {
      const data = await getStartups();
      setStartups(data);
    } catch (error) {
      console.error("Failed to fetch startups", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (startup: Startup) => {
    setEditingStartup(startup);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this startup?")) return;
    try {
      await deleteStartup(id);
      setStartups(prev => prev.filter(s => s.id !== id));
    } catch (error) {
      console.error("Failed to delete startup", error);
      alert("Failed to delete startup");
    }
  };

  const handleSave = async () => {
    if (!editingStartup) return;
    setIsSaving(true);
    try {
      await updateStartup(editingStartup.id, editingStartup);
      setStartups(prev => prev.map(s => s.id === editingStartup.id ? editingStartup : s));
      setEditingStartup(null);
    } catch (error) {
      console.error("Failed to update startup", error);
      alert("Failed to update startup");
    } finally {
      setIsSaving(false);
    }
  };

  const toggleFeatured = async (startup: Startup) => {
    try {
      const updated = await updateStartup(startup.id, { featured: !startup.featured });
      setStartups(prev => prev.map(s => s.id === startup.id ? { ...s, featured: !s.featured } : s));
    } catch (error) {
      console.error("Failed to toggle featured", error);
    }
  };

  if (loading) return <div className="text-white">Loading startups...</div>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold serif-title mb-2">Startup Hall of Fame</h1>
          <p className="text-gray-400">Manage featured startups, rankings, and directories.</p>
        </div>
        {/* Add Startup functionality can be implemented similarly to PostEditor */}
        <button className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg font-bold text-sm hover:bg-gray-200 transition-colors">
          <Plus className="w-4 h-4" />
          Add Startup
        </button>
      </div>

      {editingStartup && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#111] border border-white/10 rounded-2xl p-6 max-w-2xl w-full space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Edit Startup</h2>
              <button onClick={() => setEditingStartup(null)}><X className="w-5 h-5" /></button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Name</label>
                <input 
                  value={editingStartup.name} 
                  onChange={e => setEditingStartup({...editingStartup, name: e.target.value})}
                  className="w-full bg-black border border-white/10 rounded-lg p-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Founder</label>
                <input 
                  value={editingStartup.founder} 
                  onChange={e => setEditingStartup({...editingStartup, founder: e.target.value})}
                  className="w-full bg-black border border-white/10 rounded-lg p-2 text-sm"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-xs text-gray-500 mb-1">Description</label>
                <textarea 
                  value={editingStartup.description} 
                  onChange={e => setEditingStartup({...editingStartup, description: e.target.value})}
                  className="w-full bg-black border border-white/10 rounded-lg p-2 text-sm h-24"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Category</label>
                <input 
                  value={editingStartup.category} 
                  onChange={e => setEditingStartup({...editingStartup, category: e.target.value})}
                  className="w-full bg-black border border-white/10 rounded-lg p-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Website</label>
                <input 
                  value={editingStartup.website} 
                  onChange={e => setEditingStartup({...editingStartup, website: e.target.value})}
                  className="w-full bg-black border border-white/10 rounded-lg p-2 text-sm"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setEditingStartup(null)} className="px-4 py-2 rounded-lg border border-white/10 text-sm">Cancel</button>
              <button onClick={handleSave} disabled={isSaving} className="px-4 py-2 rounded-lg bg-white text-black text-sm font-bold flex items-center gap-2">
                {isSaving && <Loader2 className="w-3 h-3 animate-spin" />}
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {startups.map((startup) => (
          <div key={startup.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 relative group">
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <button 
                onClick={() => toggleFeatured(startup)}
                className={`p-1.5 rounded hover:bg-white/20 ${startup.featured ? 'text-yellow-400' : 'text-gray-400'}`}
                title="Toggle Featured"
              >
                <Star className={`w-4 h-4 ${startup.featured ? 'fill-current' : ''}`} />
              </button>
              <button onClick={() => handleEdit(startup)} className="p-1.5 bg-black/50 rounded hover:bg-white/20"><Edit2 className="w-4 h-4" /></button>
              <button onClick={() => handleDelete(startup.id)} className="p-1.5 bg-black/50 rounded hover:bg-red-500/50 text-red-400"><Trash2 className="w-4 h-4" /></button>
            </div>
            
            <div className="flex items-center gap-4 mb-4">
              {startup.logo ? (
                <img src={startup.logo} alt={startup.name} className="w-12 h-12 rounded-xl object-cover" />
              ) : (
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-gray-500" />
                </div>
              )}
              <div>
                <h3 className="font-bold text-lg">{startup.name}</h3>
                <p className="text-xs text-gray-500 uppercase tracking-widest">{startup.category}</p>
              </div>
            </div>
            
            <p className="text-sm text-gray-400 mb-6 line-clamp-2 h-10">
              {startup.description}
            </p>
            
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-[10px] text-white font-bold">
                  {startup.founder.charAt(0)}
                </div>
                <span className="text-xs text-gray-300">{startup.founder}</span>
              </div>
              {startup.featured && (
                <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">Featured</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
