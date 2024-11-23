"use client";

import { useState } from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { Search } from "lucide-react";

import { templates } from "@/utils/templates";

export default function DashboardPage() {
  const [search, setSearch] = useState("");

  const filteredTempaltes = templates.filter((template) =>
    template.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <div className="mb-5 flex w-full flex-col items-center justify-center rounded-lg bg-secondary pb-5">
        <h1 className="mt-5 text-xl">What&apos;s on your mind?</h1>
        <div className="flex w-full max-w-[30rem] justify-center px-5">
          <div
            className={twMerge(
              "my-5 flex w-full items-center gap-2 rounded-md p-2 shadow-lg",
              "border border-gray-300 bg-transparent dark:border-gray-700",
            )}
          >
            <Search className="text-primary" />
            <input
              type="text"
              placeholder="Search Topics ..."
              className={twMerge(
                "w-full bg-transparent outline-none",
                "text-black placeholder-gray-500 dark:text-white dark:placeholder-gray-300",
              )}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filteredTempaltes.map((template) => (
          <div
            key={template.name}
            className={twMerge(
              "flex cursor-pointer flex-col gap-3 rounded-md border p-5 shadow-sm",
              "transition-all hover:scale-95 hover:rounded-lg hover:shadow-lg dark:shadow-secondary",
            )}
          >
            <Image
              src={template.icon}
              alt={template.name}
              width={50}
              height={50}
            />
            <h2 className="text-lg font-medium">{template.name}</h2>
            <p className="line-clamp-3 text-gray-500">{template.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
