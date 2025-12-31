"use client";

import React from "react";
import type { Evento } from "../../types/evento";
import { EventSectionNv } from "./EventSectionNv";

interface EventSectionProps {
  title?: string;
  events: Evento[];
  id: string;
}

export const EventsNv: React.FC<EventSectionProps> = ({
  title,
  events,
  id,
}) => {
  const getMonthKey = (date: Date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

  const eventsByMonth = events.reduce<Record<string, Evento[]>>(
    (acc, evento) => {
      const date = new Date(evento.fecha);
      const key = getMonthKey(date);

      if (!acc[key]) acc[key] = [];
      acc[key].push(evento);

      return acc;
    },
    {}
  );

  const orderedMonthKeys = Object.keys(eventsByMonth).sort();

  const formatMonthTitle = (key: string) => {
    const [year, month] = key.split("-");
    const date = new Date(Number(year), Number(month) - 1);

    return (
      date
        .toLocaleString("es-CL", { month: "long" })
        .replace(/^\w/, (c) => c.toUpperCase()) +
      " " +
      year
    );
  };

  return (
    <section
      className="w-full bg-dark text-light overflow-x-hidden mb-10 flex flex-col items-center px-4"
      id={id}
    >
      {title && (
        <h3 className="text-3xl lg:text-7xl font-extrabold mb-4">{title}</h3>
      )}

      {orderedMonthKeys.map((monthKey) => (
        <EventSectionNv
          key={monthKey}
          title={formatMonthTitle(monthKey)}
          events={eventsByMonth[monthKey]}
          className=""
        />
      ))}
    </section>
  );
};
