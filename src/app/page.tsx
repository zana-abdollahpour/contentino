import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="relative h-[50dvh] bg-[url('/background.jpg')] bg-cover bg-center">
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-primary/25 to-primary dark:to-black"></div>

      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="text-center">
          <div className="bg-transparen mx-auto mb-4 flex w-1/2 items-center justify-between rounded-full border border-slate-300 px-4 py-2 hover:bg-slate-700 hover:bg-opacity-50">
            <span className="text-slate-100"> Join free membership</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-500 text-slate-100">
              <ChevronRight />
            </span>
          </div>
          <h1 className="mb-4 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-7xl font-bold text-transparent text-white">
            AI Content Generator
          </h1>
          <p className="mb-5 text-white">
            Generate AI content for your blog, website, or social media with a
            single click and more
          </p>
          <Link href="/dashboard">
            <Button variant="outline">Get started</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
