import { Story, Meta } from '@storybook/react';
import { Props, UpdateModal } from './UpdateModal';

export default {
  title: 'organisms/UpdaterModal',
  component: UpdateModal,
} as Meta;

const Template: Story<Props> = (args) => <UpdateModal {...args} />;

export const Default = Template.bind({});
Default.args = {};
