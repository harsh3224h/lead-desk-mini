"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Send, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  leadFormSchema,
  type LeadFormData,
  budgetOptions,
} from "@/lib/validations/lead";
import { createLead } from "@/lib/actions/leads";

export function LeadForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      name: "",
      email: "",
      budget: undefined,
      message: "",
    },
  });

  async function onSubmit(data: LeadFormData) {
    const result = await createLead(data);

    if (result.success) {
      toast.success(result.message);
      reset();
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 5000);
    } else {
      toast.error(result.message);
    }
  }

  return (
    <div className="relative">
      {/* Success state banner */}
      {isSubmitted && (
        <div className="mb-6 flex items-center gap-3 rounded-lg border border-zinc-700 bg-zinc-800/80 p-4 text-zinc-100">
          <CheckCircle2 className="h-5 w-5 text-zinc-300 shrink-0" />
          <div>
            <p className="text-sm font-medium">Inquiry Submitted Successfully</p>
            <p className="text-xs text-zinc-400">Our team will review your inquiry shortly.</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Name Field */}
        <div className="space-y-1.5">
          <Label
            htmlFor="name"
            className="text-xs font-medium text-zinc-300"
          >
            Full Name
          </Label>
          <Input
            id="name"
            placeholder="Jane Doe"
            className="h-10 bg-zinc-950 border-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-zinc-400 text-sm"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-xs text-red-400 mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-1.5">
          <Label
            htmlFor="email"
            className="text-xs font-medium text-zinc-300"
          >
            Work Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="jane@company.com"
            className="h-10 bg-zinc-950 border-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-zinc-400 text-sm"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-red-400 mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Budget Select */}
        <div className="space-y-1.5">
          <Label className="text-xs font-medium text-zinc-300">
            Estimated Budget
          </Label>
          <Select
            onValueChange={(value) =>
              setValue("budget", value as LeadFormData["budget"], {
                shouldValidate: true,
              })
            }
          >
            <SelectTrigger className="h-10 bg-zinc-950 border-zinc-800 text-zinc-100 focus:ring-zinc-400 text-sm">
              <SelectValue placeholder="Select budget range" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-100">
              {budgetOptions.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="focus:bg-zinc-800 focus:text-zinc-100 text-sm"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.budget && (
            <p className="text-xs text-red-400 mt-1">
              {errors.budget.message}
            </p>
          )}
        </div>

        {/* Message Textarea */}
        <div className="space-y-1.5">
          <Label
            htmlFor="message"
            className="text-xs font-medium text-zinc-300"
          >
            Project Details
          </Label>
          <Textarea
            id="message"
            placeholder="Provide a brief overview of goals, scope, and target timeframe..."
            className="min-h-[120px] bg-zinc-950 border-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-zinc-400 text-sm resize-none"
            {...register("message")}
          />
          {errors.message && (
            <p className="text-xs text-red-400 mt-1">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-10 text-sm font-medium bg-zinc-100 hover:bg-zinc-200 text-zinc-950 transition-colors cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              Submit Form
              <Send className="ml-2 h-3.5 w-3.5" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
