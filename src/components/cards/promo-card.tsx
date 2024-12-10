import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface PromoCardProps {
  title: string;
  description: string;
  link: string;
}

export default function PromoCard({
  title,
  description,
  link,
}: PromoCardProps) {
  return (
    <Link href={link}>
      <div
        className={twMerge(
          "relative flex h-80 transform flex-col items-start rounded-lg border border-gray-600 p-6 transition-transform",
          "bg-opacity-80 bg-gradient-to-br from-[#2b0044] to-[#c340f0] shadow-lg hover:scale-105 hover:shadow-2xl",
        )}
      >
        <h3 className="mb-2 pt-10 text-lg font-semibold text-white">{title}</h3>
        <p className="mb-4 text-gray-300">{description}</p>
        <a href={link} className="text-blue-500 hover:underline">
          Learn more
        </a>
      </div>
    </Link>
  );
}
