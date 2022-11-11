import React from "react";
import { useLocation } from "react-router-dom";
import Loader from "../../Components/Loader/loader";
import { useLoaderContext } from "../../Context/loaderProvider";
import { Helpers } from "../../Shared/Helpers/helpers";
import IChildren from "../../Shared/Interfaces/IChildren";
import Navigation from "../Navigation/navigation";

const Displayer = ({ children }: IChildren) => {
    const location = useLocation();
    const { isLoading } = useLoaderContext();

    return (
        <div className="h-full flex">
            <Navigation style='w-1/6 bg-blue-500 p-3' />
            <div className={["relative p-3 w-5/6 bg-stone-700 text-slate-100", isLoading ? 'overflow-hidden' : 'overflow-auto'].join(' ')}>
                {/* <div className="font-bold text-3xl mb-5">{location.pathname === '/' ? 'Home' : Helpers.capitalize(location.pathname.replace('/', ''))}</div> */}
                <div>{children}</div>
                {isLoading && <Loader />}
            </div>
        </div>
    )
}

export default Displayer;