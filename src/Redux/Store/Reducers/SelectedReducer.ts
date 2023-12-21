import { ADD_SELECTED, REMOVE_SELECTED } from "../../Actions/SelectedActions";
import { Selected, SelectedAction } from "../../Types/Selected";

const SELECTED = "selectedInfo";

const defStateInJSON = localStorage.getItem(SELECTED);

const defaultState: Selected = {
    items: defStateInJSON ? JSON.parse(defStateInJSON) : []
};

const selectedReducer = (state = defaultState, action: SelectedAction) => {
    switch (action.type) {
        case ADD_SELECTED: {
            const newItems = [...state.items, action.payload];
            localStorage.setItem(SELECTED, JSON.stringify(newItems));
            return { ...state, items: newItems };
        }
        case REMOVE_SELECTED: {
            const newItems = state.items.filter(it => it.mal_id != action.payload?.mal_id);
            localStorage.setItem(SELECTED, JSON.stringify(newItems));
            return { ...state, items: newItems };
        }
        default:
            return state;
    }
};

export default selectedReducer;