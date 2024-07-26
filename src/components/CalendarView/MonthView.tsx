import { Grid } from "@chakra-ui/react";
import dayjs, { Dayjs } from "dayjs";
import React from "react";
import { Day } from "../Day";

interface MonthViewProps {
  month: dayjs.Dayjs[][];
}

const renderDays = (days: Dayjs[], rowIndex: number) => {
  return days.map((day, index) => (
    <Day day={day} key={index} rowIndex={rowIndex} />
  ));
};

export const MonthView = (props: MonthViewProps) => {
  return (
    <Grid
      flex="1"
      templateColumns="repeat(7, 1fr)"
      templateRows="repeat(5, 1fr)"
      width={"100%"}
      height={"100%"}
    >
      {props.month.map((row: dayjs.Dayjs[], i: number) => (
        <React.Fragment key={i}>{renderDays(row, i)}</React.Fragment>
      ))}
    </Grid>
  );
};
