import type { Preview } from '@storybook/react';
import { MantineProvider } from '@mantine/core';

import '@/app/globals.css';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <MantineProvider>
        <Story />
      </MantineProvider>
    ),
  ],
};

export default preview;
