import { LinkButton } from '@/components/composite/LinkButton';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { GetMealsResult } from '@/db/actions/getMeals';
import { Wheat } from 'lucide-react';
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
          New Meal <Wheat className="ml-2 h-4 w-4" />
        </LinkButton>
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
