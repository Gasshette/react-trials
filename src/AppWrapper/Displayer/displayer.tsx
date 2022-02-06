import IChildren from "../../Shared/Interfaces/IChildren";
import Navigation from "../Navigation/navigation";

const Displayer = ({ children }: IChildren) => {
    const padding = 'p-3';
    return (
        <div className="h-100 d-flex">
            <Navigation padding={padding} />
            <div className={["overflow-auto", padding, 'w-100'].join(' ')}>{children}</div>
        </div>
    );
}

export default Displayer;