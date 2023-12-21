export interface IEditable<T> {
    defaultValue: T,
    value: T,
    setter: (val: T) => void,
    refer: React.MutableRefObject<null> | undefined,
    disabled: boolean
}

export const defaultEditableProps = {
    defaultValue: undefined,
    value: undefined,
    setter: (val: any) => {},
    refer: undefined,
    disabled: false
};

export interface ISelectorOption { 
    name: string | undefined, 
    val: number | undefined
};

export const toISelectorOptions = <T>(notOption: T, valField: keyof T, nameField: keyof T) => {
    return {
        name: notOption?.[nameField] ?? '',
        val: Number(notOption?.[valField])
    } as ISelectorOption;
}