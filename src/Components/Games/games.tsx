import React from 'react';
import ITwitchAppAccessToken from '../../Shared/Interfaces/ITwitchAppAccessToken';
import IGame from '../../Shared/Interfaces/IGame';
import { debouncedSearchMatchingGames } from '../../Apis/games_api_twitch';
import Button from '../../Shared/Components/Button/button';
import { addGame, getGames, managePoints } from '../../Apis/games_api_restdb';
import { useTwitchContext } from '../../Context/twitchAuthProvider';
import { Helpers } from '../../Shared/Helpers/helpers';

const Games = () => {
    const [searchedGames, setSearchedGames] = React.useState<Array<IGame>>();
    const [gamesFromDb, setGamesFromDb] = React.useState<Array<IGame>>();
    const { authedUser, setAuthedUser } = useTwitchContext();

    React.useEffect(() => {
        getAndSetGames();
    }, []);

    /**
     * Get games from restdb, set it in state and erase searched games from twitch API for clean behavior
     */
    const getAndSetGames = () => getGames((games: Array<IGame>) => {
        setSearchedGames(undefined);
        setGamesFromDb(games)
    });

    const buildGameDisplay = (game: IGame) => (
        <abbr key={game.id} title={game.name} className="w-1/6">
            <div
                className={["w-full flex flex-col items-center bg-stone-500 p-3 rounded", searchedGames ? 'cursor-pointer' : ''].join(' ')}
                onClick={() => { searchedGames && addGame(game, getAndSetGames) }}
            >
                <img src={game.box_art_url} alt="Game splash art" />
                <div className="w-full text-center truncate">{game.name}</div>
                {!searchedGames && (
                    <div className="flex justify-around items-center w-full">
                        <Button className="cursor-pointer w-9 h-9 rounded bg-stone-700" onClick={() => managePoints(game, 'remove', getAndSetGames)}>-</Button>
                        <div>{game.points}</div>
                        <Button className="cursor-pointer w-9 h-9 rounded bg-stone-700" onClick={() => managePoints(game, 'add', getAndSetGames)}>+</Button>
                    </div>
                )}
            </div>
        </abbr>
    )

    return (
        <>
            Search some Twitch game and add it to the restdb by clicking on it<br />
            <input type="text" placeholder="Game name" className="p-1 m-2" onChange={e => debouncedSearchMatchingGames(e, Helpers.capitalize(authedUser.tokenType), authedUser.accessToken, setSearchedGames)} />
            <hr />
            <div className="flex flex-wrap gap-2 justify-center items-stretch mt-3">
                {searchedGames ? searchedGames.map(buildGameDisplay) : gamesFromDb?.map(buildGameDisplay)}
            </div>
        </>
    )
}

export default Games;
