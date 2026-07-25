import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { ShieldAlert, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 text-zinc-100 px-4">
      <div className="w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-900/60 p-8 shadow-2xl backdrop-blur-sm text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10 text-red-400 mb-6 border border-red-500/20">
          <ShieldAlert className="h-7 w-7" />
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-zinc-100 mb-2">
          Access Restricted
        </h1>

        <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
          Your account does not have administrative privileges to access the LeadDesk Admin Dashboard. If you believe this is an error, please log in with an authorized administrator account.
        </p>

        <div className="flex items-center justify-center gap-3 py-3 px-4 rounded-lg bg-zinc-950 border border-zinc-800 mb-6">
          <span className="text-xs text-zinc-400 font-medium">Signed in as:</span>
          <UserButton showName />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/">
            <Button variant="outline" className="w-full sm:w-auto border-zinc-800 hover:bg-zinc-800">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Return to Public Site
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
