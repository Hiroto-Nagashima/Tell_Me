import { Story, Meta } from '@storybook/react';
import { NotebookTemplate, Props } from './NotebookTemplate';

export default {
  title: 'organisms/NotebookTemplate',
  component: NotebookTemplate,
} as Meta;

const Template: Story<Props> = (args) => <NotebookTemplate {...args} />;

export const Default = Template.bind({});
Default.args = {
  dinner: 'ハンバーグ、カレー',
  breakfast: '納豆ご飯',
  hasBathed: true,
};
