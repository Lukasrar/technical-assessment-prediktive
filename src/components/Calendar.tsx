import { Box } from "@chakra-ui/layout";
import * as React from "react";
import { getMonth } from "../helpers/getMonth";
import { useCalendarContext } from "../providers/CalendarProvider";
import { CalendarHeader } from "./CalendarHeader";
import { CalendarView, VIEW_MODES } from "./CalendarView/CalendarView";

export const Calendar = () => {
  const { monthIndex, currentMonth, setCurrentMonth, viewMode } =
    useCalendarContext();

  React.useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <Box w={"100%"} height={"100vh"}>
      <CalendarHeader />

      <CalendarView month={currentMonth} viewMode={viewMode} />
    </Box>
  );
};
