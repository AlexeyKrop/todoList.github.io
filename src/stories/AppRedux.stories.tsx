import {ComponentMeta, ComponentStory} from "@storybook/react";
import React from "react";
import AppWithRedux from "../AppWithRedux";
import {Provider} from "react-redux";
import {store} from "../Bll/State/store";

export default {
  title: 'Todolist/AppWithRedux',
  component: AppWithRedux,

} as ComponentMeta<typeof AppWithRedux>
const Template: ComponentStory<typeof AppWithRedux> = (args) => (<Provider store={store}> <AppWithRedux/>  </Provider>);
export const AppWithReduxStories = Template.bind({});
AppWithReduxStories.args = {};
