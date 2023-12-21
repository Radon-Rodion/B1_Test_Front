import { useEffect, useState } from "react";
import { IStyleable, defaultIStyleableProps } from "../../Helpers/Interfaces";
import { IEditable, ISelectorOption, defaultEditableProps } from "./InputsInterfaces";
import classNames from './Inputs.module.scss';
import { usePrevious, useUpdateEffect } from "../../Helpers/CustomHooks";


interface IChipsInputProps extends IEditable<Array<number>>, IStyleable {
    options: Array<ISelectorOption>,
    renderChip: (prop: string) => JSX.Element
}

const ChipsInput = (props: IChipsInputProps) => {
    const [state, setState] = useState({
        text: '',
        chosen: props.value ?? props.defaultValue ?? []
    });

    useUpdateEffect(() => {
        if (((props.value ?? props.defaultValue ?? [])?.length != 0) && (!state.chosen?.length)) {
            setState(st => ({
                ...st,
                chosen: props.value ?? props.defaultValue ?? []
            }));
        }
    }, [props.defaultValue, props.value]);

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState(state => ({ ...state, text: e.target.value }));
    };

    const selectorChangeHandler = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        console.log('VAL', (e.target as HTMLLIElement).attributes.getNamedItem('data-val'), props.options);
        setState(state => ({
            text: '',
            chosen: [
                ...state.chosen,
                Number((e.target as HTMLLIElement).attributes.getNamedItem('data-val')?.value)
            ]
        }));
    };

    useEffect(() => {
        props.setter(state.chosen);
    }, [state.chosen])

    const removeChipCreator = (prop: string) => () => {
        setState(st => ({
            ...st,
            chosen: st.chosen.filter(c => c != Number(prop))
        }))
    }

    const getOptNameByVal = (val: number) => props.options?.find(o => o.val == val)?.name ?? '';

    return <div style={props.style} className={`${props.className} ${classNames.typeahead} ${classNames.chipRow}`}>
        {state.chosen.map(ch => <Chip renderChip={props.renderChip} onRemoveClick={removeChipCreator(ch.toString())} prop={getOptNameByVal(ch)} key={ch} />)}
        <input
            value={state.text}
            ref={props.refer}
            onChange={inputChangeHandler}
            className={`${classNames.typeaheadInput} ${classNames.chipInput}`}
            disabled={props.disabled} />
        <ul className={classNames.typeaheadSelector}>
            {props.options.filter(opt => ((opt.name ?? '').indexOf(state.text) != -1) && (state.chosen.find(c => c == opt.val) == undefined))
                .map(opt => (<li onClick={selectorChangeHandler} data-val={opt.val}>{opt.name}</li>))}
        </ul>
    </div>
}

interface IChipProps {
    renderChip: (prop: string) => JSX.Element,
    onRemoveClick: (() => void) | undefined,
    prop: string
}

export const Chip = (props: IChipProps) => {
    return <div className={classNames.chip}>
        {props.renderChip(props.prop)}
        {
            (props.onRemoveClick != undefined) &&
            <span onClick={props.onRemoveClick} className={classNames.chipCross}>
                <i className="fa fa-times" style={{ fontSize: '16pt' }} aria-hidden="true" />
            </span>
        }
    </div>
}

ChipsInput.defaultProps = {
    ...defaultIStyleableProps, ...defaultEditableProps, renderChip:
        (val: string) => <span title={val}>{val}</span>
};

export default ChipsInput;