"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function SigninModal() {
  const { openSignIn } = useClerk();

  const { user } = useUser();
  const router = useRouter();

  const handleClick = () => {
    if (user) router.push("/dashboard");
    else openSignIn();
  };

  return (
    <Button className="bg-[#422a4e] dark:bg-[#e374ff]" onClick={handleClick}>
      Get started
    </Button>
  );
}
