import React from 'react';
import { IAuthedUser } from '../Shared/Interfaces/IAuthedUser';

interface ITwitchAuthContext {
    authedUser: IAuthedUser,
    setAuthedUser: React.Dispatch<React.SetStateAction<IAuthedUser>>
}

const TwitchAuthContext = React.createContext<any>(undefined);

const TwitchAuthProvider: React.FC = ({ children }) => {
    const [authedUser, setAuthedUser] = React.useState<IAuthedUser>();

    return (
        <TwitchAuthContext.Provider value={{ authedUser, setAuthedUser }}>
            {children}
        </TwitchAuthContext.Provider>
    )
}

export default TwitchAuthProvider;


export const useTwitchContext = () => React.useContext<ITwitchAuthContext>(TwitchAuthContext);