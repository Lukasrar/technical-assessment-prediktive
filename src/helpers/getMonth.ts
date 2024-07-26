import dayjs from "dayjs";

export function getMonth(month?: number) {
  let mon = month ? Math.floor(month) : dayjs().month();

  const year = dayjs().year();

  const firstDayOfTheMonth = dayjs(new Date(year, mon, 1)).day();

  let currentMonthCount = 0 - firstDayOfTheMonth;

  const daysMatrix = new Array(5).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonthCount++;

      return dayjs(new Date(year, mon, currentMonthCount));
    });
  });

  return daysMatrix;
}
