"use client"

import React from 'react'
import Link from 'next/link'
import { ContactType } from '../_types/contact'
import DeleteButton from './DeleteButton'

type Props = {
  contacts: ContactType[]
}

export default function ContactList({ contacts }: Props) {
  

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {contacts.map((contact) => (
        <div key={contact.id} className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-gray-200">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{contact.name}</h2>
              <p className="text-sm text-gray-600">{contact.email}</p>
            </div>
              <div className="flex flex-col items-end gap-2">
              <Link href={`/contact/edit/${contact.id}`} className="text-sm font-medium text-blue-600 hover:underline">
                Edit
              </Link>
              <DeleteButton id={contact.id} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
