import {v1} from "uuid";
import {TodoListType} from "../../App";

export const todolistReducer = (todolist: Array<TodoListType>, action: TodolistACType) => {
  switch (action.type) {
    case "ADD_TODOLIST":
      const newId = v1();
      const newToDoList: TodoListType = {
        id: newId,
        title: action.title,
        filter: 'all'
      }
      return [newToDoList, ...todolist]
    case "REMOVE_TODOLIST":
      return todolist.filter(t => t.id !== action.todoListId )
  }
}
type TodolistACType = AddTodolistAT | RemoveTodolistAT

type AddTodolistAT = ReturnType<typeof addTodolistAC>
type RemoveTodolistAT = ReturnType<typeof removeTodolistAC>

const addTodolistAC = (title: string) => {
  return {
    type: 'ADD_TODOLIST',
    title: title
  } as const
}
const removeTodolistAC = (todoListId: string) => {
  return {
    type: 'REMOVE_TODOLIST',
    todoListId: todoListId
  } as const
}
