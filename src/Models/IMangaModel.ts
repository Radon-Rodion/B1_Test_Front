import { IImageModel } from "../Helpers/Interfaces";
import { IGenre } from "./IAnimeModel";


export interface IMangaModel{
    mal_id: number,
    title: string,
    background: string, 
    synopsis: string, //description
    score: number,
    scored_by: number,
    type: string,
    authors: Array<IAuthor>,
    images: IImageModel,
    genres: Array<IGenre>,
    url: string, //to manga blog
    isAnime: false
}

interface IAuthor{
    name: string
}

export const defaultMangaModel: IMangaModel = {
    mal_id: 0,
    title: "",
    background: "",
    synopsis: "",
    score: 0,
    scored_by: 0,
    type: "",
    authors: [],
    images: {jpg: undefined, webp: undefined},
    genres: [],
    url: "",
    isAnime: false
}