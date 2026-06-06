"use client";
import React from 'react'
import { useRouter } from 'next/navigation'
import { logoutAction } from '../actions/auth'

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logoutAction();
      // navigate to login after logout
      router.replace('/login');
      router.refresh(); // Refresh to update Navbar state 
    } catch (error) {
      console.error('Logout failed', error);
    }
  }

  return (
    <button
      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors cursor-pointer"
      onClick={handleLogout}
    >
      Logout
    </button> 
  )
}

export default LogoutButton
