import { PieceType } from "./../components/Chessboard/Chessboard";

export default class Referee {
  isValidMove(px: number, py: number, x: number, y: number, type: PieceType) {
    console.log("referee is checking move ...");
    console.log(`previous location: (${px},${py})`);
    console.log(`new location: (${x},${y})`);
    console.log(`piece type : ${type}`);

    return true;
  }
}
