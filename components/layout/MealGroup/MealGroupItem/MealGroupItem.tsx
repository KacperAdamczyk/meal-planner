import { FC } from 'react';

interface Props {
  id: string;
  name: string;
}

export const MealGroupItem: FC<Props> = ({ id, name }) => (
  <div key={id} className="rounded bg-secondary p-2">
    {name}
  </div>
);
