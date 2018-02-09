import React from "react";
import { render } from "react-dom";

import {
    BrowserRouter as Router, Route, Link
} from 'react-router-dom'

export const Menu = (props) => {
    return (
        <div className="menu">
            <div className="slimScrollDiv">
                <ul className="list">
                    <li>
                        <Link to="/home/1" className="toggled waves-effect waves-block">
                            <i className="material-icons">home</i>
                            <span>Home page</span>
                        </Link>
                    </li>
                    <li className="">
                        <Link to="/lists/admin" className=" waves-effect waves-block">
                            <i className="material-icons">info</i>
                            <span>[Admin]</span>
                        </Link>
                    </li>
                    <li className="">
                        <Link to="/lists/admin/detail/1" className=" waves-effect waves-block">
                            <i className="material-icons">info</i>
                            <span>Detail</span>
                        </Link>
                    </li>
                    <li className="">
                        <Link to="/todo" className=" waves-effect waves-block">
                            <i className="material-icons">todo</i>
                            <span>todo</span>
                        </Link>
                    </li>
                </ul>
                <div className="slimScrollBar"></div>
                <div className="slimScrollRail"></div>
            </div>
        </div>);
}