import debounce from "lodash.debounce";
import { AppUrls } from "../Shared/Helpers/appUrls";
import IGame from "../Shared/Interfaces/IGame";


export const debouncedSearchMatchingGames = debounce((e: React.ChangeEvent<HTMLInputElement>, tokenType: string, token: string, callback: Function) => searchMatchingGames(e, tokenType, token, callback), 1000);
/**
 * 
 * @param e onChange event
 * @param token twitch auth token
 * @param callback Do something after the search
 * @returns 
 */
const searchMatchingGames = async (e: React.ChangeEvent<HTMLInputElement>, tokenType: string, token: string, callback: Function) => {
    if (e.target.value.length <= 0) {
        callback(undefined);
        return;
    }

    const headers = new Headers();
    headers.set('Authorization', `${tokenType} ${token}`);
    headers.set('Client-Id', `${process.env.REACT_APP_TWITCH_CLIENT_ID}`);

    const gamesPromise = await fetch(`${AppUrls.twitch_helix_url}/${AppUrls.twitch_search_cat}?query=${e.target.value}`, { headers });
    const matchingGames: { data: Array<IGame> } = await gamesPromise.json();
    callback(matchingGames.data);
}
