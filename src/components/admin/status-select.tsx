"use client";

import { useTransition } from "react";
import { updateLeadStatus } from "@/lib/actions/leads";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface StatusSelectProps {
  leadId: string;
  currentStatus: "NEW" | "CONTACTED" | "CLOSED";
  onStatusChange?: () => void;
}

export function StatusSelect({
  leadId,
  currentStatus,
  onStatusChange,
}: StatusSelectProps) {
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (newStatus: string | null) => {
    if (!newStatus || newStatus === currentStatus) return;

    startTransition(async () => {
      try {
        const result = await updateLeadStatus(
          leadId,
          newStatus as "NEW" | "CONTACTED" | "CLOSED"
        );
        if (result.success) {
          toast.success("Lead status updated");
          onStatusChange?.();
        } else {
          toast.error("Failed to update status");
        }
      } catch (error) {
        toast.error("An error occurred while updating status");
        console.error(error);
      }
    });
  };

  return (
    <div className="relative flex items-center justify-end">
      <Select
        defaultValue={currentStatus}
        onValueChange={handleStatusChange}
        disabled={isPending}
      >
        <SelectTrigger className="h-7 w-[120px] text-xs font-mono bg-zinc-950 border-zinc-800 text-zinc-300 focus:ring-zinc-500">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-200">
          <SelectItem value="NEW" className="text-xs font-mono focus:bg-zinc-800 focus:text-zinc-100">
            NEW
          </SelectItem>
          <SelectItem value="CONTACTED" className="text-xs font-mono focus:bg-zinc-800 focus:text-zinc-100">
            CONTACTED
          </SelectItem>
          <SelectItem value="CLOSED" className="text-xs font-mono focus:bg-zinc-800 focus:text-zinc-100">
            CLOSED
          </SelectItem>
        </SelectContent>
      </Select>
      {isPending && (
        <div className="absolute -right-5 flex items-center justify-center">
          <Loader2 className="h-3.5 w-3.5 animate-spin text-zinc-400" />
        </div>
      )}
    </div>
  );
}
