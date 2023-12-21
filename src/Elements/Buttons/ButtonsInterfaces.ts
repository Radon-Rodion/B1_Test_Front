import { MouseEvent } from "react";

export interface IButtonable {
    onClick: (e: MouseEvent) => void,
    type: 'button' | 'submit'
}

export const defaultIButtonableProps = {
    onClick: (e: MouseEvent) => {},
    type: 'button'
};