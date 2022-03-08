import React from 'react';
import IGame from '../../Shared/Interfaces/IGame';
import { debouncedSearchMatchingGames, searchMatchingGames } from '../../Apis/games_api_twitch';
import Button from '../../Shared/Components/Button/button';
import { addGame, getGames, getUserVotes, managePoints } from '../../Apis/games_api_restdb';
import { useTwitchContext } from '../../Context/twitchAuthProvider';
import { Helpers } from '../../Shared/Helpers/helpers';
import { IVote } from '../../Shared/Interfaces/IVote';
import { useLoaderContext } from '../../Context/loaderProvider';

const Games = () => {
    const [searchedGames, setSearchedGames] = React.useState<Array<IGame>>();
    const [userVotes, setUserVotes] = React.useState<Array<IVote>>();
    const [gamesFromDb, setGamesFromDb] = React.useState<Array<IGame>>();

    const { authedUser } = useTwitchContext();
    const { setIsLoading } = useLoaderContext();

    React.useEffect(() => {
        withLoader(async () => {
            setIsLoading(true);
            await getAndSetGames();
            await getAndSetUserVotes();
            setIsLoading(false);
        });
    }, []);

    const withLoader = async (func: Function) => {
        setIsLoading(true);
        await func();
        setIsLoading(false);
    }

    /**
     * Get games from restdb, set it in state and erase searched games from twitch API for clean behavior
     */
    const getAndSetGames = async () => {
        const games: Array<IGame> = await getGames();
        setSearchedGames(undefined);
        setGamesFromDb(games);
    }

    /**
     * Get user votes from restdb, set it in state
     */
    const getAndSetUserVotes = async () => getUserVotes(authedUser.sub, (votes: Array<IVote>) => {
        setUserVotes(votes);
    });

    const manageCounter = (action: 'add' | 'remove', game: IGame, matchingVote: IVote | undefined) => {
        withLoader(async () => {
            await managePoints(game, action, matchingVote, authedUser.sub);
            await getAndSetGames();
            await getAndSetUserVotes();
        });
    }

    const buildGameDisplay = (game: IGame) => {
        const matchingVote: IVote | undefined = userVotes?.find(v => v.gameId === game.id);
        const incrementDisabled = userVotes?.some(v => (v.gameId === game.id && v.vote === 1));
        const decrementDisabled = userVotes?.some(v => (v.gameId === game.id && v.vote === -1));

        return (
            <abbr key={game.id} title={game.name} className="w-1/6">
                <div
                    className={["w-full flex flex-col items-center bg-stone-500 p-3 rounded", searchedGames ? 'cursor-pointer' : ''].join(' ').trim()}
                    onClick={() => { searchedGames && withLoader(() => addGame(game, getAndSetGames)) }}
                >
                    <img src={game.boxArtUrl} alt="Game splash art" />
                    <div className="w-full text-center truncate">{game.name}</div>
                    {!searchedGames && (
                        <div className="flex justify-around items-center w-full">
                            <Button
                                className={["w-9 h-9 rounded", !decrementDisabled ? "cursor-pointer bg-stone-700" : ''].join(' ').trim()}
                                onClick={() => manageCounter('remove', game, matchingVote)}
                                disabled={decrementDisabled}
                            >
                                -
                            </Button>
                            <div>{game.points}</div>
                            <Button
                                className={["w-9 h-9 rounded", !incrementDisabled ? "cursor-pointer bg-stone-700" : ""].join(' ').trim()}
                                onClick={() => manageCounter('add', game, matchingVote)}
                                disabled={incrementDisabled}
                            >
                                +
                            </Button>
                        </div>
                    )}
                </div>
            </abbr >
        )
    }

    return (
        <>
            Search some Twitch games and add it to the restdb by clicking on it : <br />
            <input type="text" placeholder="Game name" className="p-1 m-2" onChange={(e: React.ChangeEvent<HTMLInputElement>) => debouncedSearchMatchingGames(e, Helpers.capitalize(authedUser.tokenType), authedUser.accessToken, setIsLoading, setSearchedGames)} />
            <hr />
            <div className="min-h-max flex flex-wrap gap-2 justify-center items-stretch mt-3">
                {/* @ts-ignore */}
                {searchedGames ? searchedGames.map(buildGameDisplay) : gamesFromDb ? gamesFromDb.sort((a, b) => b.points - a.points).map(buildGameDisplay) : <></>}
            </div>
        </>
    )
}

export default Games;
