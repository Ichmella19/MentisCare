"use client";
import React, { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { listCategories } from "@/app/admin/(others-pages)/categories/action";

import {
  EventInput,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
} from "@fullcalendar/core";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";
import { toast } from "react-toastify";


/**
 * Type pour l'événement stocké localement / utilisé par FullCalendar
 * extendedProps contient les infos personnalisées (service, patients, heures)
 */
interface CalendarEvent extends EventInput {
  extendedProps?: {
    service?: string;
    patients?: number;
    startTime?: string;
    endTime?: string;
    [key: string]: unknown;
  };
}

const Calendar: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const calendarRef = useRef<unknown>(null); 
  const { isOpen, openModal, closeModal } = useModal();


  
  const [categories, setCategories] = useState<{ id: string | number; name: string }[]>(
    []
  );
  const [eventService, setEventService] = useState<string>("");
  const [eventDate, setEventDate] = useState<string>(""); 
  const [eventStartTime, setEventStartTime] = useState<string>("");
  const [eventEndTime, setEventEndTime] = useState<string>(""); 
  const [eventPatients, setEventPatients] = useState<number>(1);

 useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await listCategories();
        if (result.success && result.data) {
          setCategories(result.data);
        } else {
          setCategories([]);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des catégories :", error);
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  // Quand l'utilisateur sélectionne une plage dans le calendrier
  const handleDateSelect = (selectInfo: DateSelectArg) => {
    resetModalFields();
    // selectInfo.startStr contient la date en yyyy-mm-dd ou datetime selon selection
    setEventDate(selectInfo.startStr.split("T")[0]);
    openModal();
  };

  // Quand l'utilisateur clique sur un événement
  const handleEventClick = (clickInfo: EventClickArg) => {
    const ev = clickInfo.event;
    const ext = ev.extendedProps || {};
    setSelectedEvent({
      id: ev.id,
      title: ev.title,
      start: ev.start ? ev.start.toISOString() : undefined,
      end: ev.end ? ev.end.toISOString() : undefined,
      extendedProps: {
        service: ext.service || ev.title,
        patients: ext.patients ?? 1,
        startTime: ext.startTime ?? (ev.start ? formatTime(ev.start) : ""),
        endTime: ext.endTime ?? (ev.end ? formatTime(ev.end) : ""),
      },
    });

    // Préremplir les champs du modal
    setEventService(ext.service ?? ev.title ?? "");
    if (ev.start) {
      setEventDate(ev.start.toISOString().split("T")[0]);
      setEventStartTime(ext.startTime ?? formatTime(ev.start));
    }
    if (ev.end) {
      setEventEndTime(ext.endTime ?? formatTime(ev.end));
    }
    setEventPatients(ext.patients ?? 1);

    openModal();
  };

  // Ajout ou modification d'un événement
  const handleAddOrUpdateEvent = () => {
     if (!eventService || !eventEndTime || !eventDate || !eventStartTime || !eventPatients) {
    toast.error("Veuillez remplir tous les champs obligatoires.");
    return;
  }

  // ici tu continues normalement
  console.log("Formulaire valide :", {
    eventService,
    eventDate,
    eventStartTime,
    eventEndTime,
    eventPatients,
  });
    // construire start et end en combinant date + heure si fournies
    const startIso = buildDateTimeIso(eventDate, eventStartTime);
    const endIso = buildDateTimeIso(eventDate, eventEndTime) || startIso;

    if (selectedEvent) {
      // modifier
      setEvents((prev) =>
        prev.map((ev) =>
          ev.id === selectedEvent.id
            ? {
                ...ev,
                title: eventService || `Service`,
                start: startIso,
                end: endIso,
                allDay: false,
                extendedProps: {
                  ...ev.extendedProps,
                  service: eventService,
                  patients: eventPatients,
                  startTime: eventStartTime,
                  endTime: eventEndTime,
                },
              }
            : ev
        )
      );
    } else {
      // ajouter
      const newEvent: CalendarEvent = {
        id: Date.now().toString(),
        title: eventService || "Service",
        start: startIso,
        end: endIso,
        allDay: false,
        extendedProps: {
          service: eventService,
          patients: eventPatients,
          startTime: eventStartTime,
          endTime: eventEndTime,
        },
      };
      setEvents((prev) => [...prev, newEvent]);
    }

    closeModal();
    resetModalFields();
  };

  // Réinitialiser champs
  const resetModalFields = () => {
    setSelectedEvent(null);
    setEventService("");
    setEventDate("");
    setEventStartTime("");
    setEventEndTime("");
    setEventPatients(1);
  };

  // Helper : construire ISO datetime (YYYY-MM-DDTHH:MM:00) ou retourner date-only si pas d'heure
  const buildDateTimeIso = (date: string, time: string) => {
    if (!date) return undefined;
    if (time) {
      // garantir seconds
      const t = time.length === 5 ? `${time}:00` : time;
      return `${date}T${t}`;
    }
    return date; // fullcalendar acceptera date-only (allDay) — on gère allDay=false ci-dessus
  };

  // helper pour formater une Date en HH:MM
  const formatTime = (d: Date) => {
    const hh = `${d.getHours()}`.padStart(2, "0");
    const mm = `${d.getMinutes()}`.padStart(2, "0");
    return `${hh}:${mm}`;
  };

  // rendu de l'événement (petit badge dans le calendrier)
  const renderEventContent = (eventInfo: EventContentArg) => {
    const svc = (eventInfo.event.extendedProps?.service ??
      eventInfo.event.title ??
      "Service") as string;
    const patients = eventInfo.event.extendedProps?.patients ?? null;
    const timeText = eventInfo.timeText || "";

    return (
      <div className="flex items-center gap-2 p-1">
        <div className="text-xs font-semibold">{svc}</div>
        <div className="text-xs opacity-70">{timeText}</div>
        {patients ? (
          <div className="ml-1 text-xs text-gray-600">({patients})</div>
        ) : null}
      </div>
    );
  };

  return (
    <div
      className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <div className="custom-calendar">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next addEventButton",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          events={events}
          selectable={true}
          select={(info: DateSelectArg) => handleDateSelect(info)}
          eventClick={(info: EventClickArg) => handleEventClick(info)}
          eventContent={(info: EventContentArg) => renderEventContent(info)}
          customButtons={{
            addEventButton: {
              text: "Ajouter un créneau +",
              click: openModal,
            },
          }}
        />
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          closeModal();
          resetModalFields();
        }}
        className="max-w-[700px] p-6 lg:p-10 text-black dark:text-white"
      >
        <div className="flex flex-col px-2 overflow-y-auto custom-scrollbar">
          <div>
            <h5 className="mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl">
              {selectedEvent ? "Modifier un créneau" : "Ajouter un créneau"}
            </h5>
            <p className="text-sm">
              Planifiez vos prochains créneaux : programmez ou modifiez un créneau
              pour vos patients afin de rester organisé.
            </p>
          </div>

          <div className="mt-8">
            {/* Service (select based on categories) */}
            <div className="mb-6">
              <label className="mb-1.5 block text-sm font-medium">
                Service (catégorie de maladie)
              </label>
              <select
                value={eventService}
                onChange={(e) => setEventService(e.target.value)}
                className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
              >
               
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div className="mb-6">
              <label className="mb-1.5 block text-sm font-medium">Date</label>
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
              />
            </div>

            {/* start / end / patients in a row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium">Heure de début</label>
                <input
                  type="time"
                  value={eventStartTime}
                  onChange={(e) => setEventStartTime(e.target.value)}
                  className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-3 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium">Heure de fin</label>
                <input
                  type="time"
                  value={eventEndTime}
                  onChange={(e) => setEventEndTime(e.target.value)}
                  className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-3 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium">Patients max</label>
                <select
                  value={eventPatients}
                  onChange={(e) => setEventPatients(Number(e.target.value))}
                  className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-3 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Boutons */}
          <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end">
            <button
              onClick={() => {
                closeModal();
                resetModalFields();
              }}
              type="button"
              className="flex w-full justify-center rounded-lg border border-gray-300 bg-black px-4 py-2.5 text-sm font-medium text-white dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-black sm:w-auto"
            >
              Annuler
            </button>
            <button
          
            disabled={!eventService || !eventEndTime || !eventDate || !eventStartTime || !eventPatients}
              onClick={handleAddOrUpdateEvent}
              type="button"
              className="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-[#08A3DC] px-4 py-2.5 text-sm font-medium text-white sm:w-auto"
            >
              {selectedEvent ? "Mettre à jour" : "Ajouter"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Calendar;
