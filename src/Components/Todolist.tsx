import React from 'react';
import {FilterValuesType, TaskType, TodoListType} from '../App';
import {Button} from "./Button";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Task} from "./Task";


type PropsType = {
  todoListId: string
  title: string
  tasks: Array<TaskType>
  removeTask: (todoListId: string, taskId: string) => void
  changeFilterInTodolist: (todoListId: string, value: FilterValuesType) => void
  addTask: (todoListId: string, title: string) => void
  removeToDoList: (todoListId: string) => void
  onChangeStatusInput: (todoListId: string, id: string, checkedValue: boolean) => void
  filter: string
  todoList: Array<TodoListType>
  changeTitleInTodolist: (tId: string, title:string) => void
  changeTask: (todolistId: string,taskId: string, title:string) => void
}

export function Todolist(props: PropsType) {
  const addTask = (title: string) => {
    props.addTask(props.todoListId, title);
  }
  const onChangeStatusInputHandler = (tId: string, checkedValue: boolean) => {
    props.onChangeStatusInput(props.todoListId, tId, checkedValue)
  }
  const onClickFilterHandler = (name: FilterValuesType) => {
    props.changeFilterInTodolist(props.todoListId, name);
  }
  const removeToDoList = () => {
    props.removeToDoList(props.todoListId)
  }
  const changeTitleHandler = (title:string) => {
    props.changeTitleInTodolist(props.todoListId, title)
  }
  const changeTaskHandler = (taskId: string, newTitle:string) => {
    props.changeTask(props.todoListId, taskId, newTitle)
  }
  return <div>
    <h3><EditableSpan callBack={changeTitleHandler} title={props.title} /><Button name={'X'} callback={removeToDoList}/></h3>
    <AddItemForm addItem={addTask}/>
    <Task tasks={props.tasks} changeTaskHandler={changeTaskHandler} removeTask={props.removeTask} todoListId={props.todoListId} onChangeStatusInputHandler={onChangeStatusInputHandler}/>
    <div>
      <Button className={props.filter === 'all' ? 'active-filter' : ''} name={'All'}
              callback={() => onClickFilterHandler('all')}/>
      <Button className={props.filter === 'active' ? 'active-filter' : ''} name={'Active'}
              callback={() => onClickFilterHandler('active')}/>
      <Button className={props.filter === 'completed' ? 'active-filter' : ''} name={'Completed'}
              callback={() => onClickFilterHandler('completed')}/>
    </div>
  </div>
}
