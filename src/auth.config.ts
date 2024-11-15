import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      if (isLoggedIn && nextUrl.pathname === '/login') {
        return Response.redirect(new URL("/", nextUrl));
      }

      return isLoggedIn;
    },
  },
} satisfies NextAuthConfig;
