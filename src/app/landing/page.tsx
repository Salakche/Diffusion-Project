'use client';

import Link from 'next/link';
import { Wand2, Image, Brush, Sparkles } from 'lucide-react';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/20 to-transparent z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 relative z-10">
          <div className="text-center">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-green-400 via-green-500 to-green-600 bg-clip-text text-transparent animate-gradient pb-2">
              Windsurf AI
            </h1>
            <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
              Transform your imagination into stunning visuals with our AI-powered image generation and editing tools.
            </p>
            <div className="mt-10">
              <Link 
                href="/signin" 
                className="inline-block bg-green-600 hover:bg-green-500 text-white font-medium py-3 px-8 rounded-lg transition-all hover:shadow-lg hover:shadow-green-500/20 text-lg"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white">Powerful AI Features</h2>
            <p className="mt-4 text-xl text-gray-400">Explore what our platform can do for you</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-b from-green-900/20 to-green-900/10 rounded-2xl p-8 backdrop-blur-sm border border-green-900/50 shadow-2xl shadow-green-900/20">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-green-600 rounded-full">
                  <Wand2 className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-white text-center">AI Image Generation</h3>
              <p className="mt-4 text-gray-400 text-center">
                Create stunning images from text descriptions using state-of-the-art AI models.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-b from-green-900/20 to-green-900/10 rounded-2xl p-8 backdrop-blur-sm border border-green-900/50 shadow-2xl shadow-green-900/20">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-green-600 rounded-full">
                  <Brush className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-white text-center">Image Inpainting</h3>
              <p className="mt-4 text-gray-400 text-center">
                Seamlessly edit and modify images by painting over areas you want to change.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-b from-green-900/20 to-green-900/10 rounded-2xl p-8 backdrop-blur-sm border border-green-900/50 shadow-2xl shadow-green-900/20">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-green-600 rounded-full">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-white text-center">Stability AI Integration</h3>
              <p className="mt-4 text-gray-400 text-center">
                Powered by Stability AI's cutting-edge models for the highest quality results.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white">How It Works</h2>
            <p className="mt-4 text-xl text-gray-400">Simple steps to create amazing images</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-600 text-white text-2xl font-bold mb-4">1</div>
              <h3 className="text-xl font-semibold text-white">Sign In</h3>
              <p className="mt-2 text-gray-400">Create an account or sign in to access all features</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-600 text-white text-2xl font-bold mb-4">2</div>
              <h3 className="text-xl font-semibold text-white">Describe or Upload</h3>
              <p className="mt-2 text-gray-400">Enter a text prompt or upload an image to edit</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-600 text-white text-2xl font-bold mb-4">3</div>
              <h3 className="text-xl font-semibold text-white">Generate & Download</h3>
              <p className="mt-2 text-gray-400">Get your AI-generated results and download them</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-b from-green-900/20 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white">Ready to Get Started?</h2>
          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
            Join thousands of creators using our AI tools to bring their ideas to life.
          </p>
          <div className="mt-10">
            <Link 
              href="/signin" 
              className="inline-block bg-green-600 hover:bg-green-500 text-white font-medium py-3 px-8 rounded-lg transition-all hover:shadow-lg hover:shadow-green-500/20 text-lg"
            >
              Sign In Now
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500">© 2025 Windsurf AI. Powered by Stability AI.</p>
        </div>
      </footer>
    </main>
  );
}
