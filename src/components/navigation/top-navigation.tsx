"use client";

import Link from "next/link";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";

export default function TopNavigation() {
  const { isSignedIn, user } = useUser();

  return (
    <nav className="flex justify-between items-center p-2 shadow">
      <Link href="/">AI LOGO</Link>
      <div className="flex items-center">
        {isSignedIn && (
          <Link
            className="mr-2"
            href="/dashboard"
          >{`${user.fullName}'s Dashboard`}</Link>
        )}
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
