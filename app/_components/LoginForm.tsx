"use client";
// This is a client component and now handles submission via fetch
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const contentType = res.headers.get('content-type') || '';
      const data = contentType.includes('application/json')
        ? await res.json().catch(() => null)
        : { message: await res.text().catch(() => '') };

      if (res.ok && data?.ok) {
        // Redirect to contact on success
        router.replace('/contact');
        router.refresh();
        return;
      }
      setError(data?.message || `Login failed (${res.status})`);
    } catch (err) {
      console.error('Login fetch error', err);
      setError(err instanceof Error ? err.message : 'Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-x-4">
        <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)} type="email" name="email" placeholder="Enter your email" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 sm-text-sm p-2"/>
        </div>
        <div className="mt-3">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input value={password} onChange={e => setPassword(e.target.value)} type="password" name="password" placeholder="Enter your password" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 sm-text-sm p-2"/>
        </div>
        {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
        <button disabled={loading} type="submit" className="mt-3 w-full flex justify-center border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 py-2 px-4 hover:bg-blue-700">{loading ? 'Signing in...' : 'Login'}</button>
    </form>
  )
}

export default LoginForm
