import img from '../../Assets/Images/logo.png';
import { useNavigate } from 'react-router';
import { IStyleable, defaultIStyleableProps } from '../../Helpers/Interfaces';

interface ILogoProps extends IStyleable {}

const Logo = (props: ILogoProps) => {
    const navigate = useNavigate();

    return (
        <img src={img} alt='B1-logo' style={{...props.style, cursor: 'pointer'}} className={props.className} onClick={e => navigate('/')}/>
    );
}

Logo.defaultProps = { ...defaultIStyleableProps };

export default Logo;