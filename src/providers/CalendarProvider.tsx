import dayjs from "dayjs";
import { createContext, useContext, useState } from "react";
import { VIEW_MODES } from "../components/CalendarView/CalendarView";
import { getMonth } from "../helpers/getMonth";

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
}

export const CalendarContext = createContext<CalendarContextProps>({
  monthIndex: dayjs().month(),
  setMonthIndex: () => {},
  currentMonth: getMonth(),
  setCurrentMonth: (month: dayjs.Dayjs[][]) => {},
  viewMode: VIEW_MODES.MONTH,
  setViewMode: (mode: VIEW_MODES) => {},
});

export const CalendarProvider = (props: CalendarProvidersInterface) => {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [currentMonth, setCurrentMonth] = useState<dayjs.Dayjs[][]>(getMonth());
  const [viewMode, setViewMode] = useState<VIEW_MODES>(VIEW_MODES.MONTH);

  return (
    <CalendarContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        currentMonth,
        setCurrentMonth,
        viewMode,
        setViewMode,
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
