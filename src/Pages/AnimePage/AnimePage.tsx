import { useParams } from "react-router";
import { useApi, useRefState } from "../../Helpers/CustomHooks";
import requester from "../../Helpers/Requester";
import { IAnimeModel, defaultAnimeModel } from "../../Models/IAnimeModel";
import { useRef } from "react";
import Page from "../Page";
import BaseBox from "../../Elements/Boxes/BaseBox";
import Row from "../../Elements/Flexers/Row";
import Column from "../../Elements/Flexers/Column";
import { getImage } from "../../Helpers/SupportFunctions";


const AnimePage = () => {
    const { id } = useParams();
    const [loading, setLoading] = useRefState(true);
    const [anime, _, updateAnime] = useApi<IAnimeModel>(() => requester.anime.getAnimeById(Number(id)), defaultAnimeModel, (dat: any) => {
        console.log('RESP_AN', dat);
        return dat?.data;
    }, () => setLoading(false));

    return <Page><>
        <BaseBox><>
            <Row>
                <Column xl='4'>
                    <img src={getImage(anime.images)} alt={getImage(anime.images)} />
                </Column>
                <Column xl='8'><>
                    <Row>
                        <Column xl='5'><b>{anime.title}</b></Column>
                        <Column xl='4'>{anime.type}</Column>
                        <Column xl='3'>{anime.type}</Column>
                    </Row>
                    <Row>
                        <Column xl='3'>Рейтинг:</Column>
                        <Column xl='9'>{anime.rating}</Column>
                    </Row>
                    <Row>
                        <Column xl='3'>Жанр:</Column>
                        <Column xl='9'>{anime.genres.map(ge => ge.name).join(', ')}</Column>
                    </Row>
                    <Row>
                        <Column xl='12'>{anime.background}</Column>
                    </Row>
                </></Column>
            </Row><br />
            <Row>
                <Column xl='12'>{anime.synopsis}</Column>
            </Row>
            <Row>
                <Column xl='3'>Оценка:</Column>
                <Column xl='4'>{anime.score}</Column>
                <Column xl='5'><>${`От ${anime.scored_by} пользователей`}</></Column>
            </Row>
            <Row>
                <Column xl='6'><a href={anime.url}>Информация в блоге</a></Column>
                <Column xl='6'><a href={anime.trailer?.url}>Трейлер</a></Column>
            </Row>
            <iframe width="420" height="315"
                src={anime.trailer?.url}>
            </iframe>
        </></BaseBox>
    </></Page>
}

export default AnimePage;