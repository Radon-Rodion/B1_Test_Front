import { useSelector } from "react-redux";
import { IChildable, IStyleable, defaultIChildableProps, defaultIStyleableProps } from "../../Helpers/Interfaces";
import { RootState } from "../../Redux/Store/Store";
import { IButtonable, defaultIButtonableProps } from "./ButtonsInterfaces";


interface IBaseButtonProps extends IButtonable, IStyleable, IChildable { }

const BaseButton = (props: IBaseButtonProps) => {
    return <button
        className={props.className}
        style={{ ...props.style}}
        onClick={props.onClick}
        type={props.type}>{props.children}</button>
}

BaseButton.defaultProps = { ...defaultIStyleableProps, ...defaultIButtonableProps, ...defaultIChildableProps };

export default BaseButton;