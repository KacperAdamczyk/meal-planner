'use client';

import {
  MantineColorsTuple,
  MantineProvider,
  createTheme,
} from '@mantine/core';
import { FC, PropsWithChildren } from 'react';

const blueGray: MantineColorsTuple = [
  '#f3f3fe',
  '#e4e6ed',
  '#c8cad3',
  '#a9adb9',
  '#9093a4',
  '#808496',
  '#767c91',
  '#656a7e',
  '#585e72',
  '#4a5167',
];

const paleBlue: MantineColorsTuple = [
  '#eef3ff',
  '#dce4f5',
  '#b9c7e2',
  '#94a8d0',
  '#748dc1',
  '#5f7cb8',
  '#5474b4',
  '#44639f',
  '#39588f',
  '#2d4b81',
];

const theme = createTheme({
  primaryColor: 'pale-blue',
  colors: {
    'blue-gray': blueGray,
    'pale-blue': paleBlue,
  },
});
export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => (
  <MantineProvider theme={theme}>{children}</MantineProvider>
);
