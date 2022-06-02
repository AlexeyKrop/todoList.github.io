import {AllTaskType} from "../../App";
import {v1} from "uuid";

export const taskReducer = (tasks: AllTaskType, action: TaskACType) => {
  switch (action.type) {
    case "ADD_TASK":
      let newTask = {id: v1(), title: action.taskTitle, isDone: false};
      return {...tasks, [action.todoListId]: [newTask, ...tasks[action.todoListId]]}
    case "REMOVE_TASK":
      return {...tasks, [action.todoListId]: tasks[action.todoListId].filter(t => t.id !== action.taskId)}
  }
}


type TaskACType = AddTaskAT | RemoveTaskAT
type AddTaskAT = ReturnType<typeof addTaskAC>
type RemoveTaskAT = ReturnType<typeof removeTaskAC>
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