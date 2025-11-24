import { query } from "$lib/server/db";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { fail, type Actions } from "@sveltejs/kit";
import { randomUUID } from "node:crypto";

interface Pauta {
    UUID: number;
    nome: string;
    descricao: string;
}

interface Sugestao {
    UUID: number;
    nome: string;
    descricao: string;
}

export async function load() {
    try {
        // Call the stored procedure
        // Use 'CALL procedure_name(?, ?)' syntax for stored procedures
        const sugestoes = await query<Sugestao[]>("CALL selectSugestoes()");
        const pautas = await query<Pauta[]>("CALL selectPautas()");

        return {
            sugestoes: sugestoes,
        };
    } catch (error) {
        // Handle error appropriately
        console.error("Erro ao carregar sugestoes: ", error);
        throw new Error("Não foi possível carregar os dados das sugestoes.");
    }
}


export const actions: Actions = {
    default: async ({ request }) => {
        const data = await request.formData();

        const tipo = data.get("tipo") as string;
        const titulo = data.get("titulo") as string;
        const descricao = data.get("descricao") as string;
        const pessoa = data.get("pessoa") as string;

        if (!titulo || !descricao) {
            // Log no terminal para indicar falha de validação do formulário
            console.warn(
                `[PROVA] Tentativa de adição falhou: Campos obrigatórios ausentes.`
            );

            return fail(400, {
                error: "Título, data, tipo, descricao são obrigatórios.",
                titulo,
            });
        }

        const UUID_sugestao = randomUUID();

        // Parâmetros na ORDEM exata da SP: (UUID_sugestao, Nome_sugestao)
        const spParams = [
            UUID_sugestao,
            titulo, // Nome_disciplina
            descricao, // pessoa da prova
            pessoa,
        ];

        if (tipo === "Sugestao") {
            try {
                // Chamada à Stored Procedure
                await query("CALL insertSugestao(?,?,?,?)", spParams);

                // Log de sucesso
                console.log(
                    `✅ "${titulo}" (UUID: ${UUID_sugestao.slice(
                        0,
                        8
                    )}...) adicionado com sucesso.`
                );

                return { success: true };
            } catch (e) {
                // Log de erro no DB. Usa JSON.stringify para capturar o sqlMessage.
                console.error(
                    "❌ Erro no DB ao adicionar sugestao:",
                    JSON.stringify(e, null, 2)
                );

                return fail(500, {
                    error: "Erro no servidor ao salvar o sugestao. Verifique o console do servidor para detalhes do DB.",
                    titulo,
                });
            }
        } else {
            try {
                // Chamada à Stored Procedure
                await query("CALL insertPauta(?,?,?,?)", spParams);

                // Log de sucesso
                console.log(
                    `✅ "${titulo}" (UUID: ${UUID_sugestao.slice(
                        0,
                        8
                    )}...) adicionado com sucesso.`
                );

                return { success: true };
            } catch (e) {
                // Log de erro no DB. Usa JSON.stringify para capturar o sqlMessage.
                console.error(
                    "❌ Erro no DB ao adicionar pauta:",
                    JSON.stringify(e, null, 2)
                );

                return fail(500, {
                    error: "Erro no servidor ao salvar o pauta. Verifique o console do servidor para detalhes do DB.",
                    titulo,
                });
            }
        }
    },
};
