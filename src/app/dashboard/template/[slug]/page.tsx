"use client";

import Image from "next/image";

import { templates } from "@/utils/templates";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface TemplatePageProps {
  params: { slug: string };
}

export default function TemplatePage({ params: { slug } }: TemplatePageProps) {
  const curTemplate = templates.find((t) => t.slug === slug)!;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    e.preventDefault();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="grid grid-cols-1 gap-5 px-5 md:grid-cols-3">
      <div className="col-span-1 rounded-md border bg-slate-100 p-5 dark:bg-slate-900">
        <div className="flex flex-col gap-3">
          <Image
            src={curTemplate.icon}
            alt={curTemplate.name}
            width={50}
            height={50}
          />
          <h2 className="text-lg font-medium">{curTemplate.name}</h2>
          <p className="text-gray-500">{curTemplate.desc}</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6">
          {curTemplate?.form.map((template) => (
            <div className="my-2 mb-7 flex flex-col gap-2" key={template.name}>
              <label className="pb-5 font-bold">{template.label}</label>
              {template.field === "input" ? (
                <Input
                  name={template.name}
                  required={template.required}
                  onChange={handleChange}
                />
              ) : (
                <Textarea
                  name={template.name}
                  required={template.required}
                  onChange={handleChange}
                />
              )}
            </div>
          ))}
          <Button type="submit" className="w-full py-6">
            Generate Content
          </Button>
        </form>
      </div>
    </div>
  );
}
