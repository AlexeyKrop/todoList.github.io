import {ButtonHTMLAttributes, DetailedHTMLProps} from "react";

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
type propsButtonType = DefaultButtonPropsType &  {
  name: string,
  callback: () => void
}
export const Button = (props: propsButtonType) => {
  const onClickHandler = () => {
    props.callback()
  }
  return (
    <button className={props.className} onClick={onClickHandler}>{props.name}</button>
  )
}