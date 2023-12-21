import React from "react";
import { IAnimeModel } from "../../Models/IAnimeModel";
import { IMangaModel } from "../../Models/IMangaModel";
import classNames from './Cards.module.scss';
import StarsMark from "./StarsMark";
import { useNavigate } from "react-router";
import { clamp, getImage } from "../../Helpers/SupportFunctions";
import SelectedStarBtn from "./SelectedStarBtn";

interface ICardProps {
    info: IAnimeModel | IMangaModel;
}

const GameCard = ({ info }: ICardProps) => {
    const navigate = useNavigate();
    const onCardClick = () => info.isAnime ? navigate(`/anime/${info.mal_id}`) : navigate(`/manga/${info.mal_id}`);

    return (
        <div className={classNames.card} onClick={onCardClick}>
            <div className={classNames.front}>
                <img src={getImage(info.images)} alt={getImage(info.images)} className={classNames.image} />
                <SelectedStarBtn className={classNames.selectedStar} model={info} />
                <div className={classNames.frontInfo}>
                    <div className={classNames.title}>{info.title}</div>
                    <div className={classNames.type}>{info.type}</div>
                    <StarsMark value={info.score} />
                </div>
            </div>

            <div className={classNames.back}>
                <div className={classNames.backContent}>
                    <SelectedStarBtn className={classNames.selectedStar} model={info} />
                    <div className={classNames.description} title={info.synopsis}>{clamp(info.synopsis, 300)}</div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(GameCard);