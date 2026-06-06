"use server";

import { redirect } from "next/navigation";
import { setSession, deleteSession } from "../_lib/session";
import { UserType } from "../_types/user";

type LoginPayload = {
  email: string;
  password: string;
};

export const loginAction = async (formData: FormData) => {
  const emailRaw = formData.get("email");
  const passwordRaw = formData.get("password");

  if (!emailRaw || !passwordRaw || Array.isArray(emailRaw) || Array.isArray(passwordRaw)) {
    throw new Error("Email and password are required");
  }

  const payload: LoginPayload = {
    email: String(emailRaw),
    password: String(passwordRaw),
  };

  const response = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const data = await response.json().catch(() => null);

  if (!response.ok || !data?.ok) {
    throw new Error(data?.message || "Invalid credentials");
  }

  const user = data.user as UserType;
  await setSession(user);
  redirect("/contact");
};

export const logoutAction = async () => {
  await deleteSession();
  redirect("/login");
};
