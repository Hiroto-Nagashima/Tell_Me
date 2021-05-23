import { Story, Meta } from '@storybook/react';
import { NotebookModal } from './NotebookModal';

export default {
  title: 'organisms/NotebookModal',
  component: NotebookModal,
} as Meta;

const Template: Story = (args) => <NotebookModal {...args} />;

export const Default = Template.bind({});
Default.args = {};
