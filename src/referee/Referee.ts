import {
  Piece,
  PieceType,
  TeamType,
} from "./../Constants";

export default class Referee {
  tileIsOccupied(x: number, y: number, boardState: Piece[]) {
    console.log("tile is occupied");

    const piece = boardState.find((p) => p.x === x && p.y === y);

    if (piece) {
      return true;
    } else {
      return false;
    }
  }

  tileIsOccupiedByOpp(
    x: number,
    y: number,
    boardState: Piece[],
    team: TeamType
  ): boolean {
    const piece = boardState.find(
      (p) => p.x === x && p.y === y && p.team !== team
    );
    if (piece) {
      return true;
    } else {
      return false;
    }
  }

  isAppasentMove = (
    px: number,
    py: number,
    x: number,
    y: number,
    type: PieceType,
    team: TeamType,
    boardState: Piece[]
  ) => {
    const pawnDirection = team === TeamType.OUR ? 1 : -1;
    if (type === PieceType.PAWN) {
      if ((x - px === -1 || x - px === 1) && y - py === pawnDirection) {
        console.log("bottom - or upper left");
        console.log("bottom - or upper right");
        const piece = boardState.find(
          (p) => p.x === x && p.y === y - pawnDirection && p.enPassent
        );
        if (piece) {
          return true;
        }
      }
    }

    // if the attacking piece is a pawn
    // upper left / upper right || bottom left / bottom right
    // if a piece under / above the attacked tile
    // if the attacked piece has made a appasent move in the previous turn

    // put piece in correct position
    // remove enpassant piece
    return false;
  };

  isValidMove(
    px: number,
    py: number,
    x: number,
    y: number,
    type: PieceType,
    team: TeamType,
    boardState: Piece[]
  ) {
    // MOVEMENT LOGIC
    if (type === PieceType.PAWN) {
      const specialRow = team === TeamType.OUR ? 1 : 6;
      const pawnDirection = team === TeamType.OUR ? 1 : -1;

      if (px === x && py === specialRow && y - py === 2 * pawnDirection) {
        if (
          !this.tileIsOccupied(x, y, boardState) &&
          !this.tileIsOccupied(x, y - pawnDirection, boardState)
        ) {
          return true;
        }
      } else if (px === x && y - py === pawnDirection) {
        if (!this.tileIsOccupied(x, y, boardState)) {
          return true;
        }
      }
      //ATTACK LOGIC
      else if (x - px === -1 && y - py === pawnDirection) {
        console.log("bottom - or upper left");
        if (this.tileIsOccupiedByOpp(x, y, boardState, team)) {
          return true;
        }
      } else if (x - px === 1 && y - py === pawnDirection) {
        console.log("bottom - or upper right");
        if (this.tileIsOccupiedByOpp(x, y, boardState, team)) {
          return true;
        }
      }
    }
    return false;
  }
}
