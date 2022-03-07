import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTwitchContext } from '../../Context/twitchAuthProvider';
import { routes } from '../App/app';
import './navigation.scss';

interface NavigationProps {
    style: string;
}

const Navigation = ({ style }: NavigationProps) => {
    const { authedUser } = useTwitchContext();

    const buildLinks = () => {
        return (
            <>
                {authedUser && (
                    <div className="flex flex-wrap gap-2 justify-center items-center mb-2">
                        <img src={authedUser.picture} alt="Profile picture" className="w-24 h-24 rounded-full" />
                        <div>
                            <div className="w-full truncate text-slate-100 font-extrabold text-2xl">{authedUser.preferredUsername}</div>
                            <div className="w-full truncate text-slate-100 font-thin italic">{authedUser.email}</div>
                        </div>
                    </div>
                )}
                {routes.map(route =>
                    <NavLink key={route.path} to={route.path} className={navData => navData.isActive ? 'active' : ''}>
                        <li className="mb-2 flex p-3 text-2xl rounded-full transition ease-in delay-100 hover:bg-stone-700 text-slate-100">
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