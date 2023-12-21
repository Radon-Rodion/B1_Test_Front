import { FormEvent, useRef, useState } from 'react';
import classes from './Inputs.module.scss';
import { IStyleable, defaultIStyleableProps } from '../../Helpers/Interfaces';
import { IEditable, defaultEditableProps } from './InputsInterfaces';

interface IBaseInputProps extends IStyleable, IEditable<string | number> {
    type: string
}

const BaseInput = (props: IBaseInputProps) => {
    return <input {...props}
        className={`${classes.baseInput} ${props.className}`}
        onChange={e => props.setter(e.target?.value)}
        ref={props.refer}
    />
}

BaseInput.defaultProps = { ...defaultIStyleableProps, ...defaultEditableProps, type: 'text' };

export default BaseInput;