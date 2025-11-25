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
    criar: async ({ request }) => {
        const data = await request.formData();
        const nome = data.get("nome") as string;
        const email = data.get("email") as string;
        const vinculo = data.get("vinculo") as string;

        if (!nome || !email || !vinculo) {
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
            console.error("Erro ao criar:", e);
            return fail(500, { error: "Erro ao salvar." });
        }
    },

    editar: async ({ request }) => {
        const data = await request.formData();
        
        // Pegamos o UUID que está no input hidden
        const uuid = data.get("uuid") as string;
        const nome = data.get("nome") as string;
        const email = data.get("email") as string;
        const vinculo = data.get("vinculo") as string;

        if (!uuid || !nome || !email || !vinculo) {
            return fail(400, {
                editarError: "Todos os campos são obrigatórios para edição.",
                uuid, nome, email, vinculo
            });
        }

        try {
            await query("CALL updatePessoa(?,?,?,?)", [uuid, nome, email, vinculo]);
            
            return { successEdit: true };
        } catch (e) {
            console.error("Erro ao editar:", e);
            return fail(500, { editarError: "Erro ao atualizar a pessoa." });
        }
    }
};
