import { Story, Meta } from '@storybook/react';
import { Props, UpdateParentModal } from './UpdateParentModal';

export default {
  title: 'pending/UpdateParentModal',
  component: UpdateParentModal,
} as Meta;

const Template: Story<Props> = (args) => <UpdateParentModal {...args} />;

export const Default = Template.bind({});
Default.args = {};
