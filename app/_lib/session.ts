import { UserType } from "../_types/user";
import { cookies } from "next/headers";

// set session cookie or token after successful login
export const setSession = async (userId: UserType): Promise<void> => {
    const cookieStore = await cookies();
    cookieStore.set({
        name: "session",
        value: JSON.stringify(userId),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
    });
};

// get session cookie or token on subsequent requests to authenticate user
export const getSession = async (): Promise<UserType | null> => {
    const cookieStore = await cookies();
    const cookie = cookieStore.get("session");
    if (!cookie) return null;
    try {
        return JSON.parse(cookie.value) as UserType;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
        return null;
    }
};

// delete session cookie or token on logout
export const deleteSession = async (): Promise<void> => {
    const cookieStore = await cookies();
    // cookieStore.delete accepts the cookie name; path is not a second arg
    cookieStore.delete("session");
};