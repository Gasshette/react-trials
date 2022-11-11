export interface IVote {
    _id?: string;
    voterId: string;
    listOwnerId: string;
    gameId: string;
    vote: 1 | 0 | -1;
}

export class Vote implements IVote {
    constructor(public voterId: string, public listOwnerId: string, public gameId: string, public vote: -1 | 0 | 1 = 0) { }
}