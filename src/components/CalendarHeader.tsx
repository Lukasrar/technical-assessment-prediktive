import {
  Button,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { useCalendarContext } from "../providers/CalendarProvider";
import dayjs from "dayjs";
import { VIEW_MODES, VIEW_MODES_MAP } from "./CalendarView/CalendarView";
import useDebounce from "../helpers/useDebounce";

export const CalendarHeader = () => {
  const { monthIndex, setMonthIndex, viewMode, setViewMode } =
    useCalendarContext();

  const handlePrevMonth = () => {
    setMonthIndex(monthIndex - 1);
  };

  const handleNextMonth = () => {
    setMonthIndex(monthIndex + 1);
  };

  const handleReset = () => {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
  };

  const debouncedHandlePrevMonth = useDebounce(handlePrevMonth, 300);
  const debouncedHandleNextMonth = useDebounce(handleNextMonth, 300);

  return (
    <Flex
      p={"10px 20px"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Flex alignItems={"center"} gap={"10px"}>
        <Button onClick={handleReset} variant={"outline"}>
          Today
        </Button>

        <Flex gap={"5px"}>
          <IconButton
            onClick={debouncedHandlePrevMonth}
            aria-label="Search database"
            icon={<ChevronLeftIcon />}
            variant={"ghost"}
          />
          <IconButton
            onClick={debouncedHandleNextMonth}
            aria-label="Search database"
            icon={<ChevronRightIcon />}
            variant={"ghost"}
          />
        </Flex>

        <Text fontWeight={"bold"} color={"gray.600"}>
          {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
        </Text>
      </Flex>

      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          {VIEW_MODES_MAP[viewMode]}
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => setViewMode(VIEW_MODES.DAY)}>
            {VIEW_MODES_MAP[VIEW_MODES.DAY]}
          </MenuItem>
          <MenuItem onClick={() => setViewMode(VIEW_MODES.WEEK)}>
            {VIEW_MODES_MAP[VIEW_MODES.WEEK]}
          </MenuItem>
          <MenuItem onClick={() => setViewMode(VIEW_MODES.MONTH)}>
            {VIEW_MODES_MAP[VIEW_MODES.MONTH]}
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};
