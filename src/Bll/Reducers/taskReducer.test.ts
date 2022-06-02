import {AllTaskType} from "../../App";
import {addTaskAC, taskReducer} from "./taskReducer";

let startState: AllTaskType = {};
beforeEach(()=>{
  startState = {
    'todolistId1': [
      {id: '1', title: 'CSS', isDone: false},
      {id: '2', title: 'JS', isDone: true},
      {id: '3', title: 'React', isDone: false}
    ],
    'todolistId2': [
      {id: '1', title: 'bread', isDone: false},
      {id: '2', title: 'milk', isDone: true},
      {id: '3', title: 'tea', isDone: false}
    ]
  }
})
test('check add task', ()=> {
  const action = addTaskAC('todolistId2','juce')
  const endState = taskReducer(startState, action)
  expect(endState!['todolistId1'].length).toBe(3)
  expect(endState!['todolistId2'].length).toBe(4)
  expect(endState!['todolistId2'][0].id).toBeDefined()
  expect(endState!['todolistId2'][0].title).toBe('juce')
  expect(endState!['todolistId2'][0].isDone).toBe(false)
} )