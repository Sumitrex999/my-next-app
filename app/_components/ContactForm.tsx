"use client"

import React, { useActionState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ContactType } from '../_types/contact'
import { initialContactFormState, type ContactFormState } from '../_types/contact-form-state'
import { useRouter } from 'next/navigation'

type Props = {
  title: string
  submitLabel: string
  backHref: string
  action: (state: ContactFormState, formData: FormData) => Promise<ContactFormState>
  contact?: ContactType | null
}

export default function ContactForm({ title, submitLabel, backHref, action, contact }: Props) {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement | null>(null)
  const [state, formAction, pending] = useActionState(action, initialContactFormState)

  useEffect(() => {
    if (!state.success) return

    formRef.current?.reset()
    router.refresh()
    router.push(backHref)
  }, [state.success, backHref, router])

  return (
    <div className="mx-auto max-w-xl rounded-lg bg-white p-8 shadow-md">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">{title}</h1>
        <Link href={backHref} className="text-sm text-blue-600 hover:underline">Back to contacts</Link>
      </div>

      {state.message ? (
        <div className={`mb-4 rounded-md px-4 py-3 text-sm ${state.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {state.message}
        </div>
      ) : null}

      <form ref={formRef} action={formAction} className="space-y-4">
        {contact?.id ? <input type="hidden" name="id" value={contact.id} /> : null}

        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            name="name"
            type="text"
            defaultValue={contact?.name ?? ''}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
          />
          {state.errors.name ? <p className="mt-1 text-sm text-red-600">{state.errors.name}</p> : null}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            name="email"
            type="email"
            defaultValue={contact?.email ?? ''}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
          />
          {state.errors.email ? <p className="mt-1 text-sm text-red-600">{state.errors.email}</p> : null}
        </div>

        {state.errors.form ? <p className="text-sm text-red-600">{state.errors.form}</p> : null}

        <button disabled={pending} type="submit" className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">
          {pending ? 'Saving...' : submitLabel}
        </button>
      </form>
    </div>
  )
}
