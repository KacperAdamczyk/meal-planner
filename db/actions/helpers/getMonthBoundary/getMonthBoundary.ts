import { endOfMonth, formatISO, set, setDay, startOfMonth } from 'date-fns';

export const getMonthBoundary = (
  month: number,
  year: number,
): [string, string] => {
  const utcDate = set(new Date(), {
    month,
    year,
  });

  const monthStart = startOfMonth(utcDate);
  const monthEnd = endOfMonth(utcDate);

  const offsetMonthStart = setDay(monthStart, 0);
  const offsetMonthEnd = setDay(monthEnd, 6);

  const offsetMonthStartISO = formatISO(offsetMonthStart, {
    representation: 'date',
  });
  const offsetMonthEndISO = formatISO(offsetMonthEnd, {
    representation: 'date',
  });

  return [offsetMonthStartISO, offsetMonthEndISO];
};
