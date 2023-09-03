import {
  add,
  endOfMonth,
  formatISO,
  getDay,
  set,
  startOfMonth,
  sub,
} from 'date-fns';

export const getMonthBoundary = (
  month: number,
  year: number,
): [string, string] => {
  const date = set(new Date(), {
    month,
    year,
  });
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);

  const offsetMonthStart = sub(monthStart, { days: getDay(monthStart) });
  const offsetMonthEnd = add(monthEnd, { days: getDay(monthEnd) });

  const offsetMonthStartISO = formatISO(offsetMonthStart, {
    representation: 'date',
  });
  const offsetMonthEndISO = formatISO(offsetMonthEnd, {
    representation: 'date',
  });

  return [offsetMonthStartISO, offsetMonthEndISO];
};
