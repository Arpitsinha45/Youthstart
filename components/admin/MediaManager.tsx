import React, { useEffect, useState } from 'react';
import { Upload, Trash2, Copy, Loader2 } from 'lucide-react';
import { getImages, uploadImage } from '../../lib/adminApi';
import { MediaItem } from '../../types';

export const MediaManager = () => {
  const [images, setImages] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const data = await getImages();
      setImages(data);
    } catch (error) {
      console.error("Failed to fetch images", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    setUploading(true);
    try {
      await uploadImage(file);
      await fetchImages(); // Refresh list
    } catch (error) {
      console.error("Failed to upload image", error);
      alert("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    alert("Copied to clipboard!");
  };

  if (loading) return <div className="text-white">Loading media...</div>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold serif-title mb-2">Media Library</h1>
          <p className="text-gray-400">Manage uploaded images and assets.</p>
        </div>
        <label className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg font-bold text-sm hover:bg-gray-200 transition-colors cursor-pointer">
          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
          {uploading ? 'Uploading...' : 'Upload Image'}
          <input type="file" className="hidden" accept="image/*" onChange={handleUpload} disabled={uploading} />
        </label>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {images.map((image) => (
          <div key={image.id} className="group relative aspect-square bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            <img src={image.url} alt={image.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button 
                onClick={() => copyToClipboard(image.url)}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white"
                title="Copy URL"
              >
                <Copy className="w-4 h-4" />
              </button>
              {/* Delete functionality would go here if implemented in API */}
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/80 text-[10px] truncate text-gray-400">
              {image.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
