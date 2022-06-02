import {v1} from "uuid";
import {FilterValuesType, TodoListType} from "../../App";
export let todoListId1 = v1()
export let todoListId2 = v1()
const initialState: Array<TodoListType> = [
  {
    id: todoListId1,
    title: 'What To learn',
    filter: 'all'
  },
  {
    id: todoListId2,
    title: 'What To buy',
    filter: 'all'
  }
]
export const todolistReducer = (todolist: Array<TodoListType> = initialState, action: TodolistACType): Array<TodoListType> => {
  switch (action.type) {
    case "ADD_TODOLIST":
      const newToDoList: TodoListType = {
        id: action.id,
        title: action.title,
        filter: 'all'
      }
      return [newToDoList, ...todolist]
    case "REMOVE_TODOLIST":
      return todolist.filter(t => t.id !== action.todoListId )
    case "CHANGE_FILTER_IN_TODOLIST":
      return todolist.map(t => t.id === action.todoListId ? {...t, filter: action.filterValue} : t)
    case "CHANGE_TITLE_IN_TODOLIST":
      return todolist.map(t => t.id === action.todoListId? {...t, title: action.title} : t)
    default:
      return todolist
  }

}
export type TodolistACType = AddTodolistAT | RemoveTodolistAT | ChangeFilterInTodolistAT | changeTitleInTodolistAT

type AddTodolistAT = ReturnType<typeof addTodolistAC>
type RemoveTodolistAT = ReturnType<typeof removeTodolistAC>
type ChangeFilterInTodolistAT = ReturnType<typeof changeFilterInTodolistAC>
type changeTitleInTodolistAT = ReturnType<typeof changeTitleInTodolistAC>
export const addTodolistAC = (title: string) => ({type: 'ADD_TODOLIST',title: title, id: v1()} as const)
export const removeTodolistAC = (todoListId: string) => ({type: 'REMOVE_TODOLIST',todoListId: todoListId} as const)
export const changeFilterInTodolistAC = (todoListId: string, filterValue: FilterValuesType) => {
  return {
    type: 'CHANGE_FILTER_IN_TODOLIST',
    todoListId: todoListId,
    filterValue: filterValue
  } as const
}
export const changeTitleInTodolistAC = (todoListId: string, changedTitle: string) => {
  return {
    type: 'CHANGE_TITLE_IN_TODOLIST',
    todoListId: todoListId,
    title: changedTitle
  } as const
}
