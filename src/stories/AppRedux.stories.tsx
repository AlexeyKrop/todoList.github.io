import {ComponentMeta, ComponentStory} from "@storybook/react";
import React from "react";
import AppWithRedux from "../AppWithRedux";
import {ReduxStoreDecorator} from "./ReduxStoreDecorator";

export default {
  title: 'Todolist/AppWithRedux',
  component: AppWithRedux,
  decorators:[ReduxStoreDecorator]
} as ComponentMeta<typeof AppWithRedux>
const Template: ComponentStory<typeof AppWithRedux> = () => <AppWithRedux/>;
export const AppWithReduxStories = Template.bind({});
AppWithReduxStories.args = {};
