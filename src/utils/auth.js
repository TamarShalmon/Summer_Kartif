import { PrismaAdapter } from "@auth/prisma-adapter";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import prisma from "./prismadb";
// import prisma from "./connect";
import { getServerSession } from "next-auth";


export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
};

export const getAuthSession = () => {
  try {
    const session = getServerSession(authOptions);
    console.log("Session:", session);
    return session;
  } catch (error) {
    console.error("Error getting auth session:", error);
  }
};