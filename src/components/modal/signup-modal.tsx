"use client";

import Link from "next/link";

import { useUsage } from "@/context/usage";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function SignupModal() {
  const { openModal, setOpenModal } = useUsage();

  return (
    <Dialog open={openModal} onOpenChange={() => setOpenModal((cur) => !cur)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>🚀 Unlock unlimited AI-powered content!</DialogTitle>
          <br />
          <DialogDescription>
            <p>
              You have reached the current limit of content generation with our
              AI. That&apos;s a alot of content you generated 😉.
            </p>
            <p>Upgrade your plan to continue your amazing journey!</p>

            <ul className="m-5">
              <li>✨ Unlimited word generation</li>
              <li>🧠 Advanced AI features</li>
              <li>⚡ Faster processing times</li>
              <li>🛠️ Priority customer support</li>
            </ul>

            <p>💡 Don&apos;t let your creativity hit a wall!</p>
            <p>upgrade now and let the ideas flow!</p>

            <div className="m-5 text-center">
              <Link href="/membership">
                <Button>Join Membership</Button>
              </Link>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
