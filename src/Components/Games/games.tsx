import React from 'react';
import IGame from '../../Shared/Interfaces/IGame';
import { debouncedSearchMatchingGames, debouncedSearchChannels } from '../../Apis/games_api_twitch';
import { getGames, getUserVotes, managePoints } from '../../Apis/games_api_restdb';
import { useTwitchContext } from '../../Context/twitchAuthProvider';
import { Helpers } from '../../Shared/Helpers/helpers';
import { IVote } from '../../Shared/Interfaces/IVote';
import { useLoaderContext } from '../../Context/loaderProvider';
import Game from '../Game/game';
import IChannel from '../../Shared/Interfaces/IChannel';

const Games = () => {
    const [searchedGames, setSearchedGames] = React.useState<Array<IGame>>();
    const [searchedChannels, setSearchedChannels] = React.useState<Array<IChannel>>();
    const [selectedChannel, setSelectedChannel] = React.useState<IChannel>();
    const [userVotes, setUserVotes] = React.useState<Array<IVote>>();
    const [gamesFromDb, setGamesFromDb] = React.useState<Array<IGame>>();

    const { authedUser } = useTwitchContext();
    const { setIsLoading, withLoader } = useLoaderContext();

    const inputSearchChannelsRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        withLoader(async () => {
            await getAndSetGames();
            if (gamesFromDb) {
                await getAndSetUserVotes();
            }
            inputSearchChannelsRef.current && (inputSearchChannelsRef.current.value = '');
            setSearchedChannels(undefined);
        });
    }, []);

    React.useEffect(() => {
        if (selectedChannel) {
            withLoader(async () => {
                await getAndSetGames();
                if (gamesFromDb) {
                    await getAndSetUserVotes();
                }
                inputSearchChannelsRef.current && (inputSearchChannelsRef.current.value = '');
                setSearchedChannels(undefined);
            });
        }
    }, [selectedChannel]);

    /**
     * Get games from restdb, set it in state and erase searched games from twitch API for clean behavior
     */
    const getAndSetGames = async () => {
        const games: Array<IGame> = await getGames(selectedChannel ? selectedChannel.id : authedUser.sub);
        setSearchedGames(undefined);
        setGamesFromDb(games);
    }

    /**
     * Get user votes from restdb, set it in state
     */
    const getAndSetUserVotes = async () => {
        const votes = await getUserVotes(selectedChannel ? selectedChannel.id : authedUser.sub);
        setUserVotes(votes);
    }

    const manageCounter = (action: 'add' | 'remove', game: IGame, matchingVote: IVote | undefined) => {
        withLoader(async () => {
            await managePoints(game, action, matchingVote, authedUser.sub, selectedChannel ? selectedChannel.id : authedUser.sub);
            await getAndSetGames();
            await getAndSetUserVotes();
        });
    }

    const gameSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        debouncedSearchMatchingGames(e, Helpers.capitalize(authedUser.tokenType), authedUser.accessToken, setIsLoading, setSearchedGames);

    const searchChannelsInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        debouncedSearchChannels(e, Helpers.capitalize(authedUser.tokenType), authedUser.accessToken, setIsLoading, setSearchedChannels);

    const buildGameDisplay = (game: IGame) => {
        const matchingVote: IVote | undefined = userVotes?.find(v => v.gameId === game.id);

        return <Game
            key={game.id}
            game={game}
            displayedUserId={selectedChannel ? selectedChannel.id : authedUser.sub}
            matchingVote={matchingVote}
            isSearchingGames={Helpers.isFilled(searchedGames)}
            manageCounter={manageCounter}
            getAndSetGames={getAndSetGames} />
    }

    return (
        <>

            <div className="m-3">
                <div className="flex items-center">
                    <div className="w-1/2 flex gap-4 items-center">
                        {!searchedChannels && <div className="font-bold text-3xl mb-5">{selectedChannel ? `${selectedChannel.displayName}'s list` : 'Your list'}</div>}
                        {
                            !searchedChannels &&
                            !selectedChannel &&
                            <input type="text" placeholder="What game do you want to add ?" className="w-1/3 p-2 mb-3 rounded-lg bg-stone-500 text-slate-100" onChange={gameSearchInputChange} />
                        }
                    </div>

                    <div className="w-1/2 flex justify-end items-center gap-4">
                        <button
                            type="button"
                            className="p-2 rounded-lg bg-stone-500 text-slate-100 transition hover:scale-110"
                            onClick={() => { setSelectedChannel(undefined); getAndSetGames() }}>
                            Back to your list
                        </button>
                        <input
                            ref={inputSearchChannelsRef}
                            type="text"
                            placeholder="Which channel's games list do you want to see ?"
                            className="w-1/2 p-2 mb-3 rounded-lg bg-stone-500 text-slate-100"
                            onChange={searchChannelsInputChange} />
                    </div>
                </div>


                {searchedChannels ? (
                    <div className="flex flex-col items-center gap-3 w-3/6 m-auto">
                        {searchedChannels.map((channel: IChannel) => (
                            <div
                                key={channel.id}
                                className="flex items-center gap-3 text-3xl bg-stone-500 px-10 py-2 rounded-full cursor-pointer w-5/6 transition_width ease-in-out duration-300 hover:w-full"
                                onClick={() => setSelectedChannel(channel)}>
                                <img src={channel.thumbnailUrl} className="rounded-full w-16 h-16" />
                                {channel.displayName}
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                        <div className="min-h-max flex flex-wrap gap-2 justify-center items-stretch mt-3">
                            {/* @ts-ignore */}
                            {searchedGames ? searchedGames.map(buildGameDisplay) : gamesFromDb ? gamesFromDb.sort((a, b) => b.points - a.points).map(buildGameDisplay) : <></>}
                        </div>
                    </>
                )}
            </div>

        </>
    )
}

export default Games;
