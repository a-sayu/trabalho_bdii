import { query } from "$lib/server/db";
import { error } from "@sveltejs/kit";

export const autorizar = (async (UUID: any) => {
    try {
        await query<any>("CALL updateEvento(?)", UUID);
        return true;
        
    } catch (e) {
        console.error("Erro ao carregar eventos: ", e);
        throw error(500, "Não foi possível autorizar o evento.");
    }
  });
