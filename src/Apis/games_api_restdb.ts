import { AppUrls } from "../Shared/Helpers/appUrls";
import IGame from "../Shared/Interfaces/IGame";
import { IVote, Vote } from "../Shared/Interfaces/IVote";

/**
 * Get all the vote of the logged in user
 * @param userId Twitch user id from logged in user
 * @param callback Do something after the request
 * @returns An array of IVote
 */
export const getUserVotes = async (userId: string) => {
    const votesPromise = await fetch(`${AppUrls.restdb_url}/votes?q={"userId":"${userId}"}`, {
        headers: {
            'x-apikey': `${process.env.REACT_APP_RESTDB_APIKEY}`,
        }
    });

    const json: Array<IVote> = await votesPromise.json();

    return json;
}

/**
 * Get games from restDB
 * @param callback Do something after the GET
 */
export const getGames = async () => {
    const gamesPromise = await fetch(`${AppUrls.restdb_url}/games`, {
        headers: {
            'x-apikey': `${process.env.REACT_APP_RESTDB_APIKEY}`,
        }
    });

    const games: Array<IGame> = await gamesPromise.json();

    return games;
}

/**
 * Add a game in restdb
 * @param game The game to add in restDB (from Twitch Helix API)
 * @param callback A callback function triggered after the end of the post request
 */
export const addGame = async (game: IGame) => {
    game.points = game.points ?? 0;

    try {
        if (!await doesGameExists(game)) {
            const addedGame = await fetch(`${AppUrls.restdb_url}/games`, {
                'method': 'POST',
                headers: {
                    'x-apikey': `${process.env.REACT_APP_RESTDB_APIKEY}`,
                    "content-type": "application/json"
                },
                body: JSON.stringify(game)
            });

            console.log('added game = ', addedGame);
        }
    } catch (error) {
        console.log('An error occured while adding a game : ', JSON.stringify(game));
    }
}

export const managePoints = async (game: IGame, action: 'add' | 'remove', vote: IVote | undefined, userId: string) => {
    try {
        const newGame = { ...game };
        let newVote;
        let voteMethod;
        let voteUrlParam;

        if (vote) {
            newVote = { ...vote };
            voteMethod = 'PATCH';
            voteUrlParam = `/${vote._id}`
        } else {
            newVote = new Vote(userId, game.id);
            voteMethod = 'POST';
            voteUrlParam = '';
        }

        if (action === 'add') {
            // @ts-ignore : Game will never be undefined, and if it is, we want an error
            newGame.points += 1;
            newVote.vote += 1;

        } else {
            // @ts-ignore
            newGame.points -= 1;
            newVote.vote -= 1;
        }

        // Add uers vote in Vote collection, so he can't vote multiple time for the same game
        await fetch(`${AppUrls.restdb_url}/votes${voteUrlParam}`, {
            'method': voteMethod,
            headers: {
                'x-apikey': `${process.env.REACT_APP_RESTDB_APIKEY}`,
                "content-type": "application/json"
            },
            body: voteMethod === 'PATCH' ? JSON.stringify(newVote, ['vote']) : JSON.stringify(newVote)
        });

        // Add/remove points in Game collection
        await fetch(`${AppUrls.restdb_url}/games/${game._id}`, {
            'method': 'PATCH',
            headers: {
                'x-apikey': `${process.env.REACT_APP_RESTDB_APIKEY}`,
                "content-type": "application/json"
            },
            body: JSON.stringify(newGame, ['points'])
        });
    } catch (error) {
        console.log('An error occured while adding a point : ', JSON.stringify({ game, vote }));
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