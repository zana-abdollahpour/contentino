"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

import { db } from "@/utils/db";
import Query, { type TQuery } from "@/models/query";

const apiKey = process.env.GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export async function runAI(prompt: string) {
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(prompt);
  return result.response.text();
}

export async function saveQuery(queryObject: TQuery) {
  try {
    await db();

    const newQuery = new Query({ ...queryObject });

    await newQuery.save();
    return { ok: true };
  } catch (err) {
    console.error(err);
    return { ok: false };
  }
}

export interface QueryResponse extends TQuery {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export async function getQueries(
  email: string,
  page: number,
  pageSize: number,
) {
  try {
    await db();

    const skip = (page - 1) * pageSize;
    const totalQueries = await Query.countDocuments({ email });

    const queries: QueryResponse[] = await Query.find({ email })
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 });

    return { queries, totalPages: Math.ceil(totalQueries / pageSize) };
  } catch (err) {
    console.error(err);
    return { ok: false };
  }
}
