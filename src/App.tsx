import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Components/Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./Components/AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";
export type TodoListType = {
  id: string
  title: string
  filter: FilterValuesType
}
export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
export type AllTaskType = {
  [key: string]: Array<TaskType>
}

function App() {
  let todoListId1 = v1()
  let todoListId2 = v1()
  let [todoList, setTodoList] = useState<Array<TodoListType>>([
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
  ])
  let [tasks, setTasks] = useState<AllTaskType>({
    [todoListId1]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true},
      {id: v1(), title: "ReactJS", isDone: false},
      {id: v1(), title: "Rest API", isDone: false},
      {id: v1(), title: "GraphQL", isDone: false},
    ],
    [todoListId2]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true},
      {id: v1(), title: "ReactJS", isDone: false},
      {id: v1(), title: "Rest API", isDone: false},
      {id: v1(), title: "GraphQL", isDone: false},
    ]
  })

  function removeTask(todoListId: string, id: string) {
    setTasks({...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== id)})
  }

  function addTask(todoListId: string, title: string) {
    let newTask = {id: v1(), title: title, isDone: false};
    setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
  }

  function addToDoList(title: string){
    const newId = v1();
    const newToDoList: TodoListType = {
      id: newId,
      title: title,
      filter: 'all'
    }
    setTodoList([newToDoList, ...todoList])
    setTasks({...tasks, [newId]: []})
  }

  function onChangeStatusInput(todoListId: string, currentId: string, checkedValue: boolean)  {
    setTasks({
      ...tasks,
      [todoListId]: tasks[todoListId].map(t => currentId === t.id ? {...t, isDone: checkedValue} : t)
    })
  }
  function removeToDoList(todoListId: string){
    setTodoList(todoList.filter(t => t.id !== todoListId))
    delete tasks[todoListId]
    setTasks({...tasks})
  }

  function changeFilter(todoListId: string, value: FilterValuesType) {
    setTodoList(todoList.map(t => t.id === todoListId ? {...t, filter: value} : t))
  }

  const changeTitle = (tId: string, newTitle: string) => {
    setTodoList(todoList.map(t => t.id === tId ? ({...t, title: newTitle}) : t))
  }
  function changeTask(todolistId: string, taskId: string, newTitle: string){
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title: newTitle} : t)
    })
  }
  return (
    <div className="App">
      <AddItemForm addItem={addToDoList}/>
      {todoList.map(t => {
        let tasksForTodolist = tasks[t.id];
        if (t.filter === "active") {
          tasksForTodolist = tasks[t.id].filter(t => !t.isDone);
        }
        if (t.filter === "completed") {
          tasksForTodolist = tasks[t.id].filter(t => t.isDone);
        }
        return (
          <Todolist key={t.id}
                    todoListId={t.id}
                    title={t.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    onChangeStatusInput={onChangeStatusInput}
                    filter={t.filter}
                    addTask={addTask}
                    removeToDoList={removeToDoList}
                    setTodoList={setTodoList}
                    todoList={todoList}
                    changeTitle={changeTitle}
                    changeTask={changeTask}
          />
        )
      })}
    </div>
  );
}

export default App;
