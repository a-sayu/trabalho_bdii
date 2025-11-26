import { query } from "$lib/server/db";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { Pessoa } from "$lib/types";

export const load: PageServerLoad = async (event) => {
    const { session } = await event.parent();
    const email = session?.user?.email;

    if (!email) {
        throw redirect(303, "/login");
    }

    try {
        // Mesma lógica de busca do editar
        const resultadoProcedure = await query<any>(
            "CALL selectPessoaByEmail(?)",
            [email]
        );

        const rawRA = resultadoProcedure[0];
        const rawPessoa = resultadoProcedure[1];

        if (!Array.isArray(rawPessoa) || rawPessoa.length === 0) {
            return { pessoa: null };
        }

        const rowPessoa = rawPessoa[0];
        const rowRA = Array.isArray(rawRA) && rawRA.length > 0 ? rawRA[0] : {};

        const pessoa: Pessoa = {
            UUID: rowPessoa.UUID || rowPessoa.uuid || "",
            Nome:
                rowPessoa.Nome ||
                rowPessoa.nome ||
                session.user?.name ||
                "Usuário",
            Email:
                rowPessoa.Email || rowPessoa.email || session.user?.email || "",
            Vinculo_UNESP:
                rowPessoa.Vinculo_UNESP || rowPessoa.vinculo_unesp || "",
            RA: rowRA.RA || rowRA.ra || "",
            Github: rowPessoa.Github || rowPessoa.github || "",
            Linkedin: rowPessoa.Linkedin || rowPessoa.linkedin || "",
            Descricao: rowPessoa.Descricao || rowPessoa.descricao || "",
        };

        return { pessoa };
    } catch (e) {
        console.error("Erro ao carregar perfil:", e);
        return { pessoa: null };
    }
};
