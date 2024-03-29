'use client';
import { LinkButton } from '@/components/composite/LinkButton';
import { GetMealsResult } from '@/db/queries/getMeals';
import { Table } from '@mantine/core';
import { IconBaguette } from '@tabler/icons-react';
import { FC } from 'react';

interface Props {
  calendarId: string;
  meals: GetMealsResult[];
}

export const MealsList: FC<Props> = ({ calendarId, meals }) => {
  return (
    <div>
      <div className="flex gap-2 align-middle">
        <h2 className="text-2xl">Meals</h2>
        <LinkButton href={`/${calendarId}/meals/new`}>
          New Meal <IconBaguette />
        </LinkButton>
      </div>
      <Table className="mt-2" withTableBorder highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Default type</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {meals.map((meal) => (
            <Table.Tr key={meal.id}>
              <Table.Td>{meal.name}</Table.Td>
              <Table.Td>{meal.defaultMealType ?? '-'}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  );
};
