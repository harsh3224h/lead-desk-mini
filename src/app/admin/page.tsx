import { Suspense } from "react";
import { getLeadMetrics, getLeads } from "@/lib/actions/leads";
import { MetricsCards } from "@/components/admin/metrics-cards";
import { LeadsTable } from "@/components/admin/leads-table";
import { Skeleton } from "@/components/ui/skeleton";

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const [metrics, leads] = await Promise.all([
    getLeadMetrics(),
    getLeads()
  ]);

  return (
    <div className="flex flex-col space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Lead Management Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Manage your incoming leads and track conversions.
        </p>
      </div>

      <Suspense fallback={<MetricsCardsSkeleton />}>
        <MetricsCards metrics={metrics} />
      </Suspense>

      <Suspense fallback={<div className="h-[400px] w-full rounded-md border p-8"><Skeleton className="h-full w-full" /></div>}>
        <LeadsTable initialLeads={leads} />
      </Suspense>
    </div>
  );
}

function MetricsCardsSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-32 w-full rounded-xl" />
      ))}
    </div>
  );
}
