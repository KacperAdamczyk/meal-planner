import { CalendarPlaceholder } from '@/components/custom/CalendarPlaceholder';
import { DatePicker } from '@mantine/dates';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: CalendarPlaceholder,
} satisfies Meta<typeof CalendarPlaceholder>;

export default meta;

type Story = StoryObj<typeof CalendarPlaceholder>;

export const Reference: Story = {
  render: () => <DatePicker />,
};

export const Default: Story = {};
