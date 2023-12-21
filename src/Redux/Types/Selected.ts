import { IAnimeModel } from "../../Models/IAnimeModel";
import { IMangaModel } from "../../Models/IMangaModel";

export interface Selected {
    items: Array<IAnimeModel | IMangaModel>
}

export interface SelectedAction {
    type: string;
    payload: IMangaModel | IAnimeModel;
}