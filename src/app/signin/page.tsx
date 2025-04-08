'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    // Get stored credentials
    const storedEmail = localStorage.getItem('userEmail');
    const storedPassword = localStorage.getItem('userPassword');

    // Compare credentials
    if (email === storedEmail && password === storedPassword) {
      // Successful login
      localStorage.setItem('isLoggedIn', 'true');
      router.push('/'); // Redirect to home page
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <main className="min-h-screen py-12 px-4 bg-black">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-green-500 to-green-600 bg-clip-text text-transparent">
            Sign In
          </h1>
        </div>

        <div className="bg-gradient-to-b from-green-900/20 to-green-900/10 rounded-2xl p-8 backdrop-blur-sm border border-green-900/50 shadow-2xl shadow-green-900/20">
          <form onSubmit={handleSignIn} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg bg-black/50 border border-green-900/50 text-gray-100 p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg bg-black/50 border border-green-900/50 text-gray-100 p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="Enter your password"
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-500 text-white font-medium py-3 px-6 rounded-lg transition-all hover:shadow-lg hover:shadow-green-500/20 active:transform active:scale-95"
            >
              Sign In
            </button>

            <p className="text-center text-gray-400 text-sm">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="text-green-500 hover:text-green-400">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
