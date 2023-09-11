import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Button,
} from 'ui';
import { GetMealResult } from '@/db/actions/getMeals';
import { Wheat } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';

interface Props {
  calendarId: string;
  meals: GetMealResult;
}

export const MealsList: FC<Props> = ({ calendarId, meals }) => {
  return (
    <div>
      <div className="flex gap-2 align-middle">
        <h2 className="text-2xl">Meals</h2>
        <Button asChild variant="outline">
          <Link href={`/${calendarId}/meals/new`}>
            New Meal <Wheat className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
      <Table className="mt-2">
        <TableCaption>A list of meals</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Default type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {meals.map((meal) => (
            <TableRow key={meal.id}>
              <TableCell>{meal.name}</TableCell>
              <TableCell>{meal.defaultMealType ?? '-'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
