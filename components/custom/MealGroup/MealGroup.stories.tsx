import { MealGroup } from '@/components/custom/MealGroup';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: MealGroup,
  tags: ['autodocs'],
} satisfies Meta<typeof MealGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    groupedMeals: {
      type: 'Breakfast',
      meals: [
        {
          calendarId: '1',
          mealId: '1',
          mealTypeId: '1',
          date: '2021-01-01',
          name: 'Meal 1',
        },
        {
          calendarId: '2',
          mealId: '2',
          mealTypeId: '2',
          date: '2021-01-01',
          name: 'Meal 2',
        },
      ],
    },
  },
};
