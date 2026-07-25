"use client";

import { useState, useTransition, useEffect } from "react";
import { getLeads } from "@/lib/actions/leads";
import { StatusBadge } from "@/components/admin/status-badge";
import { StatusSelect } from "@/components/admin/status-select";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface Lead {
  id: string;
  name: string;
  email: string;
  budget: string;
  message: string;
  status: "NEW" | "CONTACTED" | "CLOSED";
  createdAt: Date;
  updatedAt: Date;
}

interface LeadsTableProps {
  initialLeads: Lead[];
}

export function LeadsTable({ initialLeads }: LeadsTableProps) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string>("ALL");
  const [isPending, startTransition] = useTransition();

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      startTransition(async () => {
        try {
          const statusParam = status === "ALL" ? undefined : status;
          const searchParam = search || undefined;
          const newLeads = await getLeads(searchParam, statusParam);
          setLeads(newLeads);
        } catch (error) {
          console.error("Failed to fetch leads", error);
        }
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [search, status]);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(date));
  };

  const truncate = (str: string, length: number) => {
    return str.length > length ? str.substring(0, length) + "..." : str;
  };

  return (
    <div className="space-y-4">
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
          <Input
            type="search"
            placeholder="Filter by name or email..."
            className="pl-9 h-9 bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-500 text-xs focus-visible:ring-zinc-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={status} onValueChange={(val) => setStatus(val ?? "ALL")}>
          <SelectTrigger className="w-full sm:w-[160px] h-9 bg-zinc-900 border-zinc-800 text-zinc-300 text-xs focus:ring-zinc-400">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-200">
            <SelectItem value="ALL" className="text-xs">All Statuses</SelectItem>
            <SelectItem value="NEW" className="text-xs">New</SelectItem>
            <SelectItem value="CONTACTED" className="text-xs">Contacted</SelectItem>
            <SelectItem value="CLOSED" className="text-xs">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table Container */}
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 overflow-hidden">
        {isPending && leads.length === 0 ? (
          <div className="p-6 flex flex-col gap-3">
            <Skeleton className="h-8 w-full bg-zinc-800/50" />
            <Skeleton className="h-14 w-full bg-zinc-800/50" />
            <Skeleton className="h-14 w-full bg-zinc-800/50" />
          </div>
        ) : leads.length === 0 ? (
          <div className="p-12 text-center text-xs text-zinc-500 font-mono">
            No lead records matching current query.
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <Table>
                <TableHeader className="bg-zinc-900/80 border-b border-zinc-800">
                  <TableRow className="hover:bg-transparent border-zinc-800">
                    <TableHead className="text-xs font-mono uppercase tracking-wider text-zinc-400">Name</TableHead>
                    <TableHead className="text-xs font-mono uppercase tracking-wider text-zinc-400">Email</TableHead>
                    <TableHead className="text-xs font-mono uppercase tracking-wider text-zinc-400">Budget</TableHead>
                    <TableHead className="text-xs font-mono uppercase tracking-wider text-zinc-400">Message</TableHead>
                    <TableHead className="text-xs font-mono uppercase tracking-wider text-zinc-400">Status</TableHead>
                    <TableHead className="text-xs font-mono uppercase tracking-wider text-zinc-400">Date</TableHead>
                    <TableHead className="text-xs font-mono uppercase tracking-wider text-zinc-400 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads.map((lead) => (
                    <TableRow key={lead.id} className="border-zinc-800/60 hover:bg-zinc-800/30 transition-colors">
                      <TableCell className="font-medium text-sm text-zinc-100">{lead.name}</TableCell>
                      <TableCell className="text-xs font-mono text-zinc-400">{lead.email}</TableCell>
                      <TableCell className="text-xs font-mono text-zinc-300">{lead.budget}</TableCell>
                      <TableCell className="max-w-[220px] text-xs text-zinc-400 truncate" title={lead.message}>
                        {truncate(lead.message, 45)}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={lead.status} />
                      </TableCell>
                      <TableCell className="text-xs font-mono text-zinc-500">
                        {formatDate(lead.createdAt)}
                      </TableCell>
                      <TableCell className="text-right">
                        <StatusSelect leadId={lead.id} currentStatus={lead.status} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {/* Mobile Cards */}
            <div className="grid grid-cols-1 gap-3 p-3 md:hidden">
              {leads.map((lead) => (
                <Card key={lead.id} className="bg-zinc-900 border-zinc-800 text-zinc-100">
                  <CardContent className="p-4 flex flex-col gap-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium text-sm">{lead.name}</div>
                        <div className="text-xs font-mono text-zinc-400">{lead.email}</div>
                      </div>
                      <StatusBadge status={lead.status} />
                    </div>
                    <div className="text-xs font-mono text-zinc-300">
                      Budget: {lead.budget}
                    </div>
                    <div className="text-xs text-zinc-400 line-clamp-2">
                      {lead.message}
                    </div>
                    <div className="flex items-center justify-between mt-1 pt-3 border-t border-zinc-800">
                      <div className="text-[11px] font-mono text-zinc-500">
                        {formatDate(lead.createdAt)}
                      </div>
                      <div className="w-28">
                        <StatusSelect leadId={lead.id} currentStatus={lead.status} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
