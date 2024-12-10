import PromoCard from "@/components/cards/promo-card";
import SigninModal from "@/components/modal/signin-modal";

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
      <div className="relative h-[50dvh] bg-[url('/background.jpg')] bg-cover bg-center p-16">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-transparent to-background" />

        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="text-center">
            <h1 className="mb-4 text-5xl font-bold text-white [text-shadow:_0_4px_8px_black] md:text-7xl">
              AI Content Generator
            </h1>
            <p className="mb-5 text-white [text-shadow:_0_4px_8px_black]">
              Generate AI content for your blog, website, or social media with a
              single click and more
            </p>
            <SigninModal />
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

      <footer className="py-4 text-center">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Contentino - AI Content Generator.
          All rights reserved.
        </p>
      </footer>
    </>
  );
}
