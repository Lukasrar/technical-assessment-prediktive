import { Box, Flex, GridItem, Text } from "@chakra-ui/react";
import dayjs, { Dayjs } from "dayjs";
import { useMemo } from "react";
import { useCalendarContext } from "../providers/CalendarProvider";

interface DayProps {
  day: Dayjs;
  rowIndex: number;
}

export const Day = (props: DayProps) => {
  const { setSelectedDay, setShowModal, savedEvents, setSelectedEvent } =
    useCalendarContext();

  const eventsForThisDay = useMemo(() => {
    return savedEvents.filter(
      (evt) =>
        dayjs(evt.startDate).format("DD-MM-YY") === props.day.format("DD-MM-YY")
    );
  }, [savedEvents, props.day]);

  return (
    <GridItem
      border={"1px solid"}
      borderColor={"gray.100"}
      p={"20px"}
      display="flex"
      flexDirection={"column"}
      width={"100%"}
      height={"100%"}
      cursor={"pointer"}
      onClick={() => {
        setSelectedDay(props.day);
        setShowModal(true);
      }}
    >
      <Flex flexDirection={"column"} alignItems={"center"}>
        {props.rowIndex === 0 && (
          <Text fontSize={"12px"} fontWeight={"bold"} color={"gray.700"}>
            {props.day.format("ddd").toUpperCase()}
          </Text>
        )}

        <Text
          fontSize={"12px"}
          fontWeight={"400"}
          color={"gray.1000"}
          borderRadius={"5px"}
          p={"5px"}
          backgroundColor={
            props.day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
              ? "blue.400"
              : "white"
          }
        >
          {props.day.format("DD")}
        </Text>

        <Flex flexDirection={"column"} gap={"2px"}>
          {eventsForThisDay.map((event) => (
            <Box
              cursor={"pointer"}
              key={event.id}
              bg={"blue.400"}
              borderRadius={"6px"}
              p={"2px 5px"}
              onClick={() => setSelectedEvent(event)}
            >
              <Text fontSize={"10px"} fontWeight={"bold"} color={"white"}>
                {event.title}
              </Text>
            </Box>
          ))}
        </Flex>
      </Flex>
    </GridItem>
  );
};
