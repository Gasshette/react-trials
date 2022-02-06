import React from 'react';
import { NavLink } from 'react-router-dom';
import { routes } from '../App/app';
import './navigation.scss';

interface NavigationProps {
    style: string;
}

const Navigation = ({ style }: NavigationProps) => {
    const buildLinks = () => {
        return (
            <>
                {routes.map(route =>
                    <NavLink key={route.path} to={route.path} className={navData => navData.isActive ? 'active' : ''}>
                        <li className="mb-2 flex p-3 rounded-full hover:bg-stone-700 text-slate-100">
                            <div className="flexer"></div>
                            <div>{route.pathName}</div>
                        </li>
                    </NavLink>
                )}
                <h5 className="mt-5 text-center"><a className="text-slate-100 text-3xl break-all" href="https://animate.style/" target="__blank">https://animate.style/</a></h5>
            </>
        );
    }

    return (
        <div className={["navigation-component", style].join(' ')}>
            <ul>
                {buildLinks()}
            </ul>
        </div>
    )
}

export default Navigation;