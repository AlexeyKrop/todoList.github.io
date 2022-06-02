import {AllTaskType} from "../../App";
import {v1} from "uuid";
import {TodolistACType} from "./todolistReducer";

let initialState: AllTaskType = {}
export const taskReducer = (tasks: AllTaskType = initialState, action: TaskACType): AllTaskType => {
  switch (action.type) {
    case "ADD_TASK":
      let newTask = {id: v1(), title: action.taskTitle, isDone: false};
      return {...tasks, [action.todoListId]: [newTask, ...tasks[action.todoListId]]}
    case "REMOVE_TASK":
      return {...tasks, [action.todoListId]: tasks[action.todoListId].filter(t => t.id !== action.taskId)}
    case "CHANGE_STATUS_INPUT":
      return {...tasks, [action.todoListId]: tasks[action.todoListId].map(t => t.id === action.currentId ? {...t, isDone: action.checkedValue}: t)}
    case "CHANGE_TASK_TITLE":
      return {...tasks, [action.todoListId]: tasks[action.todoListId].map(t => t.id === action.taskId ? {...t, title: action.newTitle}: t)}
    case "ADD_TODOLIST":
      return {...tasks, [v1()]: [],}
    case "REMOVE_TODOLIST":
      let copyState = {...tasks}
      delete copyState[action.todoListId]
      return copyState
    default:
      return tasks
  }
}


type TaskACType = AddTaskAT | RemoveTaskAT | OnChangeStatusInputAT | OnChangedTaskTitleAT | TodolistACType
type AddTaskAT = ReturnType<typeof addTaskAC>
type RemoveTaskAT = ReturnType<typeof removeTaskAC>
type OnChangeStatusInputAT = ReturnType<typeof onChangeStatusInputAC>
type OnChangedTaskTitleAT = ReturnType<typeof onChangedTaskTitleAC>

export const addTaskAC = (todoListId: string, title: string) => ({
  type: 'ADD_TASK',
  todoListId: todoListId,
  taskTitle: title
} as const)
export const removeTaskAC = (todoListId: string, taskId: string) => ({
  type: 'REMOVE_TASK',
  todoListId: todoListId,
  taskId: taskId
} as const)
export const onChangeStatusInputAC = (todoListId: string, currentId: string, checkValue: boolean) => ({type: 'CHANGE_STATUS_INPUT', todoListId: todoListId, currentId:currentId, checkedValue: checkValue}as const)
export const onChangedTaskTitleAC = (todoListId: string, taskId: string, newTitle: string) => ({type: 'CHANGE_TASK_TITLE', todoListId: todoListId, taskId:taskId, newTitle: newTitle}as const)