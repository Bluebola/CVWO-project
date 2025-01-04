import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/posts(.*)',
  '/profile(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
    const authObject = await auth();
    if (isProtectedRoute(req)) {
      if (!authObject.userId) {
        throw new Error('Unauthorized access');
      }
      
    }
  });
  
  export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
  };