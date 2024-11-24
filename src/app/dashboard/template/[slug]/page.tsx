"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Loader } from "lucide-react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

import { runAI } from "@/actions/ai";
import { templates } from "@/utils/templates";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface TemplatePageProps {
  params: { slug: string };
}

export default function TemplatePage({ params: { slug } }: TemplatePageProps) {
  const [query, setQuery] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const editorRef = useRef<Editor | null>(null);

  useEffect(() => {
    if (!content || !editorRef.current) return;
    const editorInstance = editorRef.current.getInstance();
    editorInstance.setMarkdown(content);
  }, [content]);

  const curTemplate = templates.find((t) => t.slug === slug)!;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await runAI(`${curTemplate.aiPrompt}${query}`);
      setContent(data);
    } catch (err) {
      setContent("An error occured, please try again!");
      if (err instanceof Error) console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-y-5 px-5 md:grid-cols-3">
      <div className="col-span-1 rounded-md border bg-slate-100 p-5 dark:bg-slate-900 md:mr-5">
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
            <div className="mb-7 mt-2 flex flex-col gap-2" key={template.name}>
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
          <Button type="submit" className="w-full py-6" disabled={loading}>
            {loading ? (
              <Loader className="mr-2 animate-spin" />
            ) : (
              "Generate Content"
            )}
          </Button>
        </form>
      </div>

      <div className="col-span-2">
        <Editor
          ref={editorRef}
          initialValue="Generated content will be displayed here..."
          previewStyle="vertical"
          height="600px"
          initialEditType="wysiwyg"
          useCommandShortcut={true}
        />
      </div>
    </div>
  );
}