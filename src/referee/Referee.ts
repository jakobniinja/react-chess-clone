import { PieceType, TeamType } from "./../components/Chessboard/Chessboard";

export default class Referee {
  isValidMove(
    px: number,
    py: number,
    x: number,
    y: number,
    type: PieceType,
    team: TeamType
  ) {
    console.log("referee is checking move ...");
    console.log(`previous location: (${px},${py})`);
    console.log(`new location: (${x},${y})`);
    console.log(`piece type : ${type}`);
    console.log(`team  : ${team}`);

    if (type === PieceType.PAWN) {
      if (TeamType.OUR === team) {
        if (py === 1) {
          if (px === x && (y - py === 1 || y - py == 2)) {
            console.log("valid move ");
            return true;
          }
        } else {
          if (px === x && y - py === 1) {
            console.log("valid move ");
            return true;
          }
        }
      }
    }

    return false;
  }
}
