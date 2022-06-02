import {TodoListType} from "../../App";
import {v1} from "uuid";
import {addTodolistAC, todolistReducer} from "./todolistReducer";

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
test('check addTodolist', () => {
  let endState = todolistReducer(startState , addTodolistAC('new todo'))
  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe('new todo')
})