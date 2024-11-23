import Image from "next/image";
import { twMerge } from "tailwind-merge";

import { templates } from "@/utils/templates";

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {templates.map((template) => (
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
  );
}
