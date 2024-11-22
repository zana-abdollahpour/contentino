"use client";

import Link from "next/link";
import Image from "next/image";
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
    <nav className="flex items-center justify-between p-2 shadow">
      <Link href="/">
        <Image alt="logo" src="/logo.svg" width={28} height={28} />
      </Link>
      <div className="flex items-center">
        {isSignedIn && (
          <Link
            className="mr-2"
            href="/dashboard"
          >{`${user.firstName}'s Dashboard`}</Link>
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
