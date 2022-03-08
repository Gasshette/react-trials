import React from 'react';
import IGame from '../../Shared/Interfaces/IGame';
import { debouncedSearchMatchingGames } from '../../Apis/games_api_twitch';
import { getGames, getUserVotes, managePoints } from '../../Apis/games_api_restdb';
import { useTwitchContext } from '../../Context/twitchAuthProvider';
import { Helpers } from '../../Shared/Helpers/helpers';
import { IVote } from '../../Shared/Interfaces/IVote';
import { useLoaderContext } from '../../Context/loaderProvider';
import Game from '../Game/game';

const Games = () => {
    const [searchedGames, setSearchedGames] = React.useState<Array<IGame>>();
    const [userVotes, setUserVotes] = React.useState<Array<IVote>>();
    const [gamesFromDb, setGamesFromDb] = React.useState<Array<IGame>>();

    const { authedUser } = useTwitchContext();
    const { setIsLoading, withLoader } = useLoaderContext();

    React.useEffect(() => {
        withLoader(async () => {
            await getAndSetGames();
            await getAndSetUserVotes();
        });
    }, []);

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
    const getAndSetUserVotes = async () => {
        const votes = await getUserVotes(authedUser.sub);
        setUserVotes(votes);
    }

    const manageCounter = (action: 'add' | 'remove', game: IGame, matchingVote: IVote | undefined) => {
        withLoader(async () => {
            await managePoints(game, action, matchingVote, authedUser.sub);
            await getAndSetGames();
            await getAndSetUserVotes();
        });
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        debouncedSearchMatchingGames(e, Helpers.capitalize(authedUser.tokenType), authedUser.accessToken, setIsLoading, setSearchedGames);

    const buildGameDisplay = (game: IGame) => {
        const matchingVote: IVote | undefined = userVotes?.find(v => v.gameId === game.id);

        return <Game key={game.id} game={game} matchingVote={matchingVote} isSearchingGames={Helpers.isFilled(searchedGames)} manageCounter={manageCounter} getAndSetGames={getAndSetGames} />
    }

    return (
        <>
            Search some Twitch games and add it to the restdb by clicking on it : <br />
            <input type="text" placeholder="Game name" className="p-1 m-2" onChange={handleInputChange} />
            <hr />
            <div className="min-h-max flex flex-wrap gap-2 justify-center items-stretch mt-3">
                {/* @ts-ignore */}
                {searchedGames ? searchedGames.map(buildGameDisplay) : gamesFromDb ? gamesFromDb.sort((a, b) => b.points - a.points).map(buildGameDisplay) : <></>}
            </div>
        </>
    )
}

export default Games;
