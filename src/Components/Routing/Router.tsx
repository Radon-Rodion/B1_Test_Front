import React from "react";
import {Routes, Route, Navigate} from 'react-router-dom';
import { IChildable, defaultIChildableProps } from "../../Helpers/Interfaces";
import routesArray from "../../Arrays/RoutesArray";
import Header from "../Header/Header";

interface IRouterProps extends IChildable { }

const Router = (props: IRouterProps) => { //main router
    return (
        <Routes>
            {props.children}
            {routesArray.filter(ro => (ro.path != undefined) && (ro.component != undefined))
                .map(ro => <Route path={ro.path} element={ro.component} />)}
            <Route path="*" element={<Navigate to='/' />} />
        </Routes>
    );
}
Router.defaultProps = { ...defaultIChildableProps };

export default Router;