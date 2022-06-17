import {ComponentMeta, ComponentStory} from "@storybook/react";
import {EditableSpan} from "../Components/EditableSpan";
import React from "react";
import {action} from "@storybook/addon-actions";

export default {
  title: 'Todolist/EditableSpan',
  component: EditableSpan,
  argTypes : {
    onClick: {
      description: 'button onclick'
    }
  }
} as ComponentMeta<typeof EditableSpan>
const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;
export const EditableSpanStories = Template.bind({})

