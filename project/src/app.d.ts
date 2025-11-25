// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { DefautSession } from "@auth/core/types";

declare global {
	namespace App {
        interface Locals {

        }
        interface PageData {
            session: Session | null;
        }
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

declare module "@auth/core/types" {
    interface Session {
        user: {
            role?: string;
        } & DefaultSession["user"];
    }
}

declare module "@auth/core/jwt" {
    interface JWT {
        role?: string | any;
    }
}

export {};
