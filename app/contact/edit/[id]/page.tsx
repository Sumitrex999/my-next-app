import React from 'react'
import Link from 'next/link'
import { getContactsById } from '../../../api/contacts'
import { ContactType } from '../../../_types/contact'
import ContactForm from '../../../_components/ContactForm'
import { updateContactAction } from '../../../actions/contacts'

const EditContactPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const contact = await getContactsById(id);

  if (!contact) {
    return (
      <div className="rounded-lg bg-white p-8 shadow-md">
        <p className="text-gray-700">Contact not found.</p>
        <Link href="/contact" className="mt-4 inline-block text-blue-600 hover:underline">Back to contacts</Link>
      </div>
    );
  }

  return (
    <ContactForm
      title="Edit Contact"
      submitLabel="Update Contact"
      backHref="/contact"
      action={updateContactAction}
      contact={contact as ContactType}
    />
  )
}

export default EditContactPage
