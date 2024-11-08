"use server";
import path from "path";
import { z } from "zod";
import { parseHTML } from "../parser/openai-parser";
import { formSchema } from "../schema";
import fs from 'fs/promises';
import { useOpenAiPrompt } from "../openai";

export async function planTrip(formData: z.infer<typeof formSchema>) {
  try {
    let plan;
    let content;

    if (process.env.NODE_ENV === 'development') {
      const filePath = path.join(process.cwd(), 'public', 'temp.txt');
      content = await fs.readFile(filePath, 'utf-8');
    } else if (process.env.NODE_ENV === 'production') {
      // **CAREFUL: in production this will use AI tokens
      content = await useOpenAiPrompt(formData)
    }

    plan = parseHTML(content);
    return plan;

  } catch (error) {
    console.log(error);
  }
}
