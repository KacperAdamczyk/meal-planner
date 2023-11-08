import { LoadingOverlay } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { FC } from 'react';

interface Props {
  placeholderDate: Date;
}

export const CalendarPlaceholder: FC<Props> = ({ placeholderDate }) => (
  <div className="relative w-fit">
    <LoadingOverlay
      visible
      loaderProps={{ type: 'bars' }}
      overlayProps={{ radius: 'md', blur: 2 }}
    />
    <DatePicker date={placeholderDate} />
  </div>
);
