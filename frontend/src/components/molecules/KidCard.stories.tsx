import { Story, Meta } from '@storybook/react';
import { Props, KidCard } from './KidCard';

export default {
  title: 'Molecules/KidCard',
  component: KidCard,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        <Story />
      </div>
    ),
  ],
} as Meta;

const Template: Story<Props> = (args) => <KidCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  kidName: "山田太郎",
  age:1
};
