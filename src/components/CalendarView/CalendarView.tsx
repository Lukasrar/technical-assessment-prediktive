import dayjs from "dayjs";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";
import { DayView } from "./DayView";
import { MonthView } from "./MonthView";
import { WeekView } from "./WeekView";

export enum VIEW_MODES {
  MONTH = "MONTH",
  WEEK = "WEEK",
  DAY = "DAY",
}

export const VIEW_MODES_MAP = {
  MONTH: "Month",
  WEEK: "Week",
  DAY: "Day",
};

const variants = {
  enter: {
    opacity: 0,
    y: 20,
  },
  center: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      delay: 0.3,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
  },
};
interface CalendarViewProps {
  month: dayjs.Dayjs[][];
  viewMode: VIEW_MODES;
}

export const CalendarView = (props: CalendarViewProps) => {
  console.log(props.month);

  const Content = useMemo(() => {
    switch (props.viewMode) {
      case VIEW_MODES.DAY:
        return <DayView day={props.month[0][0]} />;
      case VIEW_MODES.WEEK:
        return <WeekView week={props.month[0]} />;
      case VIEW_MODES.MONTH:
        return <MonthView month={props.month} />;
      default:
        return null;
    }
  }, [props.month, props.viewMode]);

  const uniqueKey = `${props.viewMode}-${props.month.flat().join("-")}`;

  return (
    <AnimatePresence>
      <motion.div
        key={uniqueKey}
        initial="enter"
        animate="center"
        exit="exit"
        variants={variants}
        transition={{ duration: 0.2 }}
        style={{ width: "100%", height: "100%" }}
      >
        {Content}
      </motion.div>
    </AnimatePresence>
  );
};
