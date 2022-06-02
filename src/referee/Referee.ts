import {
  Piece,
  PieceType,
  TeamType,
} from "./../components/Chessboard/Chessboard";

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

  isValidMove(
    px: number,
    py: number,
    x: number,
    y: number,
    type: PieceType,
    team: TeamType,
    boardState: Piece[]
  ) {
    console.log("referee is checking move ...");
    console.log(`previous location: (${px},${py})`);
    console.log(`new location: (${x},${y})`);
    console.log(`piece type : ${type}`);
    console.log(`team  : ${team}`);

    if (type === PieceType.PAWN) {
      if (TeamType.OUR === team) {
        if (py === 1) {
          if (px === x && y - py === 1) {
            console.log("valid move ");
            if (!this.tileIsOccupied(x, y, boardState)) {
              return true;
            }
          } else if (y - py === 2) {
            if (
              !this.tileIsOccupied(x, y, boardState) &&
              !this.tileIsOccupied(x, y - 1, boardState)
            ) {
              return true;
            }
          }
        } else {
          if (px === x && y - py === 1) {
            if (!this.tileIsOccupied(x, y, boardState)) {
              console.log("valid move ");
              return true;
            }
          }
        }
      } else {
        if (py === 6) {
          if (px === x && y - py === -1) {
            console.log("valid opp move ");
            return true;
          } else if (px === x && y - py === -2) {
            if (
              !this.tileIsOccupied(x, y + 1, boardState) &&
              !this.tileIsOccupied(x, y + 1, boardState)
            ) {
              return true;
            }
          }
        } else {
          if (px === x && y - py === -1) {
            console.log("valid opp  move +1 ");
            if (!this.tileIsOccupied(x, y, boardState)) {
              return true;
            }
          }
        }
      }
    }

    return false;
  }
}
