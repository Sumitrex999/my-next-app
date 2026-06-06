import React from 'react'
import Link from 'next/link'
import { getSession } from '../_lib/session'
import { getContacts } from '../api/contacts'
import ContactList from '../_components/ContactList'
import { ContactType } from '../_types/contact'

const ContactPage = async () => {
  const user = await getSession();

  if (!user) {
    return (
      <div className="rounded-lg bg-white p-8 shadow-md">
        <p className="text-gray-700">
          Please <Link href="/login" className="text-blue-600 hover:underline">login</Link> to view your contacts.
        </p>
      </div>
    );
  }

  const contacts = await getContacts(String(user.id));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Your Contacts</h1>
          <p className="mt-1 text-sm text-gray-600">Manage contacts from the local JSON file.</p>
        </div>
        <Link href="/contact/new" className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
          Add contact
        </Link>
      </div>

      {contacts.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center shadow-sm">
          <p className="text-lg font-semibold text-gray-800">No contact details yet.</p>
          <p className="mt-2 text-sm text-gray-600">
            Add a contact{' '}
            <Link href="/contact/new" className="text-blue-600 hover:underline">here</Link>
            {' '}to your contacts list.
          </p>
        </div>
      ) : (
        <ContactList contacts={contacts as ContactType[]} />
      )}
    </div>
  )
}

export default ContactPage
