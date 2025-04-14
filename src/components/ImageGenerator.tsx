'use client';

import { useState } from 'react';
import axios from 'axios';
import { Sparkles } from 'lucide-react';

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setIsLoading(true);
    setError('');
    setImageUrl('');

    try {
      const response = await axios.post('/api/generate', { prompt });
      setImageUrl(response.data.imageUrl);
    } catch (err) {
      setError('Failed to generate image. Please try again.');
      console.error('Error generating image:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!imageUrl) return;
    
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'generated-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-gradient-to-b from-green-900/20 to-green-900/10 rounded-2xl p-8 backdrop-blur-sm border border-green-900/50 shadow-2xl shadow-green-900/20">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="h-5 w-5 text-green-500" />
        <h2 className="text-xl font-semibold text-green-400">Generate Image</h2>
      </div>

      <div className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Describe your image
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full h-32 rounded-lg bg-black/50 border border-green-900/50 text-gray-100 p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              placeholder="A magical forest with bioluminescent plants..."
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 hover:bg-green-500 text-white font-medium py-3 px-6 rounded-lg transition-all hover:shadow-lg hover:shadow-green-500/20 active:transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Generating...' : 'Generate Image'}
          </button>
        </form>

        {error && (
          <div className="text-red-500 text-sm text-center">
            {error}
          </div>
        )}

        {isLoading && (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
          </div>
        )}

        {imageUrl ? (
          <div className="mt-8 space-y-4">
            <img
              src={imageUrl}
              alt="Generated image"
              className="w-full rounded-lg shadow-lg"
            />
            <button
              onClick={handleDownload}
              className="w-full bg-green-600/20 hover:bg-green-500/30 text-green-500 font-medium py-2 px-4 rounded-lg transition-all border border-green-500/30"
            >
              Download Image
            </button>
          </div>
        ) : (
          <div className="mt-8 p-4 rounded-lg bg-black/30 border border-green-900/30">
            <p className="text-gray-400 text-sm text-center">
              Your generated image will appear here
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
