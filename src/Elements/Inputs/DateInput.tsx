import { IEditable, defaultEditableProps } from "./InputsInterfaces";
import classNames from './Inputs.module.scss';
import { ChangeEvent, useState, useEffect } from "react";
import { IStyleable, defaultIStyleableProps } from "../../Helpers/Interfaces";
import { formatDate, isValidDate, toDate } from "../../Helpers/SupportFunctions";
const InputMask = require('react-input-mask');


interface IDateInputProps extends IEditable<string>, IStyleable { }

const DateInput = (props: IDateInputProps) => {
    const [date, setDate] = useState(formatDate(props.value ?? props.defaultValue, "yyyy-mm-dd"));

    useEffect(() => {
        if(isValidDate(toDate((date as string), 'yyyy-mm-dd'))) props.setter(date as string);
    }, [date]);

    return <div className={`${classNames.dateInput} ${props.className}`}>
        <InputMask mask='9999-99-99' value={date} title='yyyy-mm-dd' className={classNames.dateInputMask} disabled={props.disabled}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDate(e.target.value)} 
            defaultValue={props.value?.toString() ?? props.defaultValue?.toString()}/>

        <input type="date"
            style={{...props.style, ...(props.disabled ? {display: 'none'} : {})}}
            className={`${classNames.datePicker}`}
            disabled={props.disabled}
            ref={props.refer}
            value={isValidDate(toDate((date as string), 'yyyy-mm-dd')) ? (date as string) : undefined}
            onChange={(e) => {
                const dateStr = formatDate(new Date(e.target.value), "yyyy-mm-dd") as string;
                setDate(dateStr);
            }}
        />
    </div>
}

DateInput.defaultProps = { ...defaultIStyleableProps, ...defaultEditableProps };

export default DateInput;