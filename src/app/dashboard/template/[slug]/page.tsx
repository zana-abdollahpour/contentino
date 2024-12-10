"use client";

import { useEffect, useRef, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { Loader, ArrowLeft, Copy } from "lucide-react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

import { runAI } from "@/actions/ai";
import { saveQuery } from "@/actions/ai";
import { templates } from "@/utils/templates";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUsage } from "@/context/usage";
import { CREDITS } from "@/constants";

interface TemplatePageProps {
  params: { slug: string };
}

export default function TemplatePage({ params: { slug } }: TemplatePageProps) {
  const [query, setQuery] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const editorRef = useRef<Editor | null>(null);

  const { fetchUsage, subscribed, count } = useUsage();
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress || "";

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

      await saveQuery({ template: curTemplate, email, query, content: data });
      fetchUsage();
    } catch (err) {
      setContent("An error occured, please try again!");
      if (err instanceof Error) console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!content || !editorRef.current || !navigator.clipboard) return;
    const editorInstance = editorRef.current.getInstance();
    const copiedMD = editorInstance.getMarkdown();

    try {
      await navigator.clipboard.writeText(copiedMD);
      toast.success("Content copied to clipboard");
    } catch (err) {
      if (err instanceof Error) toast.error(err.message);
      else console.error(err);
    }
  };

  return (
    <>
      <div className="mx-5 mb-5 flex justify-between">
        <Link href="/dashboard">
          <Button>
            <ArrowLeft />
            Go Back
          </Button>
        </Link>

        <Button
          onClick={handleCopy}
          disabled={!content}
          className="hidden gap-2 md:flex"
        >
          <Copy /> Copy
        </Button>
      </div>

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
              <div
                className="mb-7 mt-2 flex flex-col gap-2"
                key={template.name}
              >
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
            <Button
              type="submit"
              className="w-full py-6"
              disabled={loading || (!subscribed && count >= CREDITS)}
            >
              {loading ? (
                <Loader className="mr-2 animate-spin" />
              ) : subscribed || count < CREDITS ? (
                "Generate Content"
              ) : (
                "Subscribe to generate more content"
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
          <Button
            onClick={handleCopy}
            disabled={!content}
            className="mt-2 w-full py-2 md:hidden"
          >
            <Copy /> Copy
          </Button>
        </div>
      </div>
    </>
  );
}
