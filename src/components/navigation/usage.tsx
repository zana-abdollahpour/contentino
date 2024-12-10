"use client";

import Link from "next/link";
import { twMerge } from "tailwind-merge";

import { useUsage } from "@/context/usage";
import { Button } from "@/components/ui/button";
import { CREDITS } from "@/constants";

export default function Usage() {
  const { count } = useUsage();

  const percentage = (count / CREDITS) * 100;

  return (
    <div className="my-2">
      <div className="rounded-lg">
        <h2 className="font-medium">Credits</h2>
        <div className="mt-3 h-2 w-full rounded-full bg-primary">
          <div
            className={twMerge(
              "h2 rounded-full bg-slate-200",
              `w-[${percentage}%]`,
            )}
          />
        </div>
        <h3 className="my-2 text-xs md:text-sm">
          {CREDITS - count} / {CREDITS}
        </h3>
      </div>

      <Link href="/membership">
        <Button
          className="my-3 w-full bg-primary/30 hover:bg-primary/45"
          variant="outline"
        >
          Upgrade
        </Button>
      </Link>
    </div>
  );
}
