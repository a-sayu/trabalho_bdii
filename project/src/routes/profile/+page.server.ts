import { query } from "$lib/server/db";
import { error, fail, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { Pessoa } from "$lib/types";

export const load: PageServerLoad = async (event) => {
    const { session } = await event.parent();
    const email_p = session?.user?.email;

    if (!email_p) {
        throw error(403, "Acesso não autorizado. Faça Login.");
    }
    try {
        const resultadoProcedure = await query<any>(
            "CALL selectPessoaByEmail(?)",
            [email_p]
        );
        let pessoa: Pessoa | null = null;

        if (Array.isArray(resultadoProcedure) && resultadoProcedure[0]?.length > 0) {
            const linhas = resultadoProcedure[0];
            if (Array.isArray(linhas)) {
                pessoa = linhas[0] as Pessoa;
            } else {
                pessoa = resultadoProcedure[0] as Pessoa;
            }
        }
        return {
            pessoa: pessoa
        }
    } catch (e) {}
};
