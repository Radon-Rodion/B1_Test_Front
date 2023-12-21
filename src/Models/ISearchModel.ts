

export interface ISearchModel {
    page: number,
    limit: number,
    q: string,
    type: string | undefined,
    min_score: number | undefined,
    max_score: number | undefined,
    start_date: string | undefined, //format: YYYY-MM-DD
    end_date: string | undefined, //format: YYYY-MM-DD
    [index: string]: string | number | undefined
}

export const animeTypeVariants = [
    'TV',
    'Movie',
    'Ova',
    'Special',
    'Ona',
    'Music'
]

export const mangaTypeVariants = [
    'Manga',
    'Novel',
    'Oneshot',
    'Doujin',
    'Manhwa',
    'Manhua'
]

export const defaultSearchModel: ISearchModel = {
    page: 1,
    limit: 20,
    q: "",
    type: undefined,
    min_score: undefined,
    max_score: undefined,
    start_date: undefined,
    end_date: undefined
}

export const checkModelIsLikeDeafult = (model: ISearchModel) => {
    return model.type == defaultSearchModel.type &&
    model.min_score == defaultSearchModel.min_score &&
    model.max_score == defaultSearchModel.max_score &&
    model.start_date == defaultSearchModel.start_date &&
    model.end_date == defaultSearchModel.end_date &&
    model.q == defaultSearchModel.q;
}