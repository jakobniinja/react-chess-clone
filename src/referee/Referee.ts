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

  tileIsOccupiedByOpponent(
    x: number,
    y: number,
    boardState: Piece[],
    team: TeamType
  ): boolean {
    const piece = boardState.find(
      (p) => p.x === x && p.y === y && p.team !== team
    );

    return piece ? true : false;
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
    // console.log("referee is checking move ...");
    // console.log(`previous location: (${px},${py})`);
    // console.log(`new location: (${x},${y})`);
    // console.log(`piece type : ${type}`);
    // console.log(`team  : ${team}`);

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
      //Attack logic
      else if (x - px === -1 && y - py === pawnDirection) {
        //Attack on top-left | bottom-left corner
        console.log("upper-left | bottom-left");
        if (this.tileIsOccupiedByOpponent(x, y, boardState, team)) {
          console.log("we cant strike opp");
        }
      } else if (x - px === 1 && y - py === pawnDirection) {
        //Attack on top-right | bottom-right corner
        console.log("upper-right| bottom-right");
      }
    }

    return false;
  }
}
