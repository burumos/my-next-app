import NextAuth, { User } from "next-auth";
import { z } from "zod";
import bcrypt from "bcrypt";
import { fetchUser } from "./app/lib/user";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ loginId: z.string(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { loginId, password } = parsedCredentials.data;
          const user = await fetchUser(loginId);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);

          const u: User = {
            id: user.id.toString(),
            name: user.name,
            email: user.loginId,
          };
          if (passwordsMatch) return u;
        }

        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});

export async function loginUser() {
  const session = await auth();
  const user = session?.user?.email ? await fetchUser(session.user.email) : null;
  if (!user) {
    throw new Error('fetch login user error');
  }
  return user;
}
