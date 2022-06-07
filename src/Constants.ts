export const HORIZONTAL_AXIS = ["a", "b", "c", "d", "e", "f", "g", "h"];
export const VERTICAL_AXIS = ["1", "2", "3", "4", "5", "6", "7", "8"];
export interface Piece {
  image: string;
  x: number;
  y: number;
  type: PieceType;
  team: TeamType;
  enPassent?: boolean;
}

export enum TeamType {
  OPPONENT,
  OUR,
}
export enum PieceType {
  PAWN,
  BISHOP,
  KNIGHT,
  ROOK,
  QUEEN,
  KING,
}


export const  initialBoardState: Piece[] = [{}];