import { IAnimeModel } from '../../Models/IAnimeModel';
import { IMangaModel } from '../../Models/IMangaModel';
import { RootState } from '../../Redux/Store/Store';
import { MouseEvent } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { addSelected, removeSelected } from '../../Redux/ActionCreators/SelectedActionCreators';
import { IStyleable, defaultIStyleableProps } from '../../Helpers/Interfaces';

interface ISelectedStarBtnProps extends IStyleable {
    model: IAnimeModel | IMangaModel
}

const SelectedStarBtn = ({ model, style, className }: ISelectedStarBtnProps) => {
    const selected = useSelector((state: RootState) => state.selected.items);
    const existsInSelected = selected.find(sel => sel.mal_id == model.mal_id) != undefined;

    const dispatch = useDispatch();

    const title = existsInSelected ? 'Исключить из избранного' : 'Добавить в избранное';
    const onClick = (e: React.MouseEvent<HTMLElement>) => { 
        e.stopPropagation();
        if(existsInSelected) dispatch(removeSelected(model));
        else dispatch(addSelected(model));
    };
    const icon = existsInSelected ? 'fa-star' : 'fa-star-o';

    return <i className={`fa ${icon} ${className}`} style={{ ...style, color: 'yellow' }} onClick={onClick} title={title} />
}

SelectedStarBtn.defaultProps = { ...defaultIStyleableProps };

export default SelectedStarBtn;