"use client";

import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

import { runAI } from "@/actions/ai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function GenAIPage() {
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const prompt = useRef<string>("");

  const handleRunAI = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await runAI(prompt.current);
      setAiResponse(data);
    } catch (err) {
      if (err instanceof Error) console.error(err.message);
      else console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="m-5 p-5">
      <form onSubmit={handleRunAI}>
        <Input
          className="mb-5"
          placeholder="What's on your mind?"
          onChange={(e) => (prompt.current = e.target.value.trim())}
        />
        {/* TODO: add better loading indicator like spinner */}
        <Button type="submit">
          {loading ? "loading..." : "Generate with AI"}
        </Button>
      </form>

      <Card className="mt-5">
        <CardHeader>AI Response</CardHeader>
        <CardContent>
          {/* TODO: add better loading indicator like spinner */}
          {loading ? (
            <div>loading...</div>
          ) : (
            <ReactMarkdown>{aiResponse}</ReactMarkdown>
          )}
        </CardContent>
      </Card>
    </main>
  );
}