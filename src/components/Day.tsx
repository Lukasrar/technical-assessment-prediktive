import { Flex, GridItem, Text } from "@chakra-ui/react";
import dayjs, { Dayjs } from "dayjs";

interface DayProps {
  day: Dayjs;
  rowIndex: number;
}

export const Day = (props: DayProps) => {
  return (
    <GridItem
      border={"1px solid"}
      borderColor={"gray.100"}
      p={"20px"}
      display="flex"
      flexDirection={"column"}
      width={"100%"}
      height={"100%"}
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
      </Flex>
    </GridItem>
  );
};
