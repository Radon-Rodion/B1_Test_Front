
import classNames from './Cards.module.scss';

interface ICardProps {
    value: number;
  }

const StarsMark = ({value}: ICardProps) => {
    if(value == undefined) return <div/>;
    const integerPart = Math.floor(value);
    const realPartPercent = Math.round((value - integerPart) * 100);
    console.log('INTEGER_PART', integerPart, value);
    return <div className={classNames.starsRow}>
        {new Array(integerPart).fill(0).map((el, i) => <i key={i} className='fa fa-star' style={{color: 'yellow'}}/>)}
        <i className={`fa fa-star-half`} style={{color: 'yellow'}}/>
        {new Array(9-integerPart).fill(0).map((el, i) => <i key={i} className='fa fa-star' style={{opacity: '0'}}/>)}
        <span className={classNames.mark}>{value}</span>
    </div>;
}

export default StarsMark;