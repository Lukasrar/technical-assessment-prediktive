import dayjs, { Dayjs } from "dayjs";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { VIEW_MODES } from "../components/CalendarView/CalendarView";
import { getMonth } from "../helpers/getMonth";

interface Event {
  title: string;
  description: string;
  day: number;
  id: number;
}

function savedEventsReducer(
  state: Event[],
  action: { type: string; payload: Event }
) {
  switch (action.type) {
    case "create":
      return [...state, action.payload];
    case "update":
      return state.map((event: Event) =>
        event.id === action.payload.id ? action.payload : event
      );
    case "delete":
      return state.filter((event: Event) => event.id !== action.payload.id);
    default:
      return state;
  }
}

function getInitialEvents() {
  const storedEvents = localStorage.getItem("events");
  const parsedEvents = storedEvents ? JSON.parse(storedEvents) : [];

  return parsedEvents;
}

interface CalendarProvidersInterface {
  children: React.ReactNode;
}

interface CalendarContextProps {
  monthIndex: number;
  setMonthIndex(monthIndex: number): void;
  currentMonth: dayjs.Dayjs[][];
  setCurrentMonth(month: dayjs.Dayjs[][]): void;
  viewMode: VIEW_MODES;
  setViewMode(mode: VIEW_MODES): void;
  selectedDay: Dayjs;
  setSelectedDay(day: Dayjs): void;
  showModal: boolean;
  setShowModal(value: boolean): void;
  savedEvents: Event[];
  dispatchEvent(action: { type: string; payload: Event }): void;
  selectedEvent: Event | null;
  setSelectedEvent(event: Event | null): void;
}

export const CalendarContext = createContext<CalendarContextProps>({
  monthIndex: dayjs().month(),
  setMonthIndex: () => {},
  currentMonth: getMonth(),
  setCurrentMonth: (month: dayjs.Dayjs[][]) => {},
  viewMode: VIEW_MODES.MONTH,
  setViewMode: (mode: VIEW_MODES) => {},
  selectedDay: dayjs(),
  setSelectedDay: (day: Dayjs) => {},
  showModal: false,
  setShowModal: (value: boolean) => {},

  savedEvents: [],
  dispatchEvent: (action: { type: string; payload: Event }) => {},

  selectedEvent: null,
  setSelectedEvent: (event: Event | null) => {},
});

export const CalendarProvider = (props: CalendarProvidersInterface) => {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [currentMonth, setCurrentMonth] = useState<dayjs.Dayjs[][]>(getMonth());
  const [viewMode, setViewMode] = useState<VIEW_MODES>(VIEW_MODES.MONTH);
  const [selectedDay, setSelectedDay] = useState<Dayjs>(dayjs());
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const [savedEvents, dispatchEvent] = useReducer(
    savedEventsReducer,
    [],
    getInitialEvents
  );

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(savedEvents));
  }, [savedEvents]);

  useEffect(() => {
    if (!showModal) {
      setSelectedEvent(null);
    }
  }, [showModal]);

  return (
    <CalendarContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        currentMonth,
        setCurrentMonth,
        viewMode,
        setViewMode,
        selectedDay,
        setSelectedDay,
        showModal,
        setShowModal,
        savedEvents,
        dispatchEvent,
        selectedEvent,
        setSelectedEvent,
      }}
    >
      {props.children}
    </CalendarContext.Provider>
  );
};

export function useCalendarContext() {
  const calendarContext = useContext(CalendarContext);

  return calendarContext;
}
