import {Input} from "./Input";
import {EditableSpan} from "./EditableSpan";
import {Button} from "./Button";
import React from "react";
import {TaskType} from "../App";
type TaskPropsType = {
  tasks: Array<TaskType>
  todoListId: string
  removeTask: (todoListId: string, taskId: string) => void
  onChangeStatusInputHandler: (taskId: string, checkedValue: boolean) => void
  changeTaskHandler: (taskId: string, newTitle:string) => void
}
export const Task = (props: TaskPropsType) => {
  return(
    <ul>
      {
        props.tasks.map(t => {
          const onClickRemoveHandler = () => props.removeTask(props.todoListId, t.id)
          return <li className={t.isDone ? 'is-done' : ''} key={t.id}>
            <Input onChangeStatusInputHandler={(checkedValue) => {
              props.onChangeStatusInputHandler(t.id, checkedValue)
            }} type="checkbox" checked={t.isDone}/>
            <EditableSpan callBack={(newTitle)=>props.changeTaskHandler(t.id , newTitle)} title={t.title} />
            <Button name={'x'} callback={onClickRemoveHandler}/>
          </li>
        })
      }
    </ul>
  )
}