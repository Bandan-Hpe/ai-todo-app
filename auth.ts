import { ConvexAdapter } from "@/app/ConvexAdapter";
import { importPKCS8, SignJWT } from "jose";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
if (process.env.CONVEX_AUTH_PRIVATE_KEY === undefined) {
  throw new Error("MISSING CONVEX_AUTH_PRIVATE_KEY ENVIRONMENT VARIABLE");
}
if (process.env.JWKS === undefined) {
  throw new Error("MISSING JWKS ENVIRONMENT VARIABLE");
}
if (process.env.NEXT_PUBLIC_CONVEX_URL === undefined) {
  throw new Error("MISSING NEXT_PUBLIC_CONVEX_URL ENVIRONMENT VARIABLE");
}

const CONVEX_SITE_URL = process.env.NEXT_PUBLIC_CONVEX_URL!.replace(
  /.cloud$/,
  ".site"
);

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    //   google oauth
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: { params: { prompt: "consent" } },
    }),
  ],
  adapter: ConvexAdapter,
  callbacks: {
    async session({ session }) {
      const privateKey = await importPKCS8(
        process.env.CONVEX_AUTH_PRIVATE_KEY!,
        "RSA-SHA256"
      );
      const convexToken = await new SignJWT({ sub: session.userId })
        .setProtectedHeader({ alg: "RS256" })
        .setIssuedAt()
        .setIssuer(CONVEX_SITE_URL)
        .setAudience("convex")
        .setExpirationTime("1h")
        .sign(privateKey);

      return { ...session, convexToken };
    },
  },
});
