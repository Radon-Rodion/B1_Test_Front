import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import toast from "react-hot-toast";
import { IResponseData } from "./Interfaces";
import { ISearchModel } from "../Models/ISearchModel";
import { validatePageNumber } from "./SupportFunctions";

const extractException = (resp: AxiosError<any, undefined>) => {
    return resp.response?.data?.exception?.Message ?? resp.response?.data?.message ?? resp.response?.data?.title ?? resp?.message ?? 'Something went wrong...';
}

const processGetRequest = (getRequest: Promise<AxiosResponse<any, any>>) => {
    return getRequest.then(resp => {
        console.log('RESPONSE', resp);
        return resp.data;
    }).catch((err: AxiosError<any, undefined>) => toast.error(extractException(err)));
}

axios.defaults.baseURL = process.env.REACT_APP_URI;

const requester = {
    anime: {
        getAnimeRecommended: (page: number) => processGetRequest(axios.get('/anime', { params: {page: validatePageNumber(page), limit: 20, orderBy: 'score', sort: 'desc'} })),
        getAnimeSearch: (searchModel: ISearchModel) => processGetRequest(axios.get('/anime', { params: {...searchModel, page: validatePageNumber(searchModel.page)} })),
        getAnimeById: (id: number) => processGetRequest(axios.get(`/anime/${id}/full`))
    },
    manga: {
        getMangaRecommended: (page: number) => processGetRequest(axios.get('/manga', { params: {page: validatePageNumber(page), limit: 20, orderBy: 'score', sort: 'desc'} })),
        getMangaSearch: (searchModel: ISearchModel) => processGetRequest(axios.get('/manga', { params: {...searchModel, page: validatePageNumber(searchModel.page)} })),
        getMangaById: (id: number) => processGetRequest(axios.get(`/manga/${id}/full`))
    }
}

export default requester;