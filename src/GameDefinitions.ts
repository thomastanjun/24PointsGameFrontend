export interface CellInfo {
    formula: string;
    result: string;  
    error: string;
}

export interface GameStatusInfo {
    gameStatus: string;
    winner: string;
    winnerFormula: string;
}

export interface PageInfo {
    players: {
        [playerName: string]: CellInfo;
    };
    gameNumbers: string[];
    gameStatus: GameStatusInfo;
}

export interface Rooms {
    status: string;
    roomList: RoomInfo[];
}

export interface RoomInfo {
    roomID: string;
    hostPlayer: string;
    vacancySeats: string
}

