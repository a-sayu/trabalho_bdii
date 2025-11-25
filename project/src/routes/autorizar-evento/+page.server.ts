import { query } from "$lib/server/db";
import { error, fail, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { randomUUID } from "node:crypto";

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
        const resultadoProcedure = await query<any>("CALL selectEventosAprovar()");

        const eventosRaw = Array.isArray(resultadoProcedure[0])
            ? resultadoProcedure[0]
            : resultadoProcedure;

        const eventos = eventosRaw.map((evento: any) => {
            return {
                ...evento,
                Data_local:
                    evento.Data_local instanceof Date
                        ? evento.Data_local.toISOString()
                        : evento.Data_local,
            };
        });

        return {
            eventos: eventos,
        };
    } catch (e) {
        console.error("Erro ao carregar eventos: ", e);
        throw error(500, "Não foi possível carregar os dados dos eventos.");
    }
};

export const actions: Actions = {
    editar: async ({ request }) => {
        const data = await request.formData();
        
        // Pegamos o UUID que está no input hidden
        const uuid = data.get("uuid") as string;
        console.log("A")

        try {
            console.log("A")
            await query("CALL updateEvento(?)", [uuid]);
            console.log("A")
            return { successEdit: true };
        } catch (e) {
            console.log("B")
            console.error("Erro ao editar:", e);
            return fail(500, { editarError: "Erro ao atualizar o evento." });
        }
    }
};
