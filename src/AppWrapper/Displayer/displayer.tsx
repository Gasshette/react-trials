import IChildren from "../../Shared/Interfaces/IChildren";
import Navigation from "../Navigation/navigation";

const Displayer = ({ children }: IChildren) => {
    return (
        <div className="h-100 d-flex">
            <Navigation padding="p-3" />
            <div className="p-3">{children}</div>
        </div>
    );
}

export default Displayer;