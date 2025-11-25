// src/routes/+page.server.ts
import { query } from "$lib/server/db";
// import { onMount } from "svelte";

// Define a TypeScript type for the expected result structure
interface Evento {
    UUID: number;
    Nome: string;
    Data_local: Date;
}

// try {
//     const eventos = await query<Evento[]>("CALL selectEventos()");

//     console.log(eventos);
// } catch (error) {
//     // Handle error appropriately
//     console.error(error);
// }

// onMount(async () => {
//     try {
//         // Call the stored procedure
//         // Use 'CALL procedure_name(?, ?)' syntax for stored procedures
//         const eventos = await query<Evento[]>("CALL selectEventos()");

//         console.log(eventos);

//         return {
//             eventos,
//         };
//     } catch (error) {
//         // Handle error appropriately
//         console.error(error);
//         return {
//             eventos: [],
//         };
//     }
// });

export async function load() {
    try {
        // Call the stored procedure
        // Use 'CALL procedure_name(?, ?)' syntax for stored procedures
        const eventosRaw = await query<Evento[]>("CALL selectEventosMes()");
        
        const eventos = eventosRaw.map(evento => {
            return {
                ...evento,
                Data_local: evento.Data_local instanceof Date ? evento.Data_local.toISOString() : evento.Data_local,
            }
        })

        return {
            eventos: eventos,
        };
    } catch (error) {
        // Handle error appropriately
        console.error("Erro ao carregar eventos: ", error);
        throw new Error("Não foi possível carregar os dados dos eventos.");
    }
}
