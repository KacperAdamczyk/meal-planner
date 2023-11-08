import { Card, CardSection, Skeleton } from '@mantine/core';
import { FC } from 'react';

interface Props {
  rows: number;
}

export const MealGroupPlaceholder: FC<Props> = ({ rows }) => (
  <Card>
    <CardSection inheritPadding>
      <div className="flex flex-col gap-2">
        {Array.from({ length: rows }).map((_, i) => (
          <Skeleton key={i} height={40} />
        ))}
      </div>
    </CardSection>
  </Card>
);
