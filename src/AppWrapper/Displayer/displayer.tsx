import { useLocation } from "react-router-dom";
import IChildren from "../../Shared/Interfaces/IChildren";
import Navigation from "../Navigation/navigation";

const Displayer = ({ children }: IChildren) => {
    const location = useLocation();

    return (
        <div className="h-full flex">
            <Navigation style='w-1/6 bg-blue-500 p-3' />
            <div className="p-3 w-5/6 overflow-auto bg-stone-700 text-slate-100">
                <div className="font-bold text-3xl mb-5">{location.pathname === '/' ? 'Home' : location.pathname.replace('/', '')}</div>
                {children}
            </div>
        </div>
    );
}

export default Displayer;