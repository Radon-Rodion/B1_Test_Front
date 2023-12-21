import { IChildable, defaultIChildableProps } from "../../Helpers/Interfaces";
import classes from './Buttons.module.css';

interface IRoundButtonBaseProps extends IChildable{
    onClick: () => void,
    type: "button" | "submit" | "reset" | undefined
}

const RoundButtonBase = (props: IRoundButtonBaseProps) => {
    return <button className={classes.roundButton} onClick={props.onClick} type={props.type}>{props.children}</button>
}

RoundButtonBase.defaultProps = { ...defaultIChildableProps, onclick: () => {}, type: 'button' };

export default RoundButtonBase;