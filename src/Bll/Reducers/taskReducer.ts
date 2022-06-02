import {AllTaskType} from "../../App";
import {v1} from "uuid";

export const taskReducer = (tasks: AllTaskType, action:TaskACType) => {
  switch (action.type) {
    case "ADD_TASK":
      let newTask = {id: v1(), title: action.taskTitle, isDone: false};
      return {...tasks, [action.todoListId]: [newTask, ...tasks[action.todoListId]]}
  }
}







type TaskACType = AddTaskAT
type AddTaskAT = ReturnType<typeof addTaskAC>
export const addTaskAC = (todoListId: string, title: string) =>({type: 'ADD_TASK',todoListId: todoListId, taskTitle: title})