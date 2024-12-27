import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublic = createRouteMatcher([
  "/", // Home page
  "/sign-in(.*)", // Sign in page
  "/sign-up(.*)", // Sign up page
]);

// const isProtected = createRouteMatcher([
//   "/dashboard",
//   "/invoices/:invoiceId",
//   "/invoices/new",
// ]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublic(request)) {
    const authObj = await auth();
    if (!authObj.userId) {
      return authObj.redirectToSignIn();
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
