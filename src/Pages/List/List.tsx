import { SetStateAction, useEffect, useState } from "react";
import BaseBox from "../../Elements/Boxes/BaseBox";
import BaseCard from "../../Elements/Cards/BaseCard";
import { IAnimeModel } from "../../Models/IAnimeModel";
import { ISearchModel, checkModelIsLikeDeafult, defaultSearchModel } from "../../Models/ISearchModel";
import requester from "../../Helpers/Requester";
import classNames from './List.module.scss';
import BasePaginator from "../../Elements/Paginators/BasePaginator";
import DropdownableFilters from "../../Components/Dropdownables/DropdownableFilters";
import Page from "../Page";
import { IMangaModel } from "../../Models/IMangaModel";
import { usePrompt } from "../../Helpers/CustomHooks";

interface IStateModel {
    loading: boolean,
    search: ISearchModel,
    records: Array<IAnimeModel | IMangaModel>,
    nPages: number
}

const List = ({ isAnime }: { isAnime: boolean }) => {
    const [{ loading, search, records, nPages }, setState] = useState<IStateModel>({ loading: true, search: defaultSearchModel, records: [], nPages: 0 });
    useEffect(() => {
        getRecords();
    }, [search.page, isAnime]);

    console.log('RECORDS', records);

    const getRecords = () => {
        const request = isAnime ? (checkModelIsLikeDeafult(search) ? requester.anime.getAnimeRecommended(search.page) : requester.anime.getAnimeSearch(search))
            : (checkModelIsLikeDeafult(search) ? requester.manga.getMangaRecommended(search.page) : requester.manga.getMangaSearch(search));
        request.then(dat => setState(st =>
            ({ ...st, loading: false, records: dat?.data?.map((d: IAnimeModel | IMangaModel) => ({...d, isAnime})) ?? [],
            nPages: dat?.pagination?.last_visible_page ?? 0 })));
};

const setPage = (page: number | ((prevPage: number) => number)) => {
    if (typeof (page) == 'number') setState(st => ({ ...st, search: { ...st.search, page: page }, loading: true }));
    else setState(st => ({ ...st, search: { ...st.search, page: page(st.search.page) }, loading: true }));
}

const setSearch = (search: ISearchModel | ((prevSearch: ISearchModel) => ISearchModel)) => {
    if (typeof (search) == 'function') setState(st => ({ ...st, search: search(st.search) }));
    else setState(st => ({ ...st, search }));
}

const applyFilters = () => {
    setState(st => ({ ...st, loading: true, search: { ...st.search, } }));
    getRecords();
}

usePrompt('Вы действительно хотите продолжить? Введённые фильтры не сохранятся!', !checkModelIsLikeDeafult(search));

return <Page><>
    <DropdownableFilters model={search} setModel={setSearch} applyFilters={applyFilters} isAnime={isAnime}/>
    <BaseBox className={classNames.recordsBox}><>
        {records.map(re => <BaseCard key={re.mal_id} info={re} />)}
        {nPages <= 1 ? <div /> : <BasePaginator page={search.page} setPage={setPage} nPages={nPages} />}
    </></BaseBox>
</></Page>
}

export const AnimeList = () => {
    return <List isAnime={true} />
}

export const MangaList = () => {
    return <List isAnime={false} />
}