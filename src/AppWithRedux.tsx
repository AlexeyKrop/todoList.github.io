import React from 'react';
import './App.css';
import {Todolist} from './Components/Todolist';
import {AddItemForm} from "./Components/AddItemForm";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./Bll/State/store";
import {addTaskAC, onChangedTaskTitleAC, onChangeStatusInputAC, removeTaskAC} from "./Bll/Reducers/taskReducer";
import {
  addTodolistAC,
  changeFilterInTodolistAC,
  changeTitleInTodolistAC,
  removeTodolistAC
} from "./Bll/Reducers/todolistReducer";

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

function AppWithRedux() {

  let tasks = useSelector<AppRootStateType, AllTaskType>(state => state.tasks)
  let todoList = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todoList)
  let dispatch = useDispatch()

  function removeTask(todoListId: string, id: string) {
    dispatch(removeTaskAC(todoListId, id))
  }

  function addTask(todoListId: string, title: string) {
    dispatch(addTaskAC(todoListId, title))
  }

  function addToDoList(title: string) {
    dispatch(addTodolistAC(title))
  }

  function onChangeStatusInput(todoListId: string, currentId: string, checkedValue: boolean) {
    dispatch(onChangeStatusInputAC(todoListId, currentId, checkedValue))

  }

  function removeToDoList(todoListId: string) {
   dispatch(removeTodolistAC(todoListId))
  }

  function changeFilterInTodolist(todoListId: string, value: FilterValuesType) {

    dispatch(changeFilterInTodolistAC(todoListId, value))
  }

  const changeTitleInTodolist = (tId: string, newTitle: string) => {
    dispatch(changeTitleInTodolistAC(tId, newTitle))
  }

  function changeTask(todolistId: string, taskId: string, newTitle: string) {
   dispatch(onChangedTaskTitleAC(todolistId, taskId, newTitle))
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
                    changeFilterInTodolist={changeFilterInTodolist}
                    onChangeStatusInput={onChangeStatusInput}
                    filter={t.filter}
                    addTask={addTask}
                    removeToDoList={removeToDoList}
                    todoList={todoList}
                    changeTitleInTodolist={changeTitleInTodolist}
                    changeTask={changeTask}
          />
        )
      })}
    </div>
  );
}

export default AppWithRedux;
