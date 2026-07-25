import { clerkMiddleware, createRouteMatcher, createClerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isAdminRoute(req)) {
    // 1. Force authentication first (redirects to /sign-in if user is not signed in)
    await auth.protect();

    // 2. Fetch authenticated user details to verify admin access
    const { userId } = await auth();

    if (userId) {
      try {
        const clerk = createClerkClient({
          secretKey: process.env.CLERK_SECRET_KEY,
        });
        const user = await clerk.users.getUser(userId);

        const userEmails = user.emailAddresses.map((e) => e.emailAddress.toLowerCase());
        const userRole = (user.publicMetadata as { role?: string })?.role;

        const allowedAdminEmails = (process.env.ADMIN_EMAILS || "")
          .split(",")
          .map((e) => e.trim().toLowerCase())
          .filter(Boolean);

        const isEmailAllowed = userEmails.some((email) =>
          allowedAdminEmails.includes(email)
        );
        const isRoleAllowed = userRole === "admin";

        if (!isEmailAllowed && !isRoleAllowed) {
          const unauthorizedUrl = new URL("/unauthorized", req.url);
          return NextResponse.redirect(unauthorizedUrl);
        }
      } catch (error) {
        console.error("Error verifying admin permissions in middleware:", error);
      }
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};

