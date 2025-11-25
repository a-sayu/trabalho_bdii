import { query } from "$lib/server/db";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

interface Pessoas {
    UUID_pessoa: string;
    Nome_pessoa: string;
    Email: string;
    vinculo: string;
}

export const load: PageServerLoad = async () => {
    try {
        const resultadoProcedure = await query<any>("CALL selectPessoas()");

        const pessoasRaw = Array.isArray(resultadoProcedure[0])
            ? resultadoProcedure[0]
            : resultadoProcedure;

        const pessoas = pessoasRaw.map((evento: any) => {
            return {
                ...evento,
            };
        });

        return {
            pessoas: pessoas,
        };
    } catch (e) {
        console.error("Erro ao carregar pessoas: ", e);
        throw error(500, "Não foi possível carregar os dados das pessoas.");
    }
};
