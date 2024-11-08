"use server";

// import { db } from "@/db/drizzle";
// import { plans } from "@/db/schema";
import { z } from "zod";
import { formSchema } from "./schema";
import path from "path";

import { parseHTML } from "./parser/openai-parser";
// import OpenAI from "openai";

export async function useOpenAiPrompt(formData: z.infer<typeof formSchema>) {
  const { startDate, endDate, destination, activities, budget } = formData;
  // const openAIClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  let prompt = `
    I am planning a trip to ${destination} from ${startDate} to ${endDate}`

  if (budget) {
    prompt += `
      with a budget of ${budget}. 
      `
  }

  prompt += `
    Please generate a list called foods with url images of foods I should try without any consideration to my budget.
    The list should have the url image inside an img tag and the name of the food in a p tag.
    The list of food should be wrapped inside a div with the class of foods.

    Please generate a list called requirements of things I need to in order to get into the country.
    The list of requirements should be wrapped inside a div with the class requirements.
    
    Please generate a list called tour guides. Their contact information should be in a p tag with the class contact_info. 
    The website where you found their information should be in a separate p tag with the class site_info.
    The list of tour guides should be wrapped inside a div with the class tour_guides.
    `
  if (activities) {
    prompt += `
    I also want to do the following activities: ${activities.join(", ")}. 
    The activities should be a list of days with the activities for each day. Please consider my budget for the activities.
    The list of activities should be wrapped inside a div with the class activities.
    `
  }

  prompt += `
    The result should be HTML lists separated as requirements, activities, foods, and guides.
    Please format all the result as HTML.
  `;

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


  // const user = await currentUser();

  // <li>
  //           <h2>Laap (Larb)</h2>
  //           <img src="https://upload.wikimedia.org/wikipedia/commons/1/1e/Laap%2C_Larb.jpg" alt="Laap (Larb)">
  //           <p>A traditional Lao minced meat salad, usually made with chicken, beef, or pork, flavored with fresh herbs and spices.</p>
  //       </li>
  //       <li>
  //           <h2>Som Tam (Papaya Salad)</h2>
  //           <img src="https://upload.wikimedia.org/wikipedia/commons/3/32/Som_tam.jpg" alt="Som Tam (Papaya Salad)">
  //           <p>A spicy salad made with shredded green papaya, tomatoes, peanuts, lime, and chili, typically served with sticky rice.</p>
  //       </li>

  // const [plan] = await db
  //   .insert(plans)
  //   .values({
  //     text: data.choices[0].message.content,
  //     userId: user?.id,
  //     budget,
  //     startDate: startDate.toISOString(),
  //     endDate: endDate.toISOString(),
  //   })
  //   .returning();

  // return plan.id;
}