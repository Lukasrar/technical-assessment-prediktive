import { Grid } from "@chakra-ui/react";
import { Dayjs } from "dayjs";
import { Day } from "../Day";

interface DayViewProps {
  day: Dayjs;
}

export const DayView = (props: DayViewProps) => {
  return (
    <Grid
      flex="1"
      templateColumns="repeat(1, 1fr)"
      templateRows="repeat(1, 1fr)"
      width={"100%"}
      height={"100%"}
    >
      <Day day={props.day} rowIndex={0} />
    </Grid>
  );
};
