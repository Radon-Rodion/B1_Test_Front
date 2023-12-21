import { IStyleable, defaultIStyleableProps } from '../../Helpers/Interfaces';
import classes from './Paginators.module.scss';

interface IBasePaginatorProps extends IStyleable{
    page: number,
    setPage: React.Dispatch<React.SetStateAction<number>>,
    nPages: number
}

const BasePaginator = (props: IBasePaginatorProps) => {
    const handleClickPrev = () => {
        props.setPage(prevSt => prevSt > 1 ? prevSt - 1 : 1);
    }
    const handleClickNext = () => {
        props.setPage(prevSt => prevSt < props.nPages ? prevSt + 1 : props.nPages);
    }

    return (<div className={`row ${classes.paginator} ${props.className}`} style={props.style}>
        <button onClick={handleClickPrev} className={classes.baseButton}
            style={{ visibility: props.page > 1 ? 'visible' : 'hidden' }}>{'<'}</button>
        <span className={classes.pageNumber}>{props.page}/{props.nPages}</span>
        <button onClick={handleClickNext} className={classes.baseButton}
            style={{ visibility: props.page < props.nPages ? 'visible' : 'hidden' }}>{'>'}</button>
    </div>)
}

BasePaginator.defaultProps = { ...defaultIStyleableProps };

export default BasePaginator;