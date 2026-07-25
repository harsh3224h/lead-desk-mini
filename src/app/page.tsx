import Link from "next/link";
import { ArrowRight, ShieldCheck, BarChart2, Layers, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/lead-form";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-zinc-950 text-zinc-100 selection:bg-zinc-800 selection:text-zinc-100">
      {/* Subtle ambient lighting */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-zinc-900/40 blur-[120px]" />
      </div>

      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-zinc-100 text-zinc-950 font-mono font-bold text-sm">
                LD
              </div>
              <span className="text-base font-semibold tracking-tight text-zinc-100">
                LeadDesk
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/admin">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 transition-colors font-medium text-xs sm:text-sm"
                >
                  Admin Portal
                </Button>
              </Link>
              <a href="#contact">
                <Button
                  size="sm"
                  className="bg-zinc-100 hover:bg-zinc-200 text-zinc-950 font-medium transition-colors cursor-pointer text-xs sm:text-sm"
                >
                  Get Started
                </Button>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 sm:pt-28 sm:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/80 px-3.5 py-1 text-xs font-mono text-zinc-400">
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
              Lead Operations Platform
            </div>
            <h1 className="text-4xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-100 to-zinc-400 sm:text-6xl lg:text-7xl leading-[1.1]">
              Streamline Inbound Leads With Precision.
            </h1>
            <p className="mt-6 text-base leading-relaxed text-zinc-400 sm:text-lg max-w-2xl mx-auto font-normal">
              Capture, validate, and convert business inquiries with an enterprise-ready dashboard designed for speed and reliability.
            </p>
            <div className="mt-10 flex flex-col items-center gap-3.5 sm:flex-row sm:justify-center">
              <a href="#contact">
                <Button
                  size="lg"
                  className="h-11 px-6 text-sm bg-zinc-100 hover:bg-zinc-200 text-zinc-950 font-medium transition-colors group cursor-pointer w-full sm:w-auto"
                >
                  Submit Inquiry
                  <ArrowRight className="ml-2 h-4 w-4 text-zinc-950 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              {/* <Link href="/admin">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-11 px-6 text-sm border-zinc-800 bg-zinc-900/50 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100 transition-colors w-full sm:w-auto cursor-pointer"
                >
                  Open Dashboard
                </Button>
              </Link> */}
            </div>
          </div>
        </div>
      </section>

      {/* Value Pillars Section */}
      <section className="relative py-20 border-t border-zinc-900 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Pillar 1 */}
            <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-6 transition-all hover:border-zinc-700">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-300">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold text-zinc-100 mb-2">
                Type-Safe Validation
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                End-to-end Zod schemas enforce strict data validation on client input and server handlers, eliminating invalid or missing data.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-6 transition-all hover:border-zinc-700">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-300">
                <BarChart2 className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold text-zinc-100 mb-2">
                Real-Time Operations
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Instant lead search, status filters, and one-click status transitions keep sales teams organized and responsive.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-6 transition-all hover:border-zinc-700 sm:col-span-2 lg:col-span-1">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-300">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold text-zinc-100 mb-2">
                Secured Access Control
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Protected `/admin` layer backed by Clerk session middleware ensures administrative tools are restricted to authorized personnel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="contact" className="relative py-20 border-t border-zinc-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold tracking-tight text-zinc-100 sm:text-3xl">
                Get In Touch
              </h2>
              <p className="mt-2 text-sm text-zinc-400">
                Complete the inquiry form below to initiate discussion with our team.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 shadow-xl">
              <LeadForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-8 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded bg-zinc-100 text-zinc-950 font-mono text-xs font-bold">
                LD
              </div>
              <span className="text-xs font-semibold text-zinc-300">
                LeadDesk Mini
              </span>
            </div>
            <p className="text-xs text-zinc-500 font-mono">
              © {new Date().getFullYear()} LeadDesk. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
