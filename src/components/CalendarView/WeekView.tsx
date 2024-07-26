import { Grid } from "@chakra-ui/react";
import { Dayjs } from "dayjs";
import { Day } from "../Day";

interface WeekViewProps {
  week: Dayjs[];
}

export const WeekView = (props: WeekViewProps) => {
  return (
    <Grid
      flex="1"
      templateColumns="repeat(7, 1fr)"
      templateRows="repeat(1, 1fr)"
      width={"100%"}
      height={"100%"}
    >
      {props.week.map((day, index) => (
        <Day day={day} key={index} rowIndex={0} />
      ))}
    </Grid>
  );
};
