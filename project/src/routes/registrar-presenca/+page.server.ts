import { query } from "$lib/server/db";
import { error, fail, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

interface Evento {
    UUID: string;
    Nome: string;
    Data_local: Date;
    Duracao: number;
    Autorizado?: boolean;
    Maximo: number;
    Responsavel: string;
    Descricao?: string;
}

export const load: PageServerLoad = async () => {
    try {
        const resultadoProcedure = await query<any>("CALL selectEventos");

        const rawRows = Array.isArray(resultadoProcedure[0])
            ? resultadoProcedure[0]
            : resultadoProcedure;

        const eventos = rawRows.map((row: any) => {
            return {
                UUID: row.UUID || row.uuid,
                Nome: row.Nome || row.nome,
                Data_local: row.Data_local || row.data_local,
                Duracao: row.Duracao || row.duracao,
                Maximo: row.Maximo || row.maximo,
                Responsavel: row.Responsavel || row.responsavel,
                Descricao: row.Descricao || row.descricao,
                Autorizado: Boolean(row.Autorizado ?? row.autorizado),
            };
        });

        console.log("Eventos carregados:", eventos);

        return {
            eventos: eventos,
        };
    } catch (e) {
        console.error("Erro ao carregar eventos: ", e);
        throw error(500, "Não foi possível carregar os dados dos eventos.");
    }
};
