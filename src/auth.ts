import Google from "next-auth/providers/google"
import NextAuth from "next-auth"
import { ZodError } from "zod"
import bcrypt from "bcryptjs"
import Credentials from "next-auth/providers/credentials"
import { signInSchema } from "./lib/zod"
import prisma from "./lib/db"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const result = signInSchema.safeParse(credentials)
          if (!result.success) {
            return null
          }

          const { email, password } = result.data

          const user = await prisma.user.findUnique({
            where: { email },
          })

          if (user && (await bcrypt.compare(password, user.password))) {
            return user
          }

          return null
        } catch (error) {
          if (error instanceof ZodError) {
            return null
          }
          throw error
        }
      },
    }),
  ],
})
