export default interface IGame {
    _id?: string;
    id: string;
    userId: string;
    boxArtUrl: string;
    name: string;
    points?: number
}