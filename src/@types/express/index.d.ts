// sobrescrevendo infos do express

declare namespace Express {
    export interface Request {
        user: {
            id: string;
        };
    }
}
