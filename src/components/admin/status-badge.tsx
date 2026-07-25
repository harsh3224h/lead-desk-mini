import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: "NEW" | "CONTACTED" | "CLOSED";
}

export function StatusBadge({ status }: StatusBadgeProps) {
  switch (status) {
    case "NEW":
      return (
        <Badge
          variant="outline"
          className="bg-zinc-900 text-zinc-200 border-zinc-700 font-mono text-[11px] font-normal px-2 py-0.5"
        >
          NEW
        </Badge>
      );
    case "CONTACTED":
      return (
        <Badge
          variant="outline"
          className="bg-zinc-800 text-zinc-300 border-zinc-700 font-mono text-[11px] font-normal px-2 py-0.5"
        >
          CONTACTED
        </Badge>
      );
    case "CLOSED":
      return (
        <Badge
          variant="outline"
          className="bg-zinc-100 text-zinc-950 border-zinc-200 font-mono text-[11px] font-semibold px-2 py-0.5"
        >
          CLOSED
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="font-mono text-[11px]">
          {status}
        </Badge>
      );
  }
}
