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

  let activePiece: HTMLElement | null = null;

  const grabPiece = (e: React.MouseEvent) => {
    const el = e.target as HTMLElement;
    if (el.classList.contains("chess-piece")) {
      console.log(e);

      const x = e.clientX - 50;
      const y = e.clientY - 50;
      el.style.position = "absolute";
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      activePiece = el;
    }
  };

  const movePiece = (e: React.MouseEvent) => {
    const el = e.target as HTMLElement;

    if (activePiece) {
      console.log(el);

      const x = e.clientX - 50;
      const y = e.clientY - 50;
      activePiece.style.position = "absolute";
      activePiece.style.left = `${x}px`;
      activePiece.style.top = `${y}px`;
    }
  };
  const dropPiece = (e: React.MouseEvent) => {
    if (activePiece) {
      activePiece = null;
    }
  };

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
      board.push(<Tile key={`${j},${i}`} image={image} number={number} />);
    }
  }
  return (
    <div
      onMouseMove={(e) => movePiece(e)}
      onMouseDown={(e) => grabPiece(e)}
      onMouseUp={(e) => dropPiece(e)}
      id="chessboard"
    >
      {board}
    </div>
  );
}
