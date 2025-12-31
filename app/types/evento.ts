export interface Evento {
  id: number;
  fecha: Date;
  ciudad: string;
  teatro: string;
  texto: string;
  link: string;
  Show: {
    nombre: string;
    urlImg: string;
  };
  EstadoEvento: {
    nombre: string;
  };
}

export interface EventoDB {
  id: number;
  fecha: Date | null;
  ciudad: string | null;
  teatro: string | null;
  texto: string | null;
  link: string | null;
  Show: {
    nombre: string;
    urlImg: string | null;
  } | null;
  EstadoEvento: {
    nombre: string;
  };
}
