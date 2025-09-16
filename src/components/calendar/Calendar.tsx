"use client";
import React, { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { listCategories } from "@/app/admin/(others-pages)/categories/action";
import frLocale from '@fullcalendar/core/locales/fr';
import { DatesSetArg } from "@fullcalendar/core";

import {
  EventInput,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
} from "@fullcalendar/core";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";
import { toast } from "react-toastify";
import { addCalendar, editCalendar, listCalendars } from "@/app/admin/(others-pages)/calendar/action";
import { useSession } from "next-auth/react";


/**
 * Type pour l'événement stocké localement / utilisé par FullCalendar
 * extendedProps contient les infos personnalisées (service, patients, heures)
 */
interface CalendarEvent extends EventInput {
  extendedProps?: {
    service?: number;
    patients?: number;
    startTime?: string;
    endTime?: string;
    [key: string]: unknown;
  };
}

const Calendar: React.FC = () => {
  const { data: session } = useSession()
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const calendarRef = useRef<FullCalendar | null>(null); 
  const { isOpen, openModal, closeModal } = useModal();


  
  const [categories, setCategories] = useState<{ id: string | number; name: string }[]>(
    []
  );
  const [eventService, setEventService] = useState<number>(0);
  const [eventDate, setEventDate] = useState<string>(""); 
  const [eventStartTime, setEventStartTime] = useState<string>("");
  const [eventEndTime, setEventEndTime] = useState<string>(""); 
  const [eventPatients, setEventPatients] = useState<number>(1);

  const [currentViewDates, setCurrentViewDates] = useState<{ start: Date | null, end: Date | null }>({ start: null, end: null });
  

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
  }, [currentViewDates]);

   const handleDatesSet = async (dateInfo: DatesSetArg) => {
      // Convertir les dates en chaînes pour une comparaison facile
      const newStart = dateInfo.start.toISOString();
      const newEnd = dateInfo.end.toISOString();
      
      // Convertir l'état actuel pour la comparaison
      const oldStart = currentViewDates.start ? currentViewDates.start.toISOString() : null;
      const oldEnd = currentViewDates.end ? currentViewDates.end.toISOString() : null;
  
      // Vérifier si les dates ont réellement changé avant de mettre à jour l'état
      if (newStart !== oldStart || newEnd !== oldEnd) {
        const lists = await listCalendars(newStart,newEnd)
        
      setEvents(
        lists.data!.map((item: any) => ({
          id: item.id,
          title: item.category?.name ?? "Service",
          start: buildDateTimeIso(item.date.toISOString().split('T')[0], item.heureDebut),
          end: buildDateTimeIso(item.date.toISOString().split('T')[0], item.heureFin),
          allDay: false,
          extendedProps: {
            service: item.categoryId,
            patients: item.quantity,
            startTime: item.heureDebut,
            endTime: item.heureFin,
            date: item.date
          },
        }))
      );

      }else {
         setCurrentViewDates({
          start: null,
          end: null,
        });
      }
  
    };

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
  const handleAddOrUpdateEvent = async () => {
     if (!eventService || !eventEndTime || !eventDate || !eventStartTime || !eventPatients) {
      console.log("Champs manquants :", { eventService, eventDate, eventStartTime, eventEndTime, eventPatients });
      toast.error("Veuillez remplir tous les champs obligatoires.");
      return;
    }

  // ici tu continues normalement
  // console.log("Formulaire valide :", {
  //   eventService,
  //   eventDate,
  //   eventStartTime,
  //   eventEndTime,
  //   eventPatients,
  //   selectedEvent
  // });
    // construire start et end en combinant date + heure si fournies
    const startIso = buildDateTimeIso(eventDate, eventStartTime);
    const endIso = buildDateTimeIso(eventDate, eventEndTime) || startIso;

    if (selectedEvent) {
      const update = await editCalendar(Number(selectedEvent.id), eventService, eventDate, eventStartTime, eventEndTime, eventPatients)

      if(update.success){

      const item = update.data!
      setEvents((prev) =>
        prev.map((ev) =>
          (ev.id !== undefined && ev.id.toString() === (selectedEvent.id ?? "").toString())
            ? {
                ...ev,
                id: item.id.toString(),
                title: item.category?.name ?? "Service",
                start: buildDateTimeIso(item.date.toISOString().split('T')[0], item.heureDebut),
                end: buildDateTimeIso(item.date.toISOString().split('T')[0], item.heureFin),
                allDay: false,
                extendedProps: {
                  service: item.categoryId,
                  patients: item.quantity,
                  startTime: item.heureDebut,
                  endTime: item.heureFin,
                  date: item.date
                }
              }
            : ev
        )
      );
      console.log(events)
      toast.success(update.message)
      }else
        toast.error(update.message)


    } else {
      const add = await addCalendar(eventService,eventDate,eventStartTime,eventEndTime,eventPatients,session?.user?.id!)
      const item = add.data!
      if(add.success){
      const newEvent: CalendarEvent = {
         id: item.id.toString(),
          title: item.category?.name ?? "Service",
          start: buildDateTimeIso(item.date.toISOString().split('T')[0], item.heureDebut),
          end: buildDateTimeIso(item.date.toISOString().split('T')[0], item.heureFin),
          allDay: false,
          extendedProps: {
            service: item.categoryId,
            patients: item.quantity,
            startTime: item.heureDebut,
            endTime: item.heureFin,
            date: item.date
          }
        };
      
      setEvents((prev) => [...prev, newEvent]);
        toast.success(add.message)
      }else
        toast.error(add.message)
    }

    closeModal();
    resetModalFields();
  };

  // Réinitialiser champs
  const resetModalFields = () => {
    setSelectedEvent(null);
    setEventService(0);
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

  const renderEventContent = (eventInfo: EventContentArg) => {
    return (
      <div
        className={`event-fc-color fc-event-main fc-bg-primary p-1 rounded-sm w-25 `}
      >
        <div className="flex">
          <div className="fc-daygrid-event-dot"></div>
          <div className="fc-event-time">{eventInfo.timeText}</div>
        </div>
        <div className="fc-event-title">{eventInfo.event.title}</div>
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
         locale={frLocale}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next addEventButton",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          datesSet={handleDatesSet}
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
                onChange={(e) => setEventService(Number(e.target.value))}
                className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
              >
               <option value="0">Choisir</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
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
          
            // disabled={eventService = '' ? true : false || eventEndTime = '' ? true : false || eventDate = ''? true : false || eventStartTime = '' ? true : false || eventPatients = '' ? true : false}
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
