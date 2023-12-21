import { IStyleable, defaultIStyleableProps } from "../../Helpers/Interfaces";
import { IEditable, ISelectorOption, defaultEditableProps } from "./InputsInterfaces";
import classNames from './Inputs.module.scss';
import { tryStrToInt } from "../../Helpers/SupportFunctions";
import { useEffect, useRef } from "react";

interface ISelectorInputProps extends IEditable<number | string>, IStyleable {
    options: Array<ISelectorOption | string>
}

const SelectorInput = (props: ISelectorInputProps) => {
    const alternativeRef = useRef<HTMLSelectElement>(null);
    const actualRef = props.refer ?? alternativeRef;

    useEffect(() => {
        if(props.value != undefined && actualRef.current != null){
            actualRef.current.value = props.value.toString();
        }
    }, [props.value]);

    const getOptVal = (opt: ISelectorOption | string) => (opt as ISelectorOption)?.val ?? opt;
    const getOptName = (opt: ISelectorOption | string) => (opt as ISelectorOption)?.name ?? opt;

    return <select
        style={props.style}
        className={`${props.className} ${classNames.selector}`}
        ref={actualRef}
        defaultValue={props.value ?? props.defaultValue}
        onChange={(e) => props.setter(tryStrToInt(e.target.value))}
        disabled={props.disabled}
    >
        {props.options.map(opt => (<option value={getOptVal(opt)?.toString()} key={getOptVal(opt)?.toString()}>{getOptName(opt)?.toString()}</option>))}
    </select>
}

SelectorInput.defaultProps = { ...defaultIStyleableProps, ...defaultEditableProps };

export default SelectorInput;