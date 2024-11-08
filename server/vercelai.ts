// import { openai } from "@ai-sdk/openai";
import { createAnthropic } from '@ai-sdk/anthropic';
import { generateText } from "ai";
import { z } from "zod";
import { formSchema } from "./schema";

export async function planTrip(formData: z.infer<typeof formSchema>) {
  console.log("Using vercel ai");
  const { startDate, endDate, destination, activities, budget } = formData;

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
    The list of food should be wrapped inside a div with the id of foods.

    Please generate a list called requirements of things I need to in order to get into the country.
    The list of requirements should be wrapped inside a div with the id requirements.
    
    Please generate a list called tour guides. Their contact information should be in a p tag with the id contact_info. 
    The website where you found their information should be in a separate p tag with the id site_info.
    The list of tour guides should be wrapped inside a div with the id tour_guides.
    `
  if (activities) {
    prompt += `
    I also want to do the following activities: ${activities.join(", ")}. 
    The activities should be a list of days with the activities for each day. Please consider my budget for the activities.
    The list of activities should be wrapped inside a div with the id activities.
    `
  }

  prompt += `
    The result should be HTML lists separated as requirements, activities, foods, and guides.
    Please format all the result as HTML.
  `;

  console.log(process.env.ANTHROPIC_API_KEY);
  const anthropic = createAnthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
    // headers: [{"Access-Control-Allow-Origin" : "*"},{"Access-Control-Allow-Methods" : "GET,DELETE,PATCH,POST,PUT"}]

    // [
    //   {key: "Access-Control-Allow-Origin", value: "*" },

    // ]
  });

  console.log(prompt);
  const result = await generateText({
    model: anthropic('claude-3-haiku-20240307'),
    prompt: prompt,
  });

  console.log(result.text);
}