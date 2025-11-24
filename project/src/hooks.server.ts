import { SvelteKitAuth } from "@auth/sveltekit";
import Google from "@auth/core/providers/google";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, AUTH_SECRET } from "$env/static/private";
import { redirect, type Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";


const ALLOWED_EMAILS = [
    "cacic.fct@gmail.com",
];

const ADMIN_EMAILS = [
    "abigail.s.nakashima@unesp.br",
    "miguel.moret@unesp.br",
    "cristian.eidi@unesp.br",
    "daniel.aa.padua@unesp.br",
    "paulo.sc.lima@unesp.br",
    "filipe.nava@unesp.br",
    "arthur.koichi@unesp.br",
];

const ADMIN_ROUTES = [
    "/autorizar-evento",
    "/gerenciar-pessoas",
    "/log-page",
    "/registrar-presenca",
]

const PROTECTED_ROUTES = [
    "/adicionar-eventos",
    "/adicionar-provas",
    "/emitir-certificado",
    "/gerar-qrcode",
]

const { handle: authHandle } = SvelteKitAuth({
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
            const email = profile?.email || "";
            if (email.endsWith("@unesp.br")|| ALLOWED_EMAILS.includes(email)) {
                return true;
            }
            return false;
        },
        async jwt({ token, user }) {
            if (user && user.email) {
                token.role = ADMIN_EMAILS.includes(user.email) ? "admin" : user;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.role = token.role as string;
            }
            return session;
        }
    }
});

const authorizationHandle: Handle = async ({ event, resolve} ) => {
    const session = await event.locals.auth();
    const pathname = event.url.pathname;

    const isRouteAdmin = ADMIN_ROUTES.some(route=> pathname.startsWith(route));
    const isRouteProtected = PROTECTED_ROUTES.some(route => pathname.startsWith(route));

    if (!session) {
        throw redirect(303, "/login");
    } else {
        if (isRouteAdmin) {
            if (session.user?.role !== "admin") {
                throw redirect(303, "/");
            }
        }
    
        if (isRouteProtected) {
        }
    }

    return resolve(event);
}

export const handle = sequence(authHandle, authorizationHandle);