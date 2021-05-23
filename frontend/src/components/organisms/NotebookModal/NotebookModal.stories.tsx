import { Story, Meta } from '@storybook/react';
import { NotebookModal, Props } from './NotebookModal';

export default {
  title: 'organisms/NotebookModal',
  component: NotebookModal,
} as Meta;

const Template: Story<Props> = (args) => <NotebookModal {...args} />;

export const Default = Template.bind({});
Default.args = {
  date: '4月11日',
  memo: 'とても元気です',
  dinner: 'ハンバーグ、カレー',
  breakfast: '納豆ご飯',
  bodyTemperature: 36,
  hasBathed: true,
};
