import {AddItemForm} from "../Components/AddItemForm";
import {ComponentMeta} from "@storybook/react";

export default {
  title: 'Todolist/AddItemForm',
  component: AddItemForm,
  argTypes: {
    addItem: {
      description: 'button click in form'
    },
  },
} as ComponentMeta<typeof AddItemForm>