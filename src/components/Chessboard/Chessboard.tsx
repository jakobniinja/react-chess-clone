import Tile from "../Tile/Tile";
import "./Chessboard.css";

export default function Chessboard() {
  const HORIZONTAL_AXIS = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const VERTICAL_AXIS = ["1", "2", "3", "4", "5", "6", "7", "8"];

  interface Piece {
    image: string;
    x: number;
    y: number;
  }

  const pieces: Piece[] = [];

  for (let p = 0; p < 2; p++) {
    const type = p === 0 ? "b" : "w";
    const y = p === 0 ? 7 : 0;

    pieces.push({ image: `./assets/images/rook_${type}.png`, x: 0, y });
    pieces.push({ image: `./assets/images/rook_${type}.png`, x: 7, y });
    pieces.push({ image: `./assets/images/knight_${type}.png`, x: 1, y });
    pieces.push({ image: `./assets/images/knight_${type}.png`, x: 6, y });
    pieces.push({ image: `./assets/images/bishop_${type}.png`, x: 2, y });
    pieces.push({ image: `./assets/images/bishop_${type}.png`, x: 5, y });
    pieces.push({ image: `./assets/images/king_${type}.png`, x: 4, y });
    pieces.push({ image: `./assets/images/queen_${type}.png`, x: 3, y });
  }

  for (let i = 0; i < 8; i++) {
    pieces.push({ image: "./assets/images/pawn_b.png", x: i, y: 6 });
  }

  for (let i = 0; i < 8; i++) {
    pieces.push({ image: "./assets/images/pawn_w.png", x: i, y: 1 });
  }

  let board = [];

  for (let j = VERTICAL_AXIS.length - 1; j >= 0; j--) {
    for (let i = 0; i < HORIZONTAL_AXIS.length; i++) {
      const number = j + i + 2;

      let image = undefined;
      pieces.forEach((p) => {
        if (p.x === i && p.y === j) {
          image = p.image;
        }
      });
      board.push(<Tile image={image} number={number} />);
    }
  }
  return <div id="chessboard">{board}</div>;
}