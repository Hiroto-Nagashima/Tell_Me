import { Story, Meta } from '@storybook/react';
import { UpdateKidModal} from './UpdateKidModal';

export default {
  title: 'organisms/UpdateKidModal',
  component: UpdateKidModal,
} as Meta;

const Template: Story = (args) => <UpdateKidModal {...args} />;

export const Default = Template.bind({});
Default.args = {

};
