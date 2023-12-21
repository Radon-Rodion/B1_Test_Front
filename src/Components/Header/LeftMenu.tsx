import { Component, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import classNames from './Header.module.scss';
import { IChildable } from "../../Helpers/Interfaces";
import React from "react";
import Router from "../Routing/Router";

export interface IItem {
    link: string | undefined,
    name: string,
    parentTabName?: string | undefined,
    childrenTabs?: IItem[] | undefined
}

interface ILeftMenuProps {
    items: Array<IItem>
}

var showMenuStatus = false;
var needToShowAnimation = false;

const getAnimTag = () => needToShowAnimation ? 'Animate' : 'NoAnimate';

const itemsArrToItemsTree = (itemsArr: IItem[]) => {
    const res: IItem[] = [];
    itemsArr.forEach(it => {
        if (it.parentTabName == undefined) {
            res.push({ ...it, childrenTabs: [] });
        } else {
            res.find(i => i.name == it.parentTabName)?.childrenTabs?.push(it);
        }
    });
    return res;
}

const LeftMenu = (props: ILeftMenuProps) => {
    const [shown, setShown] = useState(showMenuStatus);
    const [items, setItems] = useState(itemsArrToItemsTree(props.items));
    showMenuStatus = shown;

    const changeShown = () => {
        needToShowAnimation = true;
        setShown(!shown);
    }

    useEffect(() => {
        needToShowAnimation = false;
    })

    // useEffect(() => {
    //     document.documentElement.addEventListener('click', (e) => {
    //         if(showMenuStatus){
    //             setShown(false);
    //         }
    //     });
    // }, []);
    console.log("TABS_ITEMS", items);

    return (
        <div id='menu'>
            <button className={classNames.menuBtn} onClick={() => changeShown()}><i className="fa fa-bars" aria-hidden="true" /></button>
            <div className={classNames.body}>
                <ul className={`${classNames.menu} ${shown ? classNames[`menuShown${getAnimTag()}`] : classNames[`menuHidden${getAnimTag()}`]}`}>
                    <MenuItself items={items} />
                </ul>
                <Router />
            </div>
        </div>
    )
}

interface IMenuItselfProps {
    items: Array<IItem>
}

class MenuItself extends Component<IMenuItselfProps, {}>{
    constructor(props: IMenuItselfProps) {
        super(props);
    }

    shouldComponentUpdate(nextProps: IMenuItselfProps, nextState: IMenuItselfProps){
        return false;
     }

    render() {
        console.log('RERENDER');
        return <>
        {this.props.items.map((item, index) =>
            <ParentTab item={item} childItems={item.childrenTabs ?? []} key={index} />
        )}</>
    }
}

// const MenuItself = React.memo(_MenuItself, (prevProps, nextProps) => true );


const ParentTab = (props: { item: IItem, childItems: Array<IItem> }) => {
    const navigate = useNavigate();
    const currentPath = useLocation().pathname;
    const [isCollapsed, setIsCollapsed] = useState(false);

    const onIconClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        e.stopPropagation();
        setIsCollapsed(!isCollapsed);
    }

    console.log(props.item.name, isCollapsed);

    return <>
        <li className={`${classNames.menuLi} ${props.item.link == currentPath ? classNames.activeLink : ""}`} onClick={() => {if(props.item.link) navigate(props.item.link)}}>
            {props.item.name}
            {(!!props.childItems?.length) && <span onClick={onIconClick} className={`${classNames.submenuIcon} ${isCollapsed ? classNames.submenuIconCollapse : ''}`}><i className='fa fa-caret-down' /></span>}
        </li>
        {isCollapsed && (!!props.childItems?.length) && <ul className={classNames.submenuList}>
            {props.childItems.map((chi, i) => <li className={`${classNames.menuLi} ${chi.link == currentPath ? classNames.activeLink : ""}`} key={i} onClick={() => {if(chi.link) navigate(chi.link)}}>
                {chi.name}
            </li>)}
        </ul>}
    </>
}

export default LeftMenu;