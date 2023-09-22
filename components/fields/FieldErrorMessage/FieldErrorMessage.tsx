'use client';
import { ErrorMessage } from '@hookform/error-message';
import { FC, useEffect, useState } from 'react';

interface Props {
  name: string;
}

export const FieldErrorMessage: FC<Props> = ({ name }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <ErrorMessage
      name={name}
      render={({ message }) => <p className="text-red-500">{message}</p>}
    />
  );
};
