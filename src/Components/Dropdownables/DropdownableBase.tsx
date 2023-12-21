import { useEffect, useRef, useState } from "react";
import { IChildable, IStyleable, defaultIChildableProps, defaultIStyleableProps } from "../../Helpers/Interfaces";
import classNames from './Dropdownables.module.scss';


interface IDropdownableBaseProps extends IStyleable, IChildable {
    name: string
}

const DropdownableBase = ({name, style, className, children}: IDropdownableBaseProps) => {
    const [show, setShow] = useState(false);
    const needToShowAnimation = useRef(false);

    const changeShow = () => {
        needToShowAnimation.current = true;
        setShow(!show);
    }

    useEffect(() => {
        needToShowAnimation.current = false;
    });

    const getBodyClassName = () => {
        if(show) return classNames['dropdownableBody'];
        if(needToShowAnimation.current) return classNames['dropdownableHidden'];
        return classNames['dropdownableHiddenDef'];
    };

    const getIconClassName = () => {
        if(show) return classNames.rotateIcon;
        if(needToShowAnimation.current) return classNames.normIcon;
        return '';
    }
    
    return <div className={`${classNames.dropdownable} ${className}`} style={style}>
        <button type='button' className={`${classNames.dropdownableButton} ${getIconClassName()}`} onClick={() => changeShow()}>
            <span>{name}</span>
            <i className="fa fa-caret-down" aria-hidden="true" />
        </button>
        <div className={getBodyClassName()}>
            {children}
        </div>
    </div>
}

DropdownableBase.defaultProps = {...defaultIChildableProps, ...defaultIStyleableProps};

export default DropdownableBase;