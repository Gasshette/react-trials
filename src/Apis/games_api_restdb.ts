import { AppUrls } from "../Shared/Helpers/appUrls";
import IGame from "../Shared/Interfaces/IGame";

/**
 * Get games from restDB
 * @param callback Do something after the GET
 */
export const getGames = async (callback: Function) => {
    const gamesPromise = await fetch(`${AppUrls.restdb_url}/games`, {
        headers: {
            'x-apikey': `${process.env.REACT_APP_RESTDB_APIKEY}`,
        }
    });

    const games: Array<IGame> = await gamesPromise.json();

    callback(games);
}

/**
 * Add a game in restdb
 * @param game The game to add in restDB (from Twitch Helix API)
 * @param callback A callback function triggered after the end of the post request
 */
export const addGame = async (game: IGame, callback: Function) => {
    game.points = game.points ?? 0;

    try {
        if (!await doesGameExists(game)) {
            await fetch(`${AppUrls.restdb_url}/games`, {
                'method': 'POST',
                headers: {
                    'x-apikey': `${process.env.REACT_APP_RESTDB_APIKEY}`,
                    "content-type": "application/json"
                },
                body: JSON.stringify(game)
            });

            callback();
        }
    } catch (error) {
        console.log('An error occured while adding a game : ', JSON.stringify(game));
    }
}

export const managePoints = async (game: IGame, action: 'add' | 'remove', callback: Function) => {
    try {
        // @ts-ignore : Game will never be undefined, and is it is, we want an error
        game.points = action === 'add' ? game.points + 1 : game.points - 1;

        await fetch(`${AppUrls.restdb_url}/games/${game._id}`, {
            'method': 'PATCH',
            headers: {
                'x-apikey': `${process.env.REACT_APP_RESTDB_APIKEY}`,
                "content-type": "application/json"
            },
            body: JSON.stringify(game, ['points'])
        });

        callback();
    } catch (error) {
        console.log('An error occured while adding a point : ', JSON.stringify(game));
    }
}

const doesGameExists = async (game: IGame) => {
    const replacer = (key: string, value: any) => key === 'points' ? undefined : value;
    const gamesPromise = await fetch(`${AppUrls.restdb_url}/games?q=${JSON.stringify(game, replacer)}`, {
        headers: {
            'x-apikey': `${process.env.REACT_APP_RESTDB_APIKEY}`,
        },
    });

    const matchingGames: Array<IGame> = await gamesPromise.json();

    return matchingGames.some((g: IGame) => g.id === game.id);
}