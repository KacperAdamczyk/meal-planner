import { Header } from '@/components/custom/Header';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: Header,
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    header: 'Header',
    headerItalic: 'Italic',
    subHeader: 'Sub Header',
    subHeaderItalic: 'Italic',
    children: <div className="border border-red-500 p-2">Actions</div>,
  },
};
