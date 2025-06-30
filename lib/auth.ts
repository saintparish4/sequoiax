import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { customSession } from "better-auth/plugins";
    // If your Prisma file is located elsewhere, you can change the path
import prisma from "./prisma";

// Debug environment variables
console.log("[env] BETTER_AUTH_SECRET:", process.env.BETTER_AUTH_SECRET ? "SET" : "NOT SET");
console.log("[env] BETTER_AUTH_URL:", process.env.BETTER_AUTH_URL);
console.log("[env] DATABASE_URL:", process.env.DATABASE_URL ? "SET" : "NOT SET");
console.log("[env] GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID ? "SET" : "NOT SET");
console.log("[env] GOOGLE_CLIENT_SECRET:", process.env.GOOGLE_CLIENT_SECRET ? "SET" : "NOT SET");

console.log("[auth] Loading better-auth config...");

export const auth = betterAuth({
  // Required: Secret for encryption, signing, and hashing
  secret: process.env.BETTER_AUTH_SECRET || "better-auth-secret-123456789",
  
  // Database configuration - using PostgreSQL directly
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
}),
  
  // Base URL for your application
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  
  // Trusted origins for security
  trustedOrigins: ['http://localhost:3001'],
  
  // Email and password authentication
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
  },
  
  // Social providers
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  
  // Session configuration
  session: {
    expiresIn: 86400, // 1 day - shorter for better security
    updateAge: 3600, // 1 hour - more frequent updates
  },
  
  // User configuration
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "INVESTOR",
        input: false, // don't allow user to set role during signup
      },
    },
  },
  
  // Plugins
  plugins: [
    customSession(async ({ user, session }) => {
      // Include the role field in the session
      const userWithRole = user as typeof user & { role?: string };
      return {
        user: {
          ...user,
          role: userWithRole.role || "INVESTOR", // Ensure role is always available
        },
        session,
      };
    }),
  ],
});

console.log("[auth] better-auth config loaded!");