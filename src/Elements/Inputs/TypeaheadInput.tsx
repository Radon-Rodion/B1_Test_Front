import { useEffect, useRef, useState } from "react";
import { IStyleable, defaultIStyleableProps } from "../../Helpers/Interfaces";
import { IEditable, ISelectorOption, defaultEditableProps } from "./InputsInterfaces";
import classNames from './Inputs.module.scss';
import { useUpdateEffect } from "../../Helpers/CustomHooks";


interface ITypeaheadInputProps extends IEditable<number>, IStyleable {
    options: Array<ISelectorOption>,
    multiline: boolean,
    isInputAvailable: boolean
}

const TypeaheadInput = (props: ITypeaheadInputProps) => {
    const textFromPropsValue = props?.options?.find(o => o.val == (props.value ?? props.defaultValue))?.name;
    const [state, setState] = useState(textFromPropsValue);
    const alternativeRef = useRef(null);

    const getValuesForUpdateEffect = () => {
        const valueExists = (props.value ?? props.defaultValue) != undefined;
        const newText = props?.options?.find(o => o.val == (props.value ?? props.defaultValue))?.name;
        return {valueExists, newText};
    }

    useEffect(() => {
        const {valueExists, newText} = getValuesForUpdateEffect();

        if (valueExists && props.multiline && (props.refer ?? alternativeRef)?.current) {
            ((props.refer ?? alternativeRef)?.current as unknown as HTMLDivElement).innerText = newText ?? ''; //updating displayed text
        }
    }, [props.defaultValue, props.value]);

    useUpdateEffect(() => {
        const {valueExists, newText} = getValuesForUpdateEffect();

        if (valueExists && (!state?.length)) { //updating state
            setState(newText);
        }
    }, [props.defaultValue, props.value]);

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (props.isInputAvailable) setState(e.target.value);
        const valToSetViaSetter = props?.options?.find(o => o.name == e.target.value)?.val;
        if(valToSetViaSetter) props.setter(valToSetViaSetter);
    };

    const multilineChangeHandler = (e: React.FormEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement;
        if (props.isInputAvailable) setState(target.innerText);
        props.setter(props?.options?.find(o => o.name == target.innerText)?.val ?? NaN);
    }

    const selectorChangeHandler = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        setState((e.target as HTMLLIElement).innerText);
        props.setter(props?.options?.find(o => o.name == (e.target as HTMLLIElement).innerText)?.val ?? NaN);
        if (props.multiline && (props.refer ?? alternativeRef)?.current) {
            ((props.refer ?? alternativeRef)?.current as unknown as HTMLDivElement).innerText = (e.target as HTMLLIElement).innerText; //setting value
        }
    }

    const filterOptions = (options: ISelectorOption[]) => {
        if (options.find(opt => opt.name == state) != undefined) return options;
        return options.filter(opt => (opt.name ?? '').indexOf(state ?? '') != -1);
    }

    return <div style={props.style} className={`${props.className} ${classNames.typeahead}`}>
        {props.multiline ?
            <div
                contentEditable={!props.disabled}
                ref={props.refer ?? alternativeRef}
                onInput={multilineChangeHandler}
                className={classNames.typeaheadInput}
                data-textarea></div>
            : <input value={state} ref={props.refer} onChange={inputChangeHandler} className={classNames.typeaheadInput} disabled={props.disabled} />}
        <ul className={classNames.typeaheadSelector}>
            {(props.isInputAvailable ? filterOptions(props.options) : props.options).map(opt => (<li onClick={selectorChangeHandler}>{opt.name}</li>))}
        </ul>
    </div>
}

TypeaheadInput.defaultProps = { ...defaultIStyleableProps, ...defaultEditableProps, isInputAvailable: true, multiline: false };

export default TypeaheadInput;