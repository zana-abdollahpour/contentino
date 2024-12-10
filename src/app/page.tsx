import Link from "next/link";

import SigninModal from "@/components/modal/signin-modal";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="relative h-[50dvh] bg-[url('/background.jpg')] bg-cover bg-center">
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-primary/25 to-primary dark:to-black"></div>

      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="text-center">
          <SigninModal />
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
