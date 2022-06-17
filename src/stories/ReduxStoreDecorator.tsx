import React from 'react'
import {combineReducers, legacy_createStore} from "redux";
import {todolistReducer} from "../Bll/Reducers/todolistReducer";
import {AppRootStateType} from "../Bll/State/store";
import {taskReducer} from "../Bll/Reducers/taskReducer";
import {Provider} from "react-redux";
import {v1} from "uuid";


const rootReducer = combineReducers({
  tasks: taskReducer,
  todoList: todolistReducer
})

const initialGlobalState = {
  todoList: [
    {id: "todolistId1", title: "What to learn", filter: "all"},
    {id: "todolistId2", title: "What to buy", filter: "all"}
  ] ,
  tasks: {
    ["todolistId1"]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true}
    ],
    ["todolistId2"]: [
      {id: v1(), title: "Milk", isDone: true},
      {id: v1(), title: "React Book", isDone: true}
    ]
  }
};

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType);
export const ReduxStoreDecorator = (storyFn: () => React.ReactElement ) => <Provider store={storyBookStore}>{storyFn()}</Provider>