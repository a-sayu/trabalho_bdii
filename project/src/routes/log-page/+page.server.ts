import { query } from "$lib/server/db";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

interface Log {
    UUID: string;
    Origem: string;
    Data: Date;
    Descricao: string;
}

export const load: PageServerLoad = async (event) => {
    const { session } = await event.parent();
    const PessoaLogada = session?.user;

    if (!PessoaLogada) {
        throw error(403, "Acesso não autorizado. Faça Login.");
    }

    try {
        const resultadoProcedure = await query<any>("CALL selectLogs()");

        const logsRaw = Array.isArray(resultadoProcedure[0])
            ? resultadoProcedure[0]
            : resultadoProcedure;

        const logs = logsRaw.map((row: any) => {
            return {
                UUID: row.UUID || row.uuid,
                Descricao: row.Descricao || row.descricao,
                Origem: row.Origem || row.origem,
                Data: row.Data instanceof Date ? row.Data.toISOString() : row.Data || row.data instanceof Date ? row.data.toISOString() : row.data,
            };
        });

        console.log("Logs:", logs);

        return {
            logs: logs,
        }
    } catch (e) {
        console.error("Erro ao carregar logs: ", e);
        throw error(
            500,
            "Não foi possível carregar os dados dos certificados."
        );
    }
};
