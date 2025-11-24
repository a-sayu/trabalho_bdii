import { query } from "$lib/server/db";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

interface Certificado {
    UUID: number;
    UUID_evento: number;
    UUID_pessoa: number;
}

interface Evento {
    UUID_evento: string;
    Nome_evento: string;
    Data_local: Date;
}

export const load: PageServerLoad = async (event) => {
    const { session } = await event.parent();
    const nomePessoaLogada = session?.user?.name;

    if (!nomePessoaLogada) {
        throw error(403, "Acesso não autorizado. Faça Login.");
    }

    try {
        const certificadosRaw = await query<any[]>(
            "CALL selectCertificados(?)",
            [nomePessoaLogada]
        );

        const eventosRaw = await query<Evento[]>("CALL selectEventos()");

        const eventos = new Map<string, Evento>();
        eventosRaw.forEach(evento => {
            eventos.set(evento.UUID_evento, evento);
        })
        const certificados = certificadosRaw.filter(c => c && c.UUID);
        const certificadosMap = certificados.map(certificado => {
            const evento = eventos.get(certificado.UUID_evento);

            const certFinal = {
                ...certificado,
                Nome_evento: evento ? evento.Nome_evento : 'Evento Não Encontrado',
            };

            for (const key in certFinal) {
                const value = certFinal[key];

                if (value instanceof Date) {
                    certFinal[key] = value.toISOString();
                }
            }
            return certFinal;
        });
        return {
            certificados: certificadosMap,
        };
    } catch (e) {
        console.error("Erro ao carregar eventos: ", e);
        throw error(
            500,
            "Não foi possível carregar os dados dos certificados."
        );
    }
};
