import Tile from "../Tile/Tile";
import "./Chessboard.css";

export default function Chessboard() {
  const HORIZONTAL_AXIS = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const VERTICAL_AXIS = ["1", "2", "3", "4", "5", "6", "7", "8"];

  interface Piece{
    image: string
    x: string
    y: string
  }

  const pieces: Piece[] = [];

  let board = [];

  for (let i = VERTICAL_AXIS.length-1; i >= 0; i--) {
    for (let j = 0; j < HORIZONTAL_AXIS.length; j++) {
      const number = j + i + 2;

      pieces.forEach(p => {


      })
      board.push(
        <Tile image="./assets/images/pawn_b.png" number={number} />
      )
    }
  }
  return <div id="chessboard">{board}</div>;
}
