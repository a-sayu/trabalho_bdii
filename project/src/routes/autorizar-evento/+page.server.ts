import { query } from "$lib/server/db";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

interface Evento {
    UUID_evento: string;
    Nome_evento: string;
    Data_local: Date;
    Duracao: number;
    Autorizado: boolean;
    Maximo: number;
    Responsavel: string;
    Descricao: string;
}

export const load: PageServerLoad = async () => {
    try {
        const resultadoProcedure = await query<any>("CALL selectEventos()");

        const eventosRaw = Array.isArray(resultadoProcedure[0])
            ? resultadoProcedure[0]
            : resultadoProcedure;

        const eventosNaoFiltrados = eventosRaw.map((evento: any) => {
            return {
                ...evento,
                Data_local:
                    evento.Data_local instanceof Date
                        ? evento.Data_local.toISOString()
                        : evento.Data_local,
            };
        });

        const eventos = eventosNaoFiltrados.filter(
            (ev: any) => ev && !ev.Autorizado
        );

        return {
            eventos: eventos,
        };
    } catch (e) {
        console.error("Erro ao carregar eventos: ", e);
        throw error(500, "Não foi possível carregar os dados dos eventos.");
    }
};
