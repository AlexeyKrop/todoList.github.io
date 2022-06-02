import {v1} from "uuid";
import {FilterValuesType, TodoListType} from "../../App";

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
    case "CHANGE_TITLE_IN_TODOLIST":
      return todolist.map(t=> t.id === action.todoListId ? {...t, filter: action.filterValue} : t)
  }
}
type TodolistACType = AddTodolistAT | RemoveTodolistAT | ChangeTitleInTodolistAT

type AddTodolistAT = ReturnType<typeof addTodolistAC>
type RemoveTodolistAT = ReturnType<typeof removeTodolistAC>
type ChangeTitleInTodolistAT = ReturnType<typeof changeTitleInTodolistAC>

export const addTodolistAC = (title: string) => {
  return {
    type: 'ADD_TODOLIST',
    title: title
  } as const
}
export const removeTodolistAC = (todoListId: string) => {
  return {
    type: 'REMOVE_TODOLIST',
    todoListId: todoListId
  } as const
}
export const changeTitleInTodolistAC = (todoListId: string, filterValue: FilterValuesType) => {
  return {
    type: 'CHANGE_TITLE_IN_TODOLIST',
    todoListId: todoListId,
    filterValue: filterValue
  } as const
}
