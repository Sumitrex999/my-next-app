import React from 'react'
import { getSession } from '../../_lib/session';
import ContactForm from '../../_components/ContactForm';
import { createContactAction } from '../../actions/contacts';

const ContactPage = async () => {
  const user = await getSession();

  if (!user) {
    return (
      <div>
        please{' '}
        <a href="/login" className="text-blue-600 hover:underline">login</a>
        {' '}to view your contacts
      </div>
    );
  }

  return <ContactForm title="Add Contact" submitLabel="Save Contact" backHref="/contact" action={createContactAction} />;
}

export default ContactPage
