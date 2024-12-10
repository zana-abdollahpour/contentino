import Link from "next/link";

import PromoCard from "@/components/cards/promo-card";
import SigninModal from "@/components/modal/signin-modal";
import { Button } from "@/components/ui/button";

const promoCards = [
  {
    title: "Extensive Template Library",
    description: "Choose from a wide range of templates for your content needs",
    link: "/dashboard",
  },
  {
    title: "SEO Optimized Content",
    description: "Get SEO optimized content for your blog or website",
    link: "/dashboard",
  },
  {
    title: "Social Media Posts",
    description: "Generate content for your social media posts",
    link: "/dashboard",
  },
  {
    title: "AI Content Generator",
    description:
      "Generate AI content for your blog, website, or social media with a single click",
    link: "/dashboard",
  },
];

export default function Home() {
  return (
    <>
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

      <div className="px-4 py-10">
        <div className="mx-auto">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
            {promoCards.map((card) => (
              <PromoCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
