import React from 'react';

import {AddItemForm} from '../Components/AddItemForm';
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {action} from "@storybook/addon-actions";

export default {
  title: 'Todolist/AddItemForm',
  component: AddItemForm,
  argTypes: {
    addItem: {
      description: 'button click in form'
    },
  },
} as ComponentMeta<typeof AddItemForm>
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const AddItemFormStories = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
AddItemFormStories.args = {
  addItem: action('button click in form')
};

