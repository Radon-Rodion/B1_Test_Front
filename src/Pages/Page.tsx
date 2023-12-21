import { useSelector } from "react-redux";
import { IChildable, IStyleable, defaultIStyleableProps } from "../Helpers/Interfaces";
import classNames from './Page.module.scss';
import { RootState } from "../Redux/Store/Store";
import ErrorBoundary from "../Components/Routing/ErrorBoundary";


interface IPageProps extends IChildable, IStyleable { }

const Page = (props: IPageProps) => {
    return <div className={classNames.page}>
        <ErrorBoundary><>
            {props.children}
        </></ErrorBoundary>
    </div>;
}

Page.defaultProps = { ...defaultIStyleableProps };

export default Page;