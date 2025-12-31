import { ButtonNv } from "./ButtonNv";

interface DateNvProps {
  evento: {
    fecha: Date | string;
    texto: string;
    ciudad: string;
    teatro: string;
    link: string;
    Show: {
      nombre: string;
      urlImg: string;
    };
    EstadoEvento: {
      nombre: string;
    };
  };
  className?: string;
}

const estadoToButtonText = (estado: string) => {
  switch (estado) {
    case "Agotado":
      return "Agotado";
    case "Activo":
      return "Entradas disponibles";
    case "Informacion":
      return "Más información";
    case "Últimos":
      return "Últimas entradas";
    case "Pronto":
      return "Pronto";
    case "Neverland":
      return "¡Míralo acá!";
    case "Preventa Agotada":
      return "Preventa Agotada";
    default:
      return "Ver evento";
  }
};

const disabledState = (estado: string) => {
  switch (estado) {
    case "Agotado":
      return true;
    case "Preventa Agotada":
      return true;
    default:
      return false;
  }
};

export const DateNv = ({ evento, className }: DateNvProps) => {
  const buttonText = estadoToButtonText(evento.EstadoEvento.nombre);
  const isDisabled = disabledState(evento.EstadoEvento.nombre);

  return (
    <div
      className={`bg-[#242424] text-light p-6 min-h-100 lg:px-4 lg:py-2 flex flex-col justify-evenly items-center min-w-68 lg:min-w-80 h-auto rounded-xl border-2 ${className}`}
    >
      {/* Logo show */}
      <div>
        <img
          src={evento.Show.urlImg}
          alt={evento.Show.nombre}
          draggable={false}
          className="h-28 lg:h-44"
        />
      </div>

      {/* Info */}
      <div className="text-center text-base lg:text-xl uppercase font-bold">
        <p>{evento.texto}</p>
        <p>{evento.ciudad}</p>
        <p>{evento.teatro}</p>
      </div>

      {/* CTA */}
      <div className="w-full flex justify-center text-sm">
        <ButtonNv
          link={evento.link}
          disabled={isDisabled}
          buttonTextColor="light"
          className="w-9/10"
        >
          {buttonText}
        </ButtonNv>
      </div>
    </div>
  );
};
