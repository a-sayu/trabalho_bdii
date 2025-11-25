import { query } from "$lib/server/db";
import { error, fail, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { randomUUID } from "node:crypto";

interface Pessoa {
    UUID: string;
    Nome: string;
    Email: string;
    Vinculo_UNESP: string;
    GitHub?: string;
    LinkedIn?: string;
    Biografia?: string;
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

export const actions: Actions = {
    default: async ({ request }) => {
        const data = await request.formData();

        const nome = data.get("nome") as string;
        const email = data.get("email") as string;
        const vinculo = data.get("vinculo") as string;

        if (!nome || !email || !vinculo) {
            console.warn(
                `[ADICAO] Tentativa de adição falhou: Campos obrigatórios ausentes.`
            );

            return fail(400, {
                error: "Nome, email e vinculo são obrigatórios.",
                nome,
                email,
                vinculo,
            });
        }

        const UUID_pessoa = randomUUID();

        const spParams = [UUID_pessoa, nome, email, vinculo];

        try {
            await query("CALL insertPessoa(?,?,?,?)", spParams);
            console.log(
                `${nome.slice(0, 6)}... (UUID: ${UUID_pessoa.slice(
                    0,
                    8
                )}...) adicionado com sucesso.`
            );

            return { success: true };
        } catch (e) {
            console.error(
                "Erro no DB ao adicionar a pessoa:",
                JSON.stringify(e, null, 2)
            );
            return fail(500, {
                error: "Erro no servidor ao salvar a pessoa. Verifique o console do servidor para detalhes no DB",
                nome,
                email,
                vinculo,
            });
        }
    },
};
