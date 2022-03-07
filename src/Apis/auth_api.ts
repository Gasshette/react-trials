import { AppUrls } from "../Shared/Helpers/appUrls";
import { Helpers } from "../Shared/Helpers/helpers";
import { IAuthedUser } from "../Shared/Interfaces/IAuthedUser";
import ITwitchAppAccessToken from "../Shared/Interfaces/ITwitchAppAccessToken";
import IdTokenVerifier from 'idtoken-verifier';

export const appAuthToTwitchApi = async (callback: Function) => {
    const params = [
        `client_id=${process.env.REACT_APP_TWITCH_CLIENT_ID}`,
        `client_secret=${process.env.REACT_APP_TWITCH_CLIENT_SECRET}`,
        'grant_type=client_credentials',
    ]
    const twitchAppToken = await fetch(`${AppUrls.twitch_app_auth_url}?${params.join('&')}`, { 'method': 'POST' });

    const appAccessToken: ITwitchAppAccessToken = await twitchAppToken.json();
    callback(appAccessToken);
}

/**
 * Redirect a use to the authentication page of Twitch. See the following link for more details :
 * https://dev.twitch.tv/docs/authentication/getting-tokens-oidc/#oidc-implicit-code-flow
 */
export const userAuthToTwitchApi = async () => {
    const params = [
        `client_id=${process.env.REACT_APP_TWITCH_CLIENT_ID}`,
        `redirect_uri=${encodeURI(process.env.REACT_APP_TWITCH_CLIENT_REDIRECT_URL || '')}`,
        `response_type=token id_token`,
        'scope=openid user:read:email',
        'claims={"id_token":{"email":null,"email_verified":null,"picture":null,"preferred_username":null}}'
    ]
    try {
        window.location.replace(`${AppUrls.twitch_user_auth_url}?${params.join('&')}`);
    } catch (error: any) {
        throw new Error(`Error while trying to authenticate : ${error.message}`)
    }
}

/**
 * 
 * @param hash Hash string. ex: #access_token=<token value>&id_token=<id_value>
 * @param callback Do something with the object extracted from the hash string
 */
export const readHash = (hash: string, callback: Function) => {
    const hashSplit = hash.substring(1).split('&');
    const authInfo: any = {};

    for (let i = 0; i < hashSplit.length; i++) {
        const pairSplit = hashSplit[i].split('=');
        const key = pairSplit[0];
        const value = pairSplit[1];

        authInfo[key] = value;
    }

    verifyIdToken(authInfo, callback);
}

const verifyIdToken = (authInfo: any, callback: Function) => {
    const verifier = new IdTokenVerifier({
        issuer: 'https://id.twitch.tv/oauth2',
        audience: `${process.env.REACT_APP_TWITCH_CLIENT_ID}`,
        jwksURI: 'https://id.twitch.tv/oauth2/keys'
    });

    verifier.verify(authInfo.id_token, '', (error, payload) => {
        if (error) {
            console.log('Error while verifying the token : ', error);
            return;
        }

        const fullAuthedUserInfo: IAuthedUser = Helpers.toCamelCaseObject({ ...authInfo, ...payload });
        callback(fullAuthedUserInfo);
    });
}
