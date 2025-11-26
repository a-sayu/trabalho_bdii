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
        const rawRA = resultadoProcedure[0];
        const rawPessoa = resultadoProcedure[1];
        if (!Array.isArray(rawPessoa) || rawPessoa.length === 0) {
            return { pessoa: null };
        }

        const rowPessoa = rawPessoa[0];
        const rowRA = (Array.isArray(rawRA) && rawRA.length > 0) ? rawRA[0] : {};
        const pessoa: Pessoa = {
            // Dados vindos da tabela Pessoas (Segundo Select)
            UUID: rowPessoa.UUID || rowPessoa.uuid || "",
            Nome: rowPessoa.Nome || rowPessoa.nome || session.user?.name || "Usuário",
            Email: rowPessoa.Email || rowPessoa.email || session.user?.email || "",
            Vinculo_UNESP: rowPessoa.Vinculo_UNESP || rowPessoa.vinculo_unesp || "Não informado",
            
            // Dado vindo da tabela Discentes (Primeiro Select)
            // Se não achar o RA, coloca 0 ou null (conforme sua preferência)
            RA: rowRA.RA || rowRA.ra || 0,
            
            Github: rowPessoa.Github || rowPessoa.github || "",
            Linkedin: rowPessoa.Linkedin || rowPessoa.linkedin || "",
            Descricao: rowPessoa.Descricao || rowPessoa.descricao || ""
        };

        return {
            pessoa
        };
    } catch (e) {}
};
