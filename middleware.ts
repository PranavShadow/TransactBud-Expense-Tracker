import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Define which routes are PUBLIC (no auth needed)
const isPublicRoute = createRouteMatcher([
  '/',                    // homepage - no auth
  '/sign-in(.*)',         // Clerk sign-in pages
  '/sign-up(.*)',         // Clerk sign-up pages
])

export default clerkMiddleware(async (auth, request) => {
  // If it's NOT a public route, protect it
  if (!isPublicRoute(request)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}