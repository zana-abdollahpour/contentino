"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SignInButton, useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";

import { Button } from "@/components/ui/button";
import { createCheckoutSession } from "@/actions/stripe";

interface PlanCardProps {
  name: "Free" | "Monthly";
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
  const [loading, setLoading] = useState(false);
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  const handleCheckout = async () => {
    if (name === "Free") {
      router.push("/dashboard");
      return;
    }

    setLoading(true);

    try {
      const { url, error } = await createCheckoutSession();

      if (error) {
        toast.error(error);
        return;
      }

      if (url) router.replace(url);
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occured. please try again later.");
    } finally {
      setLoading(false);
    }
  };

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
          <Button onClick={handleCheckout} disabled={loading} className="w-28">
            {loading ? (
              <>
                <span>Processing</span>
                <Loader className="animate-spin" />
              </>
            ) : name === "Monthly" ? (
              "Get Started"
            ) : (
              "Continue Free"
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
