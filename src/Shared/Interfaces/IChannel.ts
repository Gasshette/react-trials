export default interface IChannel {
    broadcasterLanguage: string;
    broadcasterLogin: string;
    displayName: string;
    gameId: string;
    gameName: string;
    id: string;
    isLive: boolean;
    tagsIds: Array<string>;
    thumbnailUrl: string;
    title: string;
    startedAt: string;
}