import { withAuth } from "next-auth/middleware"

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      // Allow access to /trainer only for trainers
      if (req.nextUrl.pathname.startsWith('/trainer')) {
        return token?.role === 'TRAINER';
      }
      // Allow access to other routes for all authenticated users
      return !!token;
    },
  },
});

export const config = {
  matcher: ['/home'],
}
