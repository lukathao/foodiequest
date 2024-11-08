// "use server";

// // import { db } from "@/db/drizzle";
// // import { plans } from "@/db/schema";
// import { z } from "zod";
// import { formSchema } from "./schema";
// import Anthropic from "@anthropic-ai/sdk";

// const anthropic = new Anthropic();
// // import OpenAI from "openai";

// export async function planTrip(formData: z.infer<typeof formSchema>) {
//   const { startDate, endDate, destination, activities, budget } = formData;

//   let prompt = `
//     I am planning a trip to ${destination} from ${startDate} to ${endDate} with a budget of ${budget}. 
//     Please generate a list called requirements of things I need to in order to get into the country.
//     Please generate a list called foods with url images of foods I should try without consideration to my budget. 
//     The list should have the url image inside an img tag and the name of the food in a p tag.
//     Please generate a list called tour guides. Their contact information should be in a p tag with the id contact_info. 
//     The website where you found their information should be in a separate p tag with the id site_info.
//     I also want to do the following activities: ${activities.join(", ")}. The activities should be a list of days with the activities for each day. Please consider my budget for the activities.
//     The result should be HTML lists separated as requirements, activities, foods, and guides.
//     Please format all the result as HTML.
//   `;

//   const msg = await anthropic.messages.create({
//     model: "claude-3-5-sonnet-20241022",
//     max_tokens: 1000,
//     temperature: 0,
//     system: "Respond with json.",
//     messages: [
//       {
//         "role": "user",
//         "content": [
//           {
//             "type": "text",
//             "text": prompt
//           }
//         ]
//       }
//     ]
//   })


//   console.log("msg");
//   console.log(msg);
//   const data = await msg.content;
//   // const data = await response.choices[0].message;
//   console.log("data");
//   console.log(data);
//   try {
//     // if (data.error) {
//     //   console.log("Error");
//     //   if (data.error.type === 'insufficient_quota') {
//     //     console.log("Insufficient Quote. Increase quota for usage.");
//     //     console.log(data.error);
//     //   }
//     // }
//   } catch (error) {
//     console.log(error);
//   }
//   console.log(data);

//   // const [plan] = await db
//   //   .insert(plans)
//   //   .values({
//   //     text: data.choices[0].message.content,
//   //     userId: user?.id,
//   //     budget,
//   //     startDate: startDate.toISOString(),
//   //     endDate: endDate.toISOString(),
//   //   })
//   //   .returning();

//   // return plan.id;
// }