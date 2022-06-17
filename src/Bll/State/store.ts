import {combineReducers, createStore} from 'redux'
import {taskReducer} from "../Reducers/taskReducer";
import {todolistReducer} from "../Reducers/todolistReducer";

const rootReducers = combineReducers({
  todoList: todolistReducer,
  tasks: taskReducer
})

export let store = createStore(rootReducers)
export type AppRootStateType = ReturnType<typeof rootReducers>
export type StoreType = typeof store
// @ts-ignore
window.store = store