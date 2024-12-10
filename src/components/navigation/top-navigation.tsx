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

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/navigation/mode-toggle";
import { useUsage } from "@/context/usage";

export default function TopNavigation() {
  const { isSignedIn } = useUser();
  const { subscribed } = useUsage();

  return (
    <nav className="mb-2 flex items-center justify-between rounded-lg border px-5 py-2 shadow md:py-5">
      <Link href="/" className="flex items-center gap-1 md:gap-0">
        <Image
          alt="logo"
          src="/logo.svg"
          width={28}
          height={28}
          className="md:h-12 md:w-12"
        />
        <span className="hidden text-lg font-bold italic text-primary sm:inline md:text-3xl">
          Contentino
        </span>
      </Link>

      {!subscribed && (
        <Link href="/membership" className="hidden md:block">
          <Button variant="outline">🔥 Join free for $9.99/month</Button>
        </Link>
      )}

      <Link href="/gen-ai">
        <Button variant="outline">Generative AI</Button>
      </Link>

      <div className="flex items-center gap-2">
        <ModeToggle />

        {isSignedIn && (
          <Button variant="secondary" className="border border-primary/60">
            <Link className="mr-2" href="/dashboard">
              My Dashboard
            </Link>
          </Button>
        )}

        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox:
                  "md:h-12 md:w-12 border-2 border-primary/60",
              },
            }}
          />
        </SignedIn>
      </div>
    </nav>
  );
}
