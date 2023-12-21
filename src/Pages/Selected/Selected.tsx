import { SetStateAction, useEffect, useState } from "react";
import BaseBox from "../../Elements/Boxes/BaseBox";
import BaseCard from "../../Elements/Cards/BaseCard";
import { IAnimeModel } from "../../Models/IAnimeModel";
import { ISearchModel, checkModelIsLikeDeafult, defaultSearchModel } from "../../Models/ISearchModel";
import requester from "../../Helpers/Requester";
import classNames from './Selected.module.scss';
import BasePaginator from "../../Elements/Paginators/BasePaginator";
import DropdownableFilters from "../../Components/Dropdownables/DropdownableFilters";
import Page from "../Page";
import { IMangaModel } from "../../Models/IMangaModel";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store/Store";

const Selected = () => {
    const [page, setPage] = useState(1);
    const records = useSelector((state: RootState) => state.selected.items);
    const nPages = records.length / 20;

    return <Page><>
        <BaseBox className={classNames.recordsBox}>{records.length==0 ? 'Пока нет записей' : <>
            {records.map(re => <BaseCard key={re.mal_id} info={re} />)}
            {nPages <= 1 ? <div /> : <BasePaginator page={page} setPage={setPage} nPages={nPages} />}
        </>}</BaseBox>
    </></Page>
}

export default Selected;