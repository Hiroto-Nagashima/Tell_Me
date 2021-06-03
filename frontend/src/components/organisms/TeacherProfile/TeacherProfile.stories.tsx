import { Story, Meta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import {
  UserProvider,
} from '../../../providers/UserProvider';
import { TeacherProfile, Props } from './TeacherProfile';

export default {
  title: 'organisms/TeacherProfile',
  component: TeacherProfile,
  decorators: [
    (Story) => (
      <UserProvider>
        <BrowserRouter>
          <div style={{ margin: '5em' }}>
            <Story />
          </div>
        </BrowserRouter>
      </UserProvider>
    ),
  ],
} as Meta;

const Template: Story<Props> = (args) => {
  return <TeacherProfile {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  daycareName: '東京保育園',
  lastName: '高橋',
  firstName: '先生',
};
