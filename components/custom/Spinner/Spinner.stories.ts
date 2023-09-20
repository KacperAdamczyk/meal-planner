import { Spinner } from '@/components/custom/Spinner';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: Spinner,
  tags: ['docsgen'],
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
