import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from './Components/Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./Components/AddItemForm";
import {
  addTodolistAC,
  changeFilterInTodolistAC, changeTitleInTodolistAC,
  removeTodolistAC,
  todolistReducer
} from "./Bll/Reducers/todolistReducer";
import {
  addTaskAC,
  onChangedTaskTitleAC,
  onChangeStatusInputAC,
  removeTaskAC,
  taskReducer
} from "./Bll/Reducers/taskReducer";

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

function AppWithReducer() {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todoList, dispatchToTodolistReducer] = useReducer(todolistReducer, [

  ])

  let [tasks, dispatchToTaskReducer] = useReducer(taskReducer, {

  });

  function removeTask(todoListId: string, id: string) {
   dispatchToTaskReducer(removeTaskAC(todoListId, id))
  }

  function addTask(todoListId: string, title: string) {
    dispatchToTaskReducer(addTaskAC(todoListId, title))
  }

  function addToDoList(title: string){
    const action  = addTodolistAC(title)
    dispatchToTodolistReducer(action)
    dispatchToTaskReducer(action)
  }

  function onChangeStatusInput(todoListId: string, currentId: string, checkedValue: boolean)  {
    dispatchToTaskReducer(onChangeStatusInputAC(todoListId, currentId, checkedValue))
  }
  function removeToDoList(todoListId: string){

    dispatchToTodolistReducer(removeTodolistAC(todoListId))
    dispatchToTaskReducer(removeTodolistAC(todoListId))

  }

  function changeFilterInTodolist(todoListId: string, value: FilterValuesType) {
    dispatchToTodolistReducer(changeFilterInTodolistAC(todoListId, value))
  }

  const changeTitleInTodolist = (tId: string, newTitle: string) => {
    dispatchToTodolistReducer(changeTitleInTodolistAC(tId, newTitle))
  }
  function changeTask(todolistId: string, taskId: string, newTitle: string){
   dispatchToTaskReducer(onChangedTaskTitleAC(todolistId, taskId, newTitle))
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

// export default AppWithReducer;
