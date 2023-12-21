import { useLocation } from "react-router";
import Logo from "./Logo";
import LeftMenu, { IItem } from "./LeftMenu";
import routesArray from "../../Arrays/RoutesArray";
import classNames from "./Header.module.scss";
import { IChildable } from "../../Helpers/Interfaces";

const Header = () => {
    const items: IItem[] = routesArray.filter(rArr => rArr.tabName != undefined).map(rArr => ({
        link: rArr.path,
        name: rArr.tabName ?? '',
        childrenTabs: []
    }));

    return (
        <>
            <header>
                <nav className={classNames.headerItems}>
                    <Logo style={{ height: '50px', marginLeft: '70px' }} />
                </nav>
            </header>
            <LeftMenu items={items} />
        </>
    );
}

export default Header;