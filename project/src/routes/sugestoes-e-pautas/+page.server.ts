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

export const load: PageServerLoad = async () => {
    try {
        // Call the stored procedure
        // Use 'CALL procedure_name(?, ?)' syntax for stored procedures
        const sugestoesRaw = await query<any[][]>("CALL selectSugestoes()");
        const pautasRaw = await query<any[][]>("CALL selectPautas()");
        const sugestoes = sugestoesRaw[0] || [];
        const pautas = pautasRaw[0] || [];
        let sugestos_e_pautas = [...sugestoes, ...pautas];
        console.log("Pautas e Sugestoes:", sugestos_e_pautas);
        sugestos_e_pautas.sort((a, b) => {
            return (a.nome || "").localeCompare(b.nome || "");
        });

        return {
            sugestos_e_pautas: JSON.parse(JSON.stringify(sugestos_e_pautas)),
        };
    } catch (e) {
        // Handle error appropriately
        console.error("Erro ao carregar sugestoes: ", e);
        throw error(
            500,
            "Não foi possível carregar os dados das sugestoes e pautas."
        );
    }
};

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
                `[SUGESTAO] Tentativa de adição falhou: Campos obrigatórios ausentes.`
            );

            return fail(400, {
                error: "Título, descricao, tipo e pessoa são obrigatórios.",
                titulo, descricao, tipo, pessoa
            });
        }

        const UUID_sugestao = randomUUID();

        // Parâmetros na ORDEM exata da SP: (UUID_sugestao, Nome_sugestao)
        const spParams = [
            UUID_sugestao,
            titulo, // Nome_disciplina
            descricao, // descricao da prova
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
                    titulo, descricao, tipo, pessoa
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
                    "Erro no DB ao adicionar pauta:",
                    JSON.stringify(e, null, 2)
                );

                return fail(500, {
                    error: "Erro no servidor ao salvar o pauta. Verifique o console do servidor para detalhes do DB.",
                    titulo, descricao, tipo, pessoa
                });
            }
        }
    },
};
