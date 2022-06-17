import React, {KeyboardEvent, useState} from 'react';
import {Input} from "./Input";
import {Button} from "./Button";
export type AddItemFormPropsType = {
  addItem: (title: string) => void
}
export const AddItemForm = (props: AddItemFormPropsType) => {
  const [title, setTitle] = useState("")
  const [error, setError] = useState("")
  const addItem = () => {
    if (title.trim() !== '') {
      props.addItem(title.trim());
    } else {
      setError('Title is required')
    }
    setTitle("");
  }
  const onKeyPressInput = (e: KeyboardEvent<HTMLInputElement>) => {
    setError('')
    if (e.key === "Enter") {
      addItem();
    }
  }
  return (
    <>
      <div>
        <Input type="text" className={error ? 'error' : ''} value={title} setTitle={setTitle}
               onKeyPressInput={onKeyPressInput}/>
        <Button name={'+'} callback={addItem}/>
        <div className={error ? 'error-message' : ''}>{error}</div>
      </div>
    </>
  );
};
