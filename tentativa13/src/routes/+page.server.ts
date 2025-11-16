// src/routes/+page.server.ts
import { query } from '$lib/server/db';
import { onMount } from 'svelte';

// Define a TypeScript type for the expected result structure
interface Evento {
        UUID: number;
        Nome: string;
        Data_local: Date;
      }

console.log("A")

try {
    const eventos = await query<Evento[]>('CALL selectEventos()');
        
    console.log(eventos)
}
catch (error) {
        // Handle error appropriately
        console.error(error);
    }

onMount(async () =>  {
    try {
        // Call the stored procedure
        // Use 'CALL procedure_name(?, ?)' syntax for stored procedures
        const eventos = await query<Evento[]>('CALL selectEventos()');
        
        console.log(eventos)

        return {
            eventos
        };
    } catch (error) {
        // Handle error appropriately
        console.error(error);
        return {
            eventos: []
        };
    }
});