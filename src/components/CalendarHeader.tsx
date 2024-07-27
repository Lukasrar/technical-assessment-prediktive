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
import { useCallback } from "react";

export const CalendarHeader = () => {
  const {
    monthIndex,
    setMonthIndex,
    viewMode,
    setViewMode,
    handleLeftArrow,
    handleRightArrow,
    setDayIndex,
    setWeekIndex,
  } = useCalendarContext();

  const handleReset = () => {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
  };

  const debouncedHandlePrevMonth = useDebounce(handleLeftArrow, 100);
  const debouncedHandleNextMonth = useDebounce(handleRightArrow, 100);

  const handleViewModeChange = useCallback(
    (mode: VIEW_MODES) => {
      setViewMode(mode);

      setDayIndex(0);
      setWeekIndex(0);
    },
    [setDayIndex, setWeekIndex, setViewMode]
  );

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
            aria-label="go back"
            icon={<ChevronLeftIcon />}
            variant={"ghost"}
          />
          <IconButton
            onClick={debouncedHandleNextMonth}
            aria-label="go forward"
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
          <MenuItem onClick={() => handleViewModeChange(VIEW_MODES.DAY)}>
            {VIEW_MODES_MAP[VIEW_MODES.DAY]}
          </MenuItem>
          <MenuItem onClick={() => handleViewModeChange(VIEW_MODES.WEEK)}>
            {VIEW_MODES_MAP[VIEW_MODES.WEEK]}
          </MenuItem>
          <MenuItem onClick={() => handleViewModeChange(VIEW_MODES.MONTH)}>
            {VIEW_MODES_MAP[VIEW_MODES.MONTH]}
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};
