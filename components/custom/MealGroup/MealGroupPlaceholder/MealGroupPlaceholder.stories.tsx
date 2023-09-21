import { MealGroupPlaceholder } from '@/components/custom/MealGroup/MealGroupPlaceholder';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: MealGroupPlaceholder,
  tags: ['autodocs'],
} satisfies Meta<typeof MealGroupPlaceholder>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    rows: 3,
  },
};
