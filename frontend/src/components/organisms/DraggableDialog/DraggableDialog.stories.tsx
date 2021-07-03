import { Story, Meta } from '@storybook/react';
import { Props, DraggableDialog } from './DraggableDialog';

export default {
  title: 'Organisms/DraggableDialog',
  component: DraggableDialog,
  argTypes: {
    onClickOK: { action: 'clicked' },
    onClickClose: { action: 'clicked' },
  },
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        <Story />
      </div>
    ),
  ],
} as Meta;

const Template: Story<Props> = (args) => <DraggableDialog {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'ログアウト',
  content: '本当にログアウトしますか？',
  isOpen: true,
  okLabel: 'OK',
};
