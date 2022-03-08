export interface IVote {
    _id?: string;
    userId: string;
    gameId: string;
    vote: 1 | 0 | -1;
}

export class Vote implements IVote {
    constructor(public userId: string, public gameId: string, public vote: -1 | 0 | 1 = 0) { }
}