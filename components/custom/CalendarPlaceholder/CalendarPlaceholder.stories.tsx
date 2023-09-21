import { CalendarPlaceholder } from '@/components/custom/CalendarPlaceholder';
import { Calendar } from '@/components/ui/calendar';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: CalendarPlaceholder,
} satisfies Meta<typeof CalendarPlaceholder>;

export default meta;

type Story = StoryObj<typeof CalendarPlaceholder>;

export const Reference: Story = {
  render: () => <Calendar />,
};

export const Default: Story = {};
