"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import Logo from "@/components/layout/Logo";

const Header = () => {
  const { data: session } = useSession();

  return (
    <header className="bg-gray-100 shadow-md">
      <div className="container mx-auto py-4 flex justify-between items-center">
        <Link href="/">
          <Logo />
        </Link>
        <nav className="flex space-x-4">
          <Link href="/goals">Goals</Link>
          <Link href="/progress">Progress</Link>
          {session ? (
            <>
              <span className="text-gray-500">{session.user.name}</span>
              <Link href="/profile">Profile</Link>
              <Link href="/api/auth/signout">Logout</Link>
            </>
          ) : (
            <Link href="/api/auth/signin">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;