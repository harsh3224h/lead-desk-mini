"use server";

import { db } from "@/lib/db";
import { leadFormSchema, type LeadFormData } from "@/lib/validations/lead";
import { updateLeadStatusSchema } from "@/lib/validations/lead-status";
import { revalidatePath } from "next/cache";
import type { LeadStatus } from "@/generated/prisma/enums";

export type ActionResult = {
  success: boolean;
  message: string;
};

export type LeadWithDates = {
  id: string;
  name: string;
  email: string;
  budget: string;
  message: string;
  status: LeadStatus;
  createdAt: Date;
  updatedAt: Date;
};

export type LeadMetrics = {
  total: number;
  new: number;
  contacted: number;
  closed: number;
};

export async function createLead(data: LeadFormData): Promise<ActionResult> {
  try {
    const validated = leadFormSchema.parse(data);

    await db.lead.create({
      data: {
        name: validated.name,
        email: validated.email,
        budget: validated.budget,
        message: validated.message,
        status: "NEW",
      },
    });

    revalidatePath("/admin");

    return {
      success: true,
      message: "Thank you! Your inquiry has been submitted successfully.",
    };
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return {
        success: false,
        message: "Invalid form data. Please check your inputs.",
      };
    }

    console.error("Failed to create lead:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}

export async function getLeads(
  search?: string,
  status?: string
): Promise<LeadWithDates[]> {
  try {
    const where: Record<string, unknown> = {};

    if (status && status !== "ALL") {
      where.status = status as LeadStatus;
    }

    if (search && search.trim().length > 0) {
      const searchTerm = search.trim();
      where.OR = [
        { name: { contains: searchTerm, mode: "insensitive" } },
        { email: { contains: searchTerm, mode: "insensitive" } },
      ];
    }

    const leads = await db.lead.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return leads;
  } catch (error) {
    console.error("Failed to fetch leads:", error);
    return [];
  }
}

export async function getLeadMetrics(): Promise<LeadMetrics> {
  try {
    const [total, newCount, contactedCount, closedCount] = await Promise.all([
      db.lead.count(),
      db.lead.count({ where: { status: "NEW" } }),
      db.lead.count({ where: { status: "CONTACTED" } }),
      db.lead.count({ where: { status: "CLOSED" } }),
    ]);

    return {
      total,
      new: newCount,
      contacted: contactedCount,
      closed: closedCount,
    };
  } catch (error) {
    console.error("Failed to fetch lead metrics:", error);
    return { total: 0, new: 0, contacted: 0, closed: 0 };
  }
}

export async function updateLeadStatus(
  id: string,
  status: "NEW" | "CONTACTED" | "CLOSED"
): Promise<ActionResult> {
  try {
    const validated = updateLeadStatusSchema.parse({ id, status });

    await db.lead.update({
      where: { id: validated.id },
      data: { status: validated.status },
    });

    revalidatePath("/admin");

    return {
      success: true,
      message: `Lead status updated to ${status.toLowerCase()}.`,
    };
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return {
        success: false,
        message: "Invalid data provided.",
      };
    }

    console.error("Failed to update lead status:", error);
    return {
      success: false,
      message: "Failed to update lead status. Please try again.",
    };
  }
}
