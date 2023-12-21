import { IImageModel } from "../Helpers/Interfaces";


export interface IAnimeModel{
    mal_id: number,
    title: string,
    background: string, 
    synopsis: string, //description
    rating: string,
    score: number,
    scored_by: number,
    type: string,
    images: IImageModel,
    genres: Array<IGenre>,
    year: number,
    trailer: ITrailer,
    url: string, //to anime blog
    isAnime: true
}

export interface ITrailer{
    url: string //to YouTube
}

export interface IGenre{
    name: string
}

export const defaultAnimeModel: IAnimeModel = {
    mal_id: 0,
    title: "",
    background: "",
    synopsis: "",
    rating: "",
    score: 0,
    scored_by: 0,
    type: "",
    images: {jpg: undefined, webp: undefined},
    genres: [],
    year: 0,
    trailer: {url: ''},
    url: "",
    isAnime: true
}