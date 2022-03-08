import debounce from "lodash.debounce";
import { AppUrls } from "../Shared/Helpers/appUrls";
import { Helpers } from "../Shared/Helpers/helpers";
import IGame from "../Shared/Interfaces/IGame";

export const debouncedSearchMatchingGames =
    debounce((e: React.ChangeEvent<HTMLInputElement>, tokenType: string, token: string, setIsLoading: Function, callback: Function) =>
        searchMatchingGames(e, tokenType, token, setIsLoading, callback),
        1000
    );

/**
 * 
 * @param e onChange event
 * @param token twitch auth token
 * @param callback Do something after the search
 * @returns 
 */
export const searchMatchingGames = async (e: React.ChangeEvent<HTMLInputElement>, tokenType: string, token: string, setIsLoading: Function, callback: Function) => {
    if (e.target.value.length <= 0) {
        callback(undefined);
        return;
    }

    const headers = new Headers();
    headers.set('Authorization', `${tokenType} ${token}`);
    headers.set('Client-Id', `${process.env.REACT_APP_TWITCH_CLIENT_ID}`);

    setIsLoading(true);

    const gamesPromise: Response = await fetch(`${AppUrls.twitch_helix_url}/${AppUrls.twitch_search_cat}?query=${e.target.value}&first=100`, { headers });
    const json: { data: Array<any> } = await gamesPromise.json();

    const matchingGames: Array<IGame> = json.data.map(game => Helpers.toCamelCaseObject(game));

    callback(matchingGames);
    setIsLoading(false);
}
