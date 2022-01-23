import React from 'react';
import { NavLink } from 'react-router-dom';
import { routes } from '../App/app';
import './navigation.scss';

interface NavigationProps {
    padding: string;
}

const Navigation = ({ padding }: NavigationProps) => {
    const buildLinks = () => {
        return routes.map(route =>
            <NavLink key={route.id} to={route.path} className={navData => navData.isActive ? 'active' : ''}>
                <li className="list-group-item mb-2 rounded-pill d-flex">
                    <div className="flexer"></div>
                    <div>{route.pathName}</div>
                </li>
            </NavLink>);
    }

    return (
        <div className="navigation-component bg-primary h-100">
            <ul className={["list-group", padding].join(' ')}>
                {buildLinks()}
            </ul>
        </div>
    )
}

export default Navigation;