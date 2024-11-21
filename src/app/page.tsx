"use client";

import { useState } from "react";

import { runAI } from "@/actions/ai";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRunAI = async () => {
    setLoading(true);
    try {
      const data = await runAI("write a one line admiration about an artist");
      setAiResponse(data);
    } catch (err) {
      if (err instanceof Error) console.error(err.message);
      else console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-4">
      <Button className="mb-4 p-4" type="button" onClick={handleRunAI}>
        Ask AI (Google Gemini)
      </Button>
      <hr />
      {loading ? <div>loading...</div> : <p>{aiResponse}</p>}
    </main>
  );
}
