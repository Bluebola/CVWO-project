import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';


// This is a route matcher that matches all routes that require authentication.
const isProtectedRoute = createRouteMatcher([
  '/posts(.*)',
  '/profile(.*)',
]);

// This middleware protects all routes that match the pattern.
export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect()
})
  
  export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
  };