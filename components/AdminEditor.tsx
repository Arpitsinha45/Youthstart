
import React, { useState, useCallback } from 'react';
import { Save, Image as ImageIcon, X, Eye, FileText, UploadCloud, Settings, ChevronDown, CheckCircle, Circle } from 'lucide-react';
import { Story } from '../types';

interface EditorProps {
  story?: Partial<Story>;
  onSave: (data: Partial<Story>) => void;
  onCancel: () => void;
}

const AdminEditor: React.FC<EditorProps> = ({ story, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: story?.title || '',
    slug: story?.slug || '',
    category: story?.category || 'Founder Stories',
    excerpt: story?.excerpt || '',
    content: story?.content || '',
    featuredImage: story?.featuredImage || '',
    published: story?.published ?? false,
    sponsored: story?.sponsored ?? false,
    featured: story?.featured ?? false,
    publishedAt: story?.publishedAt || '',
  });

  const [preview, setPreview] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (loadEvent) => {
          setFormData(prev => ({ ...prev, featuredImage: loadEvent.target?.result as string }));
        };
        reader.readAsDataURL(file);
      }
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  return (
    <div className="bg-zinc-900 rounded-lg shadow-xl overflow-hidden border border-zinc-800 text-white">
      <div className="flex items-center justify-between px-6 py-4 bg-zinc-950 border-b border-zinc-800">
        <h2 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 text-zinc-300">
          <FileText className="w-4 h-4 text-emerald-500" />
          {story?.id ? 'Edit Article' : 'New Article'}
        </h2>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setPreview(!preview)}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-widest text-zinc-400 hover:bg-zinc-800 rounded-md transition-colors"
          >
            {preview ? <FileText className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {preview ? 'Editor' : 'Preview'}
          </button>
          <button 
            onClick={onCancel}
            className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-white"
          >
            Cancel
          </button>
          <button 
            onClick={() => onSave(formData)}
            className="flex items-center gap-2 px-6 py-2 bg-emerald-600 text-white text-xs font-bold uppercase tracking-widest hover:bg-emerald-700 transition-colors rounded-md"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>

      <div className="p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          {!preview ? (
            <>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2">Article Title</label>
                <input 
                  type="text" name="title" value={formData.title} onChange={handleChange}
                  placeholder="Enter a compelling headline..."
                  className="w-full text-3xl serif-title font-bold bg-transparent border-b border-zinc-800 focus:border-emerald-500 outline-none py-2 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2">Short Excerpt</label>
                <textarea 
                  name="excerpt" value={formData.excerpt} onChange={handleChange}
                  rows={2}
                  className="w-full text-lg font-light italic bg-transparent border-b border-zinc-800 focus:border-emerald-500 outline-none py-2 resize-none transition-colors"
                  placeholder="Summarize the story in 2 sentences..."
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2">Content (Markdown Support)</label>
                <textarea 
                  name="content" value={formData.content} onChange={handleChange}
                  rows={20}
                  className="w-full font-mono text-sm bg-zinc-950 border border-zinc-800 p-4 focus:border-emerald-500 outline-none transition-colors rounded-md"
                  placeholder="Tell the story..."
                />
              </div>
            </>
          ) : (
            <div className="prose prose-invert max-w-none prose-lg">
              <h1 className="serif-title text-4xl mb-4">{formData.title}</h1>
              <p className="text-xl italic text-zinc-400 mb-8 border-l-4 border-emerald-500 pl-6">{formData.excerpt}</p>
              <div className="whitespace-pre-wrap font-sans text-zinc-300 leading-relaxed">
                {formData.content || 'No content yet...'}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div 
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${isDragging ? 'border-emerald-500 bg-emerald-900/20' : 'border-zinc-800 hover:border-zinc-700'}`}>
            <UploadCloud className="mx-auto h-10 w-10 text-zinc-500 mb-2" />
            <p className="text-xs text-zinc-400">Drag & drop an image or <span className="font-semibold text-emerald-500">browse</span></p>
            <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*" />
            {formData.featuredImage && (
              <img src={formData.featuredImage} className="mt-4 w-full aspect-video object-cover rounded-md border border-zinc-700" alt="Preview" />
            )}
          </div>

          <div className="bg-zinc-950/50 p-6 rounded-lg border border-zinc-800">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4 flex items-center gap-2"><Settings className="w-4 h-4"/> Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold">Category</label>
                <div className="relative">
                  <select name="category" value={formData.category} onChange={handleChange} className="text-xs bg-zinc-800 border border-zinc-700 p-2 rounded-md outline-none appearance-none pr-8">
                    <option>Founder Stories</option>
                    <option>Funding News</option>
                    <option>Tech</option>
                    <option>Student Startups</option>
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold">Slug</label>
                <input name="slug" value={formData.slug} onChange={handleChange} className="text-xs bg-zinc-800 border border-zinc-700 p-2 rounded-md outline-none w-40" />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold">Schedule</label>
                <input type="datetime-local" name="publishedAt" value={formData.publishedAt} onChange={handleChange} className="text-xs bg-zinc-800 border border-zinc-700 p-2 rounded-md outline-none w-40" />
              </div>
              <div className="pt-4 border-t border-zinc-800 space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" name="published" checked={formData.published} onChange={handleChange} className="hidden" />
                  {formData.published ? <CheckCircle className="w-4 h-4 text-emerald-500"/> : <Circle className="w-4 h-4 text-zinc-600"/>}
                  <span className="text-xs font-semibold">Published</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} className="hidden" />
                  {formData.featured ? <CheckCircle className="w-4 h-4 text-emerald-500"/> : <Circle className="w-4 h-4 text-zinc-600"/>}
                  <span className="text-xs font-semibold">Featured</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" name="sponsored" checked={formData.sponsored} onChange={handleChange} className="hidden" />
                  {formData.sponsored ? <CheckCircle className="w-4 h-4 text-emerald-500"/> : <Circle className="w-4 h-4 text-zinc-600"/>}
                  <span className="text-xs font-semibold text-emerald-500 uppercase">Sponsored</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEditor;
