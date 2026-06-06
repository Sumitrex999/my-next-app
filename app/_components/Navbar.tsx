import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { getSession } from "../_lib/session";

const Navbar = async () => {
    // call the function and await its result
    const session = await getSession(); // session will be UserType or null>

    return (
        <nav className="bg-white shadow">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <Link href="/" className="font-bold">MyApp</Link>

                <div>
                    {session ? (
                        <div className="flex items-center gap-3">
                            <span className="text-sm">Hi, {session.name ?? session.email}</span>
                            {/* LogoutButton should be a client component */}
                            <LogoutButton />
                            
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link href="/login">Login</Link>
                            <Link href="/register">Register</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
