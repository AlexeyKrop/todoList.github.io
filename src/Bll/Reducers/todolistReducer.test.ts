import {TodoListType} from "../../App";
import {v1} from "uuid";
import {
  addTodolistAC,
  changeFilterInTodolistAC,
  changeTitleInTodolistAC,
  removeTodolistAC,
  todolistReducer
} from "./todolistReducer";

let startState: Array<TodoListType> = []
let todoListID_1: string
let todoListID_2: string

beforeEach(() => {
  todoListID_1 = v1()
  todoListID_2 = v1()
  startState = [
    {
      id: todoListID_1,
      title: 'What to Learn',
      filter: 'all'
    },
    {
      id: todoListID_2,
      title: 'What to bue',
      filter: 'all'
    }]
})
test('check add Todolist', () => {
  let endState = todolistReducer(startState , addTodolistAC('new todo'))
  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe('new todo')
})
test('remove Todolist', () => {
  let endState = todolistReducer(startState , removeTodolistAC(todoListID_2))
  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todoListID_1)

})
test('change filter in Todolist', () => {
  let endState = todolistReducer(startState , changeFilterInTodolistAC(todoListID_2, 'active'))
  expect(endState[1].filter).toBe('active')
})
test('change title in Todolist', () => {
  let endState = todolistReducer(startState , changeTitleInTodolistAC(todoListID_1, 'NBA'))
  expect(endState[0].id).toBe(todoListID_1)
  expect(endState[0].title).toBe('NBA')
})