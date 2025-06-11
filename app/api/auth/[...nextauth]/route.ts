import NextAuth from "next-auth"
import GoogleProvider from "@auth/google"
import { NextAuthOptions } from "next-auth"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        const response = await fetch('http://localhost:3002/api/v1/auth/google', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: user.email,
            name: user.name,
            google_id: profile.sub
          })
        })

        if (!response.ok) {
          return false
        }

        const data = await response.json()
        if (data.company) {
          return true
        }
      }
      return true
    },
    async session({ session, token }) {
      return session
    },
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token
        token.provider = account.provider
      }
      return token
    }
  },
  pages: {
    signIn: '/auth/empresa/cadastro'
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
