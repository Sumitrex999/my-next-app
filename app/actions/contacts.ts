"use server"

import { createContact, deteleContact, getContactsById, updateContact } from "../api/contacts";
import { getSession } from "../_lib/session";
import { ContactType } from "../_types/contact";
import type { ContactFormState } from "../_types/contact-form-state";

const readFormField = (formData: FormData, key: string) => String(formData.get(key) ?? "").trim();

export async function createContactAction(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const user = await getSession();

  if (!user) {
    return {
      success: false,
      message: "Please login to add contacts",
      errors: { form: "Please login to add contacts" },
    };
  }

  const name = readFormField(formData, "name");
  const email = readFormField(formData, "email");

  const errors: ContactFormState["errors"] = {};

  if (!name) errors.name = "Name is required";
  if (!email) errors.email = "Email is required";

  if (!name || !email) {
    return {
      success: false,
      message: "Please fix the missing fields",
      errors,
    };
  }

  await createContact({
    name,
    email,
    userID: String(user.id),
  });

  return {
    success: true,
    message: "Contact created successfully",
    errors: {},
  };
}

export async function updateContactAction(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const id = readFormField(formData, "id");
  const user = await getSession();

  if (!user) {
    return {
      success: false,
      message: "Please login to edit contacts",
      errors: { form: "Please login to edit contacts" },
    };
  }

  const existing = id ? await getContactsById(id) : null;
  const name = readFormField(formData, "name");
  const email = readFormField(formData, "email");

  if (!id || !existing) {
    return {
      success: false,
      message: "Contact not found",
      errors: { id: "Contact not found" },
    };
  }

  const errors: ContactFormState["errors"] = {};

  if (!name) errors.name = "Name is required";
  if (!email) errors.email = "Email is required";

  if (!name || !email) {
    return {
      success: false,
      message: "Please fix the missing fields",
      errors,
    };
  }

  await updateContact(id, {
    ...(existing as ContactType),
    name,
    email,
  });

  return {
    success: true,
    message: "Contact updated successfully",
    errors: {},
  };
}

export async function deleteContactAction(id: string) {
  try {
    const removed = await deteleContact(id);
    return { ok: !!removed };
  } catch (err) {
    console.error('deleteContactAction failed', err);
    return { ok: false, message: 'Server error' };
  }
}
