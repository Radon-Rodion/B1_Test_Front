import AnimePage from "../Pages/AnimePage/AnimePage";
import { AnimeList, MangaList } from "../Pages/List/List";
import MangaPage from "../Pages/MangaPage/MangaPage";
import Selected from "../Pages/Selected/Selected";
import StartPage from "../Pages/StartPage/StartPage";

const routesArray = [
    { path: '/anime', component: <AnimeList />, tabName: 'Аниме' },
    { path: '/manga', component: <MangaList />, tabName: 'Манга' },
    { path: '/selected', component: <Selected />, tabName: 'Избранное' },
    { path: '/anime/:id', component: <AnimePage />, tabName: undefined },
    { path: '/manga/:id', component: <MangaPage />, tabName: undefined },
    { path: '/', component: <StartPage />, tabName: undefined }
];

export default routesArray;