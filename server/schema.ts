import { z } from "zod";

export const formSchema = z.object({
  startDate: z.date(),
  endDate: z.date(),
  budget: z.number().nullable(),
  activities: z.array(z.string()).optional(),
  destination: z.string().min(1),
});