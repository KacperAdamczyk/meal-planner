import { LoadingOverlay,} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { FC } from 'react';

export const CalendarPlaceholder: FC = () => {
  return (
    <LoadingOverlay visible overlayProps={{ radius: 'sm', blur: 2 }}>
      <DatePicker />
    </LoadingOverlay>
  );
};
