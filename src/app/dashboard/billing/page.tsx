"use client";

import { useRouter } from "next/navigation";

import { createCustomerPortalSession } from "@/actions/stripe";
import { Button } from "@/components/ui/button";

export default function BillingPage() {
  const router = useRouter();

  const handleClick = async () => {
    const res = await createCustomerPortalSession();
    router.push(res!);
  };

  return (
    <div>
      <div className="mb-5 flex w-full flex-col items-center justify-center rounded-lg bg-secondary py-5">
        <h1 className="text-xl">Billing</h1>
        <p className="">Manage Your Subscription Plan</p>
      </div>

      <div className="p-5">
        <Button onClick={handleClick}>Access Stripe Customer Portal</Button>
      </div>
    </div>
  );
}
