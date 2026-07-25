import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, Inbox, PhoneCall, CheckCircle } from "lucide-react";

interface MetricsCardsProps {
  metrics: {
    total: number;
    new: number;
    contacted: number;
    closed: number;
  };
}

export function MetricsCards({ metrics }: MetricsCardsProps) {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {/* Total Leads */}
      <Card className="bg-zinc-900/60 border-zinc-800 text-zinc-100">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs font-mono uppercase tracking-wider text-zinc-400">
            Total Leads
          </CardTitle>
          <div className="h-7 w-7 rounded border border-zinc-800 bg-zinc-950 flex items-center justify-center text-zinc-300">
            <Users className="h-3.5 w-3.5" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold font-mono">{metrics.total}</div>
          <p className="text-xs text-zinc-500 mt-1">
            All registered submissions
          </p>
        </CardContent>
      </Card>

      {/* New Leads */}
      <Card className="bg-zinc-900/60 border-zinc-800 text-zinc-100">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs font-mono uppercase tracking-wider text-zinc-400">
            New
          </CardTitle>
          <div className="h-7 w-7 rounded border border-zinc-800 bg-zinc-950 flex items-center justify-center text-zinc-300">
            <Inbox className="h-3.5 w-3.5" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold font-mono">{metrics.new}</div>
          <p className="text-xs text-zinc-500 mt-1">
            Pending review
          </p>
        </CardContent>
      </Card>

      {/* Contacted */}
      <Card className="bg-zinc-900/60 border-zinc-800 text-zinc-100">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs font-mono uppercase tracking-wider text-zinc-400">
            Contacted
          </CardTitle>
          <div className="h-7 w-7 rounded border border-zinc-800 bg-zinc-950 flex items-center justify-center text-zinc-300">
            <PhoneCall className="h-3.5 w-3.5" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold font-mono">{metrics.contacted}</div>
          <p className="text-xs text-zinc-500 mt-1">
            Active engagement
          </p>
        </CardContent>
      </Card>

      {/* Closed */}
      <Card className="bg-zinc-900/60 border-zinc-800 text-zinc-100">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs font-mono uppercase tracking-wider text-zinc-400">
            Closed
          </CardTitle>
          <div className="h-7 w-7 rounded border border-zinc-800 bg-zinc-950 flex items-center justify-center text-zinc-300">
            <CheckCircle className="h-3.5 w-3.5" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold font-mono">{metrics.closed}</div>
          <p className="text-xs text-zinc-500 mt-1">
            Completed inquiries
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
