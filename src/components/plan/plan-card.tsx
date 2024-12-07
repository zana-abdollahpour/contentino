"use client";

import Image from "next/image";
import { SignInButton, useUser } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

interface PlanCardProps {
  name: string;
  image: string;
  headingText: string;
  children: React.ReactNode;
}

export default function PlanCard({
  name,
  image,
  headingText,
  children,
}: PlanCardProps) {
  const { isSignedIn, isLoaded } = useUser();

  const handleCheckout = async () => {};

  return (
    <div className="m-4 flex max-w-sm flex-grow flex-col overflow-hidden rounded-lg border shadow-lg">
      <Image
        width={100}
        height={100}
        className="m-5"
        src={image}
        alt={`${name} plan`}
      />

      <div className="px-6 py-4">
        <h1 className="mb-2 text-xl font-bold">{name} Membership</h1>
        <p className="text-base text-gray-700 dark:text-gray-300">
          {headingText}
        </p>

        {children}
      </div>

      {!isLoaded ? null : !isSignedIn ? (
        <div className="px-5 pb-5">
          <Button>
            <SignInButton />
          </Button>
        </div>
      ) : (
        <div className="mt-auto px-5 pb-5">
          <Button onClick={handleCheckout}>Get Started</Button>
        </div>
      )}
    </div>
  );
}
