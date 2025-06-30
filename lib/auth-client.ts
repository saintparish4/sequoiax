import { createAuthClient } from "better-auth/react";
import { customSessionClient } from "better-auth/client/plugins";
import type { auth } from "./auth";

export const authClient = createAuthClient({
  plugins: [customSessionClient<typeof auth>()],
});

export const { signIn, signUp, signOut, useSession } = authClient;
