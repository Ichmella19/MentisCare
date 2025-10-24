import Google from "next-auth/providers/google"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { ZodError } from "zod"
import { getUserFromDb, signInSchema } from "./lib/zod"
import prisma from "./lib/db"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          let user = null
 
          const { email, password } = await signInSchema.parseAsync(credentials)
 
          // logic to salt and hash password
          // const pwHash = await saltAndHashPassword(password)
 
          // logic to verify if the user exists
          user = await getUserFromDb(email, password)
 
          if (!user) {
            return null
          }
          console.log("User found:", user)
          // return JSON object with the user data
          return user
        } catch (error) {
          if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null
          }
          // Always return null on error to avoid returning undefined
          return null
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    
    async signIn({ user}) {
      console.log("User signed in:", user)
      return true
    },
    
    async jwt({ token, user }) {
      // Si l'utilisateur est présent lors de la connexion, ajoutez son ID au token
      if (user) {
        // token.id = user.id;

        token.id = (user as any).id;
        token.role = (user as any).role;
      }
      return token;
    },
    // Le callback 'session' est exécuté après le 'jwt'
    async session({ session, token,user }) {
      // // Assurez-vous que le token et son ID existent
      
      if (session.user && token.id) {
        session.user.id = String(token.id);
        (session.user as any).role = String((token as any).role);
      }
      return session;
    },
  // Vous devez également définir la stratégie de session comme 'jwt'

  }
})
