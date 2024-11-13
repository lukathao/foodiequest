"use server";

import { z } from "zod";
import { formSchema } from "./schema";


export async function getOpenAiPrompt(prompt: string) {


  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4o-mini",
    }),
  });

  const data = await response.json();
  const content = data.choices[0].message.content;
  if (data.error) {
    console.log("Error");
    if (data.error.type === 'insufficient_quota') {
      const msg = "Insufficient Quote. Increase quota for usage.";
      console.log(data.error);
      throw new Error(msg);
    }
  }

  return content;
}