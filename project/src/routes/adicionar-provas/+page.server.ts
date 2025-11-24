import { query } from "$lib/server/db";
import { fail, type Actions } from "@sveltejs/kit";
import { randomUUID } from "node:crypto";

export const actions: Actions = {
    default: async ({ request }) => {
        const data = await request.formData();

        const titulo = data.get("disciplina") as string;
        const dataStr = data.get("data") as string;
        const horario = data.get("horario") as string;
        const local = data.get("localizacao") as string;
        const tipo = data.get("provaNumero") as string;
        const conteudo = data.get("conteudo") as string;

        // 2. Validação completa (Verifica se é número, se é > 0 e se os strings existem)
        if (
            !titulo ||
            !dataStr ||
            !horario ||
            !local ||
            !tipo ||
            !conteudo
        ) {
            // Log no terminal para indicar falha de validação do formulário
            console.warn(
                `[PROVA] Tentativa de adição falhou: Campos obrigatórios ausentes.`
            );

            return fail(400, {
                error: "Título, data, horário, local, tipo e conteudo são obrigatórios.",
                titulo,
            });
        }

        const UUID_prova = randomUUID();
        let dataISO: string;
        try {
            // 1. Divide a string "24/11/2025" em [24, 11, 2025]
            const [day, month, year] = dataStr.split("/");
            if (!day || !month || !year) {
                throw new Error("Formato de data inesperado");
            }
            // 2. Reverte para o formato ISO: "2025-11-24"
            dataISO = `${year}-${month}-${day}`;
        } catch (e) {
            console.error(`[PROVA] Erro na conversão de data: ${dataStr}`, e);
            return fail(400, {
                error: "Formato de data inválido.",
                titulo,
            });
        }
        const Data_local_datetime = `${dataISO} ${horario}:00`;

        // Parâmetros na ORDEM exata da SP: (UUID_prova, Nome_prova, Data_local, Maximo)
        const spParams = [
            UUID_prova,
            titulo, // Nome_disciplina
            Data_local_datetime, // Data_local
            local, //lugar
            tipo, // 
            conteudo, // conteudo da prova
        ];

        try {
            // Chamada à Stored Procedure
            await query("CALL insertProva(?,?,?,?,?,?)", spParams);

            // Log de sucesso
            console.log(
                `✅ Prova "${titulo}" (UUID: ${UUID_prova.slice(
                    0,
                    8
                )}...) adicionado com sucesso.`
            );

            return { success: true };
        } catch (e) {
            // Log de erro no DB. Usa JSON.stringify para capturar o sqlMessage.
            console.error(
                "❌ Erro no DB ao adicionar prova:",
                JSON.stringify(e, null, 2)
            );

            return fail(500, {
                error: "Erro no servidor ao salvar o prova. Verifique o console do servidor para detalhes do DB.",
                titulo,
            });
        }
    },
};
