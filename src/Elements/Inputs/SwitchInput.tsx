import { IStyleable, defaultIStyleableProps } from "../../Helpers/Interfaces";
import { IEditable, defaultEditableProps } from "./InputsInterfaces";
import classes from './Inputs.module.scss';
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store/Store";

interface ISwitchInputProps extends IStyleable, IEditable<boolean> { }

const SwitchInput = (props: ISwitchInputProps) => {
    const alternativeRef = useRef(null);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        props.setter(!(props.value ?? !e.target.checked));
    };

    return <label className={`row ${props.className}`}>
        <input
            type='checkbox'
            className={classes.switchCheckbox}
            defaultChecked={props.defaultValue}
            checked={props.value}
            ref={props.refer ?? alternativeRef}
            disabled={props.disabled}
            onChange={(e) => onChange(e)}
        />
        <label className={classes.switchLabel} />
    </label>
}

SwitchInput.defaultProps = { ...defaultIStyleableProps, ...defaultEditableProps };

export default SwitchInput;