import { query } from "$lib/server/db";
import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { randomUUID } from "node:crypto";

export const load: PageServerLoad = async (event) => {
    const session = await event.locals.auth();
    if (!session?.user?.email) throw redirect(303, '/login');
    try {
        // const resultadoProcedure = await query<any>("CALL selectPessoas()");

        // const pessoasRaw = Array.isArray(resultadoProcedure[0])
        //     ? resultadoProcedure[0]
        //     : resultadoProcedure;

        // const pessoas = pessoasRaw.map((pessoa: any) => {
        //     return {
        //         ...pessoa,
        //     };
        // });

        return {
            userEmail: session?.user?.email || ""
        };
    } catch (e) {
        console.error("Erro ao carregar pessoas: ", e);
        throw error(500, "Não foi possível carregar os dados das pessoas.");
    }
};