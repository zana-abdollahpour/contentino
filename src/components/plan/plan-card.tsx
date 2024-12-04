"use client";

import Image from "next/image";
import { SignInButton, useUser } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

export default function PlanCard() {
  const { isSignedIn, isLoaded } = useUser();

  const handleCheckout = async () => {};

  return (
    <div className="m-4 max-w-sm overflow-hidden rounded-lg border shadow-lg">
      <Image
        width={100}
        height={100}
        className="m-5"
        src="/monthly-plan.png"
        alt="monthly plan"
      />

      <div className="px-6 py-4">
        <h1 className="mb-2 text-xl font-bold">Monthly Membership</h1>
        <p className="text-base text-gray-700 dark:text-gray-300">
          Enjoy unlimited AI generated content for just $9.99/month
        </p>

        <ul className="m-5">
          <li>✨ Unlimited word generation</li>
          <li>🧠 Advanced AI features</li>
          <li>⚡ Faster processing times</li>
          <li>🛠️ Priority customer support</li>
        </ul>
      </div>

      {!isLoaded ? null : !isSignedIn ? (
        <div className="px-5 pb-5">
          <Button>
            <SignInButton />
          </Button>
        </div>
      ) : (
        <div className="px-5 pb-5">
          <Button onClick={handleCheckout}>Get Started</Button>
        </div>
      )}
    </div>
  );
}
