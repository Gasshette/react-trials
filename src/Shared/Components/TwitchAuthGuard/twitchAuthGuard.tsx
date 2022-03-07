import React from 'react';
import { readHash, userAuthToTwitchApi } from '../../../Apis/auth_api';
import { useTwitchContext } from '../../../Context/twitchAuthProvider';

const TwitchAuthGuard: React.FC = ({ children }) => {
    const { authedUser, setAuthedUser } = useTwitchContext();

    React.useEffect(() => {
        if (!authedUser && !window.location.hash) {
            userAuthToTwitchApi();
        } else if (!authedUser) {
            readHash(window.location.hash, setAuthedUser);
        }
    }, []);

    if (!authedUser) return <>Loading, please wait</>;
    return <>{children}</>
}

export default TwitchAuthGuard;