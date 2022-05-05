import {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent} from "react"
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type propsInputType = DefaultInputPropsType & {
  className?: string
  value?: string,
  setTitle?: (title: string) => void
  onKeyPressInput?: (e: KeyboardEvent<HTMLInputElement>) => void
  onChangeStatusInputHandler?: (checkedValue: boolean) => void
  changeTitleHandler?: (title: string) => void
  changeEditMode?: () => void
  type?: string
  checked?: boolean
}
export const Input = (props: propsInputType) => {
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if(props.setTitle) props.setTitle(e.currentTarget.value)
    if(props.changeTitleHandler) props.changeTitleHandler(e.currentTarget.value)
    if(props.onChangeStatusInputHandler)props.onChangeStatusInputHandler(e.currentTarget.checked)
  }
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) =>{
    if(props.onKeyPressInput)props.onKeyPressInput(e)
  }
  const changeEditMode = () => {
    if(props.changeEditMode) props.changeEditMode()
  }
  return (
    <input autoFocus onBlur={changeEditMode} className = {props.className}  value={props.value} onChange={onChangeHandler} onKeyPress={onKeyPressHandler} type={props.type} checked={props.checked}/>
  )
}