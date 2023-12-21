import { IAnimeModel } from "../../Models/IAnimeModel";
import { IMangaModel } from "../../Models/IMangaModel";
import { ADD_SELECTED, REMOVE_SELECTED } from "../Actions/SelectedActions";

export const addSelected = (payload: IAnimeModel | IMangaModel) => ({ type: ADD_SELECTED, payload });
export const removeSelected = (payload: IAnimeModel | IMangaModel) => ({ type: REMOVE_SELECTED, payload });