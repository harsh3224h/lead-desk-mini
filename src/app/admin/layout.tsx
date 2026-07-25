import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 font-sans">
      <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
        <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-4 sm:px-8 mx-auto">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-7 w-7 items-center justify-center rounded bg-zinc-100 text-zinc-950 font-mono text-xs font-bold">
                LD
              </div>
              <span className="font-semibold text-sm tracking-tight text-zinc-100">
                LeadDesk
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-xs text-zinc-400 hover:text-zinc-100 transition-colors font-medium"
            >
              Public Site
            </Link>
            <UserButton />
          </div>
        </div>
      </header>
      <main className="container max-w-screen-2xl mx-auto px-4 sm:px-8 py-8 flex-1">
        {children}
      </main>
      <footer className="border-t border-zinc-800/60 py-6 bg-zinc-950 mt-auto">
        <div className="container max-w-screen-2xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <p>
            <a
              href="https://digitalheroesco.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-200 transition-colors underline decoration-zinc-700 underline-offset-4 font-medium"
            >
              Built for Digital Heroes Training Task
            </a>
          </p>
          <a
            href="https://github.com/harsh3224h/lead-desk-mini"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-300 transition-colors font-mono text-zinc-500"
          >
            https://github.com/harsh3224h/lead-desk-mini
          </a>
        </div>
      </footer>
    </div>
  );
}
