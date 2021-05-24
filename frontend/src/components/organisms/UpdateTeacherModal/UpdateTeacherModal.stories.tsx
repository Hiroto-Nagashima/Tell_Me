import { Story, Meta } from '@storybook/react';
import { Props, UpdateTeacherModal } from './UpdateTeacherModal';

export default {
  title: 'organisms/UpdateTeacherModal',
  component: UpdateTeacherModal,
} as Meta;

const Template: Story<Props> = (args) => <UpdateTeacherModal {...args} />;

export const Default = Template.bind({});
Default.args = {};
