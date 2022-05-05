import React, {useState} from 'react';
import {Input} from "./Input";

type EditableSpanPropType = {
  title: string
  callBack: (title: string) => void
}
export const EditableSpan = (props: EditableSpanPropType) => {
  const [editMode, setEditMode] = useState(false)
  const [title, setTitle] = useState('')
  const changeEditMode = () => {
    setEditMode(!editMode)
  }
  const changeTitleHandler = (title: string) => {
    props.callBack(title)
    setTitle(title)
  }
  return editMode
    ? <Input value={title} changeTitleHandler={changeTitleHandler} onBlur={changeEditMode} changeEditMode={changeEditMode}/>
    : <span onDoubleClick={changeEditMode}>{props.title}</span>;
};
