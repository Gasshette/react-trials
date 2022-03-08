import React from 'react';
import { addGame } from '../../Apis/games_api_restdb';
import { useLoaderContext } from '../../Context/loaderProvider';
import Button from '../../Shared/Components/Button/button';
import { Helpers } from '../../Shared/Helpers/helpers';
import IGame from '../../Shared/Interfaces/IGame';
import { IVote } from '../../Shared/Interfaces/IVote';

const Game = ({ game, matchingVote, isSearchingGames, manageCounter, getAndSetGames }: { game: IGame, matchingVote: IVote | undefined, isSearchingGames: boolean, manageCounter: Function, getAndSetGames: Function }) => {
    const [counterState, setCounterState] = React.useState<{ isIncDisabled: boolean, isDecDisabled: boolean }>({ isIncDisabled: true, isDecDisabled: true })
    const { withLoader } = useLoaderContext();

    React.useEffect(() => {
        setCounterState({
            isIncDisabled: Helpers.isFilled(matchingVote) && matchingVote?.vote === 1,
            isDecDisabled: Helpers.isFilled(matchingVote) && matchingVote?.vote === -1
        });
    }, [matchingVote]);

    const addNewGame = async () => {
        await addGame(game);
        await getAndSetGames();
    };

    return (
        <abbr title={game.name} className="w-1/6">
            <div
                className={["w-full flex flex-col items-center bg-stone-500 p-3 rounded", isSearchingGames ? 'cursor-pointer' : ''].join(' ').trim()}
                onClick={() => isSearchingGames && withLoader(addNewGame)}
            >
                <img src={game.boxArtUrl} alt="Game splash art" />
                <div className="w-full text-center truncate">{game.name}</div>
                {!isSearchingGames && (
                    <div className="flex justify-around items-center w-full">
                        <Button
                            className={["w-9 h-9 rounded", !counterState.isDecDisabled ? "cursor-pointer bg-stone-700" : ''].join(' ').trim()}
                            onClick={() => manageCounter('remove', game, matchingVote)}
                            disabled={counterState.isDecDisabled}
                        >
                            -
                        </Button>
                        <div>{game.points}</div>
                        <Button
                            className={["w-9 h-9 rounded", !counterState.isIncDisabled ? "cursor-pointer bg-stone-700" : ""].join(' ').trim()}
                            onClick={() => manageCounter('add', game, matchingVote)}
                            disabled={counterState.isIncDisabled}
                        >
                            +
                        </Button>
                    </div>
                )}
            </div>
        </abbr >
    )
}

export default Game;