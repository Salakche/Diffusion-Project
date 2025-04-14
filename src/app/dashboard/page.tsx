'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Wand2 } from 'lucide-react';
import axios from 'axios';
import ImageGenerator from '@/components/ImageGenerator';
import ImageInpainter from '@/components/ImageInpainter';

export default function Dashboard() {
  const router = useRouter();

  // Check authentication on initial load
  useEffect(() => {
    const checkAuth = () => {
      const isAuthenticated = sessionStorage.getItem('isAuthenticated');
      if (!isAuthenticated) {
        router.replace('/signin');
      }
    };

    checkAuth();
  }, [router]);

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 space-y-6">
          <div className="inline-block animate-bounce">
            <Wand2 className="h-12 w-12 text-green-500 mb-4" />
          </div>
          
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-400 via-green-500 to-green-600 bg-clip-text text-transparent animate-gradient pb-1">
            Welcome, Admin!
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
