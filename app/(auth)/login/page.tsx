import LoginForm from '@/app/_components/LoginForm';
import Link from 'next/link';
import React from 'react'

const Loginpage = () => {
  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md ">
      <h1 className="text-2xl font-bold mb-6 ">Login</h1>
      <LoginForm />
      <p className="mt-4 text-center">Don&apos;t have an account ? <Link href="/register" className="text-blue-600 hover:underline">Register</Link></p>
    </div>
  )
}

export default Loginpage
