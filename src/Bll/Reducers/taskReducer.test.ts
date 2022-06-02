import {AllTaskType} from "../../App";
import {addTaskAC, removeTaskAC, taskReducer} from "./taskReducer";

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
  expect(endState['todoListId1'].length).toBe(3)
  expect(endState['todoListId2'].length).toBe(4)
  expect(endState['todoListId2'][0].id).toBeDefined()
  expect(endState['todoListId2'][0].title).toBe('juce')
  expect(endState['todoListId2'][0].isDone).toBe(false)
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