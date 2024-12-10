"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";

export default function SigninModal() {
  const { openSignIn } = useClerk();

  const { user } = useUser();
  const router = useRouter();

  const handleClick = () => {
    if (user) router.push("/dashboard");
    else openSignIn();
  };

  return (
    <div
      onClick={handleClick}
      className="bg-transparen mx-auto mb-4 flex w-1/2 items-center justify-between rounded-full border border-slate-300 px-4 py-2 hover:bg-slate-700 hover:bg-opacity-50"
    >
      <span className="text-slate-100">Let&apos;s generate some content!</span>
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-500 text-slate-100">
        <ChevronRight />
      </span>
    </div>
  );
}
