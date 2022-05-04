import React, {KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType, TodoListType} from '../App';
import {Button} from "./Button";
import {Input} from "./Input";


type PropsType = {
  todoListId: string
  title: string
  tasks: Array<TaskType>
  removeTask: (todoListId: string, taskId: string) => void
  changeFilter: (todoListId: string, value: FilterValuesType) => void
  addTask: (todoListId: string,title: string) => void
  removeToDoList: (todoListId: string) => void
  onChangeStatusInput: (todoListId: string, id: string, checkedValue: boolean) => void
  filter: string
  setTodoList: (todoList: Array<TodoListType>) => void
  todoList: Array<TodoListType>
}

export function Todolist(props: PropsType) {
  const [title, setTitle] = useState("")
  const [error, setError] = useState("")

  const addTask = () => {
    if (title.trim() !== '') {
      props.addTask(props.todoListId, title.trim());
    } else {
      setError('Title is required')
    }
    setTitle("");
  }
  const onKeyPressInput = (e: KeyboardEvent<HTMLInputElement>) => {
    setError('')
    if (e.key === "Enter") {
      addTask();
    }
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
  return <div>
    <h3>{props.title}<Button name={'X'} callback={removeToDoList}/></h3>
    <div>
      <Input type="text" className={error ? 'error' : ''} value={title} setTitle={setTitle}
             onKeyPressInput={onKeyPressInput}/>
      <Button name={'+'} callback={addTask}/>
    </div>
    <div className={error ? 'error-message' : ''}>{error}</div>
    <ul>
      {
        props.tasks.map(t => {
          const onClickRemoveHandler = () => props.removeTask(props.todoListId,t.id)
          return <li className={t.isDone ? 'is-done' : ''} key={t.id}>
            <Input onChangeStatusInputHandler={(checkedValue) => {
              onChangeStatusInputHandler(t.id, checkedValue)
            }} type="checkbox" checked={t.isDone}/>
            <span>{t.title}</span>
            <Button name={'x'} callback={onClickRemoveHandler}/>
          </li>
        })
      }
    </ul>
    <div>
      <Button className={props.filter === 'all' ? 'active-filter' : ''} name={'All'} callback={() => onClickFilterHandler('all')}/>
      <Button className={props.filter === 'active' ? 'active-filter' : ''} name={'Active'} callback={() => onClickFilterHandler('active')}/>
      <Button className={props.filter === 'completed' ? 'active-filter' : ''} name={'Completed'} callback={() => onClickFilterHandler('completed')}/>
    </div>
  </div>
}
