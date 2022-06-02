import {AllTaskType} from "../../App";
import {addTaskAC, onChangedTaskTitleAC, onChangeStatusInputAC, removeTaskAC, taskReducer} from "./taskReducer";
import {addTodolistAC} from "./todolistReducer";
import {v1} from "uuid";

let startState: AllTaskType = {};

beforeEach(()=>{
  startState = {
    'todoListId1': [
      {id: '1', title: 'CSS', isDone: false},
      {id: '2', title: 'JS', isDone: true},
      {id: '3', title: 'React', isDone: false}
    ],
    'todoListId2': [
      {id: '1', title: 'bread', isDone: false},
      {id: '2', title: 'milk', isDone: true},
      {id: '3', title: 'tea', isDone: false}
    ]
  }
})

test('check add task', ()=> {
  const action = addTaskAC('todoListId2','juce')
  const endState = taskReducer(startState, action)
  expect(endState!['todoListId1'].length).toBe(3)
  expect(endState!['todoListId2'].length).toBe(4)
  expect(endState!['todoListId2'][0].id).toBeDefined()
  expect(endState!['todoListId2'][0].title).toBe('juce')
  expect(endState!['todoListId2'][0].isDone).toBe(false)
} )

test('check remove task', ()=> {
  const action = removeTaskAC('todoListId1','1')
  const endState = taskReducer(startState, action)
  expect(endState).toEqual({
    'todoListId1': [

      {id: '2', title: 'JS', isDone: true},
      {id: '3', title: 'React', isDone: false}
    ],
    'todoListId2': [
      {id: '1', title: 'bread', isDone: false},
      {id: '2', title: 'milk', isDone: true},
      {id: '3', title: 'tea', isDone: false}
    ]
  })
} )

test('check change input value in task', ()=> {
  const action = onChangeStatusInputAC('todoListId1',  '2', false)
  const endState = taskReducer(startState, action)
  expect(endState!['todoListId1'][2].isDone).toBe(false)
  expect(endState!['todoListId1'][0].isDone).toBe(false)
} )

test('check change title value in task', ()=> {
  const action = onChangedTaskTitleAC('todoListId2',  '2', 'coffee')
  const endState = taskReducer(startState, action)
  expect(endState!['todoListId2'][1].title).toBe('coffee')
  expect(endState!['todoListId1'][1].title).toBe('JS')
} )

test('new array should be added when new todolist is added' , () => {
  const action = addTodolistAC('new todolist')
  const endState = taskReducer(startState, action)
  const keys = Object.keys(endState!)
  const newKey = keys.find(k => k !== 'todoListId1' && k !== 'todoListId2')
  if (!newKey) {
    throw Error('new key should be added')
  }
  expect(keys.length).toBe(3)
  expect(endState![newKey]).toEqual([])
})