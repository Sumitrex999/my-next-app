"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import { deleteContactAction } from '../actions/contacts'

type Props = {
  id: string | undefined
  label?: string
}

export default function DeleteButton({ id, label = 'Delete' }: Props) {
  const router = useRouter()

  const handleClick = async () => {
    if (!id) return
    const ok = confirm('Are you sure you want to delete this contact?')
    if (!ok) return

    try {
      const result = await deleteContactAction(id)
      if (result.ok) {
        router.refresh()
      } else {
        alert(result.message || 'Delete failed')
      }
    } catch (err) {
      console.error(err)
      alert('Delete failed')
    }
  }

  return (
    <button onClick={handleClick} className="text-sm text-red-600 hover:underline">
      {label}
    </button>
  )
}
