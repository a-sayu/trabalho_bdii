import { SvelteKitAuth } from "@auth/sveltekit";
import Google from "@auth/core/providers/google";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, AUTH_SECRET } from "$env/static/private";

// NOTICE THE { handle } DESTRUCTURING BELOW
export const { handle } = SvelteKitAuth({
  providers: [
    Google({ 
      clientId: GOOGLE_CLIENT_ID, 
      clientSecret: GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
  secret: AUTH_SECRET,
  trustHost: true,
  callbacks: {
    async signIn({ profile }) {
      if (profile?.email?.endsWith("@unesp.br")) {
        return true;
      }
      return false; 
    }
  }
});