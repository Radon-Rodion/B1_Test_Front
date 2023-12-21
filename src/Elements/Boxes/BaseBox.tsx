import { IChildable, IStyleable, defaultIChildableProps, defaultIStyleableProps } from "../../Helpers/Interfaces";
import classNames from './Boxes.module.scss';

interface IBaseBoxProps extends IStyleable, IChildable{

}

const BaseBox = ({children, style, className}: IBaseBoxProps) => {
    return <div className={`${classNames.baseBox} ${className}`} style={style}>
        {children}
    </div>
}

BaseBox.defaultProps = {...defaultIStyleableProps, ...defaultIChildableProps};

export default BaseBox;