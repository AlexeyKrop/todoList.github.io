import {ComponentMeta, ComponentStory} from "@storybook/react";
import {Task} from "../Components/Task";
import React from "react";
import {action} from "@storybook/addon-actions";

export default {
  title: 'Todolist/Task',
  component: Task,
  args:{
    todoListId: 'dfgdfg',
    removeTask: action('removeTask'),
    onChangeStatusInputHandler: action('onChangeStatusInputHandler'),
    changeTaskHandler: action('changeTaskHandler')
  }
} as ComponentMeta<typeof Task>
const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;
export const TaskIsDoneStories = Template.bind({});
TaskIsDoneStories.args = {
  tasks: [{id: 'dsfds', isDone: true, title: 'JS'}],
};
export const TaskIsNotDoneStories = Template.bind({});
TaskIsNotDoneStories.args = {
  tasks: [{id: 'dsfds', isDone: false, title: 'JS'}],
};