"use server";
import path from "path";
import { z } from "zod";
import { parseHTML } from "../parser/openai-parser";
import { formSchema } from "../schema";
import fs from 'fs/promises';
// import { useOpenAiPrompt } from "../openai";

export async function planTrip(formData: z.infer<typeof formSchema>) {
  try {
    // const content = useOpenAiPrompt(formData);
    // if (!content) {
    //   throw new Error("No content available.");

    const filePath = path.join(process.cwd(), 'public', 'temp.txt');
    const content = await fs.readFile(filePath, 'utf-8');
    return parseHTML(content);
  } catch (error) {
    console.log(error);
  }
}
