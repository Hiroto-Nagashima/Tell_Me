import { Story, Meta } from '@storybook/react';
import { Props, KidCard } from './KidCard';

export default {
  title: 'Molecules/KidCard',
  component: KidCard,
  argTypes: { onClick: { action: 'clicked' } },
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
  kidName: '山田太郎',
  age: 1,
  src: `https://d2hmx91pr90hgc.cloudfront.net/uploads/kid/image/5/image.jpeg`,
};
