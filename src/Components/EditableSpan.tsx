import React, {useState} from 'react';
import {Input} from "./Input";

type EditableSpanPropType = {
  title: string
  callBack: (title: string) => void
}
export const EditableSpan = (props: EditableSpanPropType) => {
  const [editMode, setEditMode] = useState(false)
  const [newTitle, setNewTitle] = useState(props.title)
  const onDoubleClickHandler = () => {
    setEditMode(!editMode)
  }
  const changeTitleHandler = (title: string) => {
    setNewTitle(title)
    props.callBack(newTitle)
  }
  return editMode
    ? <Input value={newTitle} changeTitleHandler={changeTitleHandler} changeEditMode={onDoubleClickHandler}/>
    : <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>;
};
