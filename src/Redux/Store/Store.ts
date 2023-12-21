import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import selectedReducer from "./Reducers/SelectedReducer";
// import { composeWithDevTools } from "remote-redux-devtools";

const rootReducer = combineReducers({
    selected: selectedReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof rootReducer>;

export default store;