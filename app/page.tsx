import { prisma } from "@/app/lib/prisma";
import HomeClient from "./HomeClient";
import { Evento, EventoDB } from "./types/evento";

export default async function Home() {
  function mapEventoDBToEvento(evento: EventoDB): Evento {
    return {
      id: evento.id,
      fecha: evento.fecha!,
      ciudad: evento.ciudad ?? "",
      teatro: evento.teatro ?? "",
      texto: evento.texto ?? "",
      link: evento.link ?? "",
      Show: {
        nombre: evento.Show?.nombre ?? "",
        urlImg: evento.Show?.urlImg ?? "",
      },
      EstadoEvento: {
        nombre: evento.EstadoEvento.nombre,
      },
    };
  }

  const eventosDB = await prisma.evento.findMany({
    include: {
      Show: true,
      EstadoEvento: true,
    },
    where: {
      webId: 36,
      fecha: { not: null },
      estadoId: { in: [2, 3, 4, 6, 7, 8, 9] },
    },
    orderBy: { fecha: "asc" },
  });

  const eventos: Evento[] = eventosDB.map(mapEventoDBToEvento);
  return <HomeClient eventos={eventos} />;
}
