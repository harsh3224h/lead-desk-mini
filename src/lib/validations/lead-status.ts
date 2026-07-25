import { z } from "zod";

export const updateLeadStatusSchema = z.object({
  id: z.string().cuid(),
  status: z.enum(["NEW", "CONTACTED", "CLOSED"]),
});

export type UpdateLeadStatusData = z.infer<typeof updateLeadStatusSchema>;
