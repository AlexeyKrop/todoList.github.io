import React from 'react';
import {FilterValuesType, TaskType, TodoListType} from '../App';
import {Button} from "./Button";
import {Input} from "./Input";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";


type PropsType = {
  todoListId: string
  title: string
  tasks: Array<TaskType>
  removeTask: (todoListId: string, taskId: string) => void
  changeFilter: (todoListId: string, value: FilterValuesType) => void
  addTask: (todoListId: string, title: string) => void
  removeToDoList: (todoListId: string) => void
  onChangeStatusInput: (todoListId: string, id: string, checkedValue: boolean) => void
  filter: string
  setTodoList: (todoList: Array<TodoListType>) => void
  todoList: Array<TodoListType>
  changeTitle: (tId: string, title:string) => void
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
    props.changeFilter(props.todoListId, name);
  }
  const removeToDoList = () => {
    props.removeToDoList(props.todoListId)
  }
  const changeTitleHandler = (title:string) => {
    props.changeTitle(props.todoListId, title)
  }
  const changeTaskHandler = (taskId: string, newTitle:string) => {
    props.changeTask(props.todoListId, taskId, newTitle)
  }
  return <div>
    <h3><EditableSpan callBack={changeTitleHandler} title={props.title} /><Button name={'X'} callback={removeToDoList}/></h3>
    <AddItemForm addItem={addTask}/>
    <ul>
      {
        props.tasks.map(t => {
          const onClickRemoveHandler = () => props.removeTask(props.todoListId, t.id)
          return <li className={t.isDone ? 'is-done' : ''} key={t.id}>
            <Input onChangeStatusInputHandler={(checkedValue) => {
              onChangeStatusInputHandler(t.id, checkedValue)
            }} type="checkbox" checked={t.isDone}/>
            <EditableSpan callBack={(newTitle)=>changeTaskHandler(t.id , newTitle)} title={t.title} />
            <Button name={'x'} callback={onClickRemoveHandler}/>
          </li>
        })
      }
    </ul>
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
