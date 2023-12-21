import { useParams } from "react-router";
import { useApi, useRefState } from "../../Helpers/CustomHooks";
import requester from "../../Helpers/Requester";
import { useRef } from "react";
import Page from "../Page";
import BaseBox from "../../Elements/Boxes/BaseBox";
import Row from "../../Elements/Flexers/Row";
import Column from "../../Elements/Flexers/Column";
import { getImage } from "../../Helpers/SupportFunctions";
import { IMangaModel, defaultMangaModel } from "../../Models/IMangaModel";


const MangaPage = () => {
    const { id } = useParams();
    const [loading, setLoading] = useRefState(true);
    const [manga, _, updateManga] = useApi<IMangaModel>(() => requester.manga.getMangaById(Number(id)), defaultMangaModel, (dat: any) => {
        console.log('RESP_AN', dat);
        return dat?.data;
    }, () => setLoading(false));

    return <Page><>
        <BaseBox><>
            <Row>
                <Column xl='4'>
                    <img src={getImage(manga?.images)} alt={getImage(manga?.images)} />
                </Column>
                <Column xl='8'><>
                    <Row>
                        <Column xl='5'><b>{manga.title}</b></Column>
                        <Column xl='4'>{manga.type}</Column>
                        <Column xl='3'>{manga.type}</Column>
                    </Row>
                    <Row>
                        <Column xl='3'>Авторство:</Column>
                        <Column xl='9'>{manga.authors.map(au => au.name).join(', ')}</Column>
                    </Row>
                    <Row>
                        <Column xl='3'>Жанр:</Column>
                        <Column xl='9'>{manga.genres.map(ge => ge.name).join(', ')}</Column>
                    </Row>
                    <Row>
                        <Column xl='12'>{manga.background}</Column>
                    </Row>
                </></Column>
            </Row><br />
            <Row>
                <Column xl='12'>{manga.synopsis}</Column>
            </Row>
            <Row>
                <Column xl='3'>Оценка:</Column>
                <Column xl='4'>{manga.score}</Column>
                <Column xl='5'><>${`От ${manga.scored_by} пользователей`}</></Column>
            </Row>
            <Row>
                <Column xl='6'><a href={manga.url}>Информация в блоге</a></Column>
            </Row>
        </></BaseBox>
    </></Page>
}

export default MangaPage;