import { IStyleable, defaultIStyleableProps } from '../../Helpers/Interfaces';
import classNames from './Flexers.module.scss';

interface IRowProps extends IStyleable{
    children: JSX.Element[] | JSX.Element;
}
const Row = (props: IRowProps) => {
    return <div className={`${classNames.row} ${props.className}`} style={props.style}>
        {Array.isArray(props.children) ? props.children.map(chi => chi) : props.children}
    </div>
}

Row.defaultProps = {...defaultIStyleableProps};

export default Row;