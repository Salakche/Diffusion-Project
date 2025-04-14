'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Wand2, LogOut } from 'lucide-react';
import axios from 'axios';
import ImageGenerator from '@/components/ImageGenerator';
import ImageInpainter from '@/components/ImageInpainter';

export default function Dashboard() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<{ username: string; isAdmin: boolean } | null>(null);

  // Check authentication on initial load
  useEffect(() => {
    const checkAuth = () => {
      const isAuthenticated = sessionStorage.getItem('isAuthenticated');
      if (!isAuthenticated) {
        router.replace('/signin');
        return;
      }

      // Get current user
      const userStr = sessionStorage.getItem('currentUser');
      if (userStr) {
        setCurrentUser(JSON.parse(userStr));
      }
    };

    checkAuth();
  }, [router]);
  
  const handleLogout = () => {
    sessionStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('currentUser');
    router.replace('/signin');
  };

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header with user info and logout */}
        <div className="flex justify-end mb-8">
          <div className="flex items-center gap-4">
            <div className="text-gray-300">
              Signed in as <span className="text-green-400 font-medium">{currentUser?.username || 'User'}</span>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 bg-green-600/20 hover:bg-green-500/30 text-green-500 px-3 py-2 rounded-lg transition-all border border-green-500/30"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>

        <div className="text-center mb-16 space-y-6">
          <div className="inline-block animate-bounce">
            <Wand2 className="h-12 w-12 text-green-500 mb-4" />
          </div>
          
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-400 via-green-500 to-green-600 bg-clip-text text-transparent animate-gradient pb-1">
            Welcome, {currentUser?.username || 'User'}!
          </h1>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Transform your imagination into stunning visuals using Stability.ai
          </p>
        </div>

        {/* Image Generation Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Image Generation</h2>
          <ImageGenerator />
        </div>

        {/* Inpainting Section */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Image Inpainting</h2>
          <ImageInpainter />
        </div>
      </div>
    </main>
  );
}
