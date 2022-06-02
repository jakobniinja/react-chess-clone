import { useRef, useState } from "react";
import Tile from "../Tile/Tile";
import "./Chessboard.css";
import Referee from "../../referee/Referee";

export enum PieceType {
  PAWN,
  BISHOP,
  KNIGHT,
  ROOK,
  QUEEN,
  KING,
}

export enum TeamType {
  OPPONENT,
  OUR,
}
export interface Piece {
  image: string;
  x: number;
  y: number;
  type: PieceType;
  team: TeamType
}

export default function Chessboard() {
  const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
  const [gridX, setGridX] = useState(0);
  const [gridY, setGridY] = useState(0);
  const chessboardRef = useRef<HTMLDivElement>(null);
  const initialBoardState: Piece[] = [];
  const [pieces, setPieces] = useState<Piece[]>(initialBoardState);
  const referee = new Referee();

  const HORIZONTAL_AXIS = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const VERTICAL_AXIS = ["1", "2", "3", "4", "5", "6", "7", "8"];

  for (let p = 0; p < 2; p++) {
    const teamType = p === 0 ? TeamType.OPPONENT : TeamType.OUR;
    const type = teamType === TeamType.OPPONENT ? "b" : "w";
    const y = teamType === TeamType.OPPONENT ? 7 : 0;

    initialBoardState.push({
      image: `./assets/images/rook_${type}.png`,
      x: 0,
      y,
      type: PieceType.ROOK,
    team: teamType
    });
    initialBoardState.push({
      image: `./assets/images/rook_${type}.png`,
      x: 7,
      y,
      type: PieceType.ROOK,
      team:  teamType
    });
    initialBoardState.push({
      image: `./assets/images/knight_${type}.png`,
      x: 1,
      y,
      type: PieceType.KNIGHT,
      team:  teamType
    });
    initialBoardState.push({
      image: `./assets/images/knight_${type}.png`,
      x: 6,
      y,
      type: PieceType.KNIGHT,
      team:  teamType
    });
    initialBoardState.push({
      image: `./assets/images/bishop_${type}.png`,
      x: 2,
      y,
      type: PieceType.BISHOP,
      team: teamType
    });
    initialBoardState.push({
      image: `./assets/images/bishop_${type}.png`,
      x: 5,
      y,
      type: PieceType.BISHOP,
      team: teamType
    });
    initialBoardState.push({
      image: `./assets/images/king_${type}.png`,
      x: 4,
      y,
      type: PieceType.KING,
      team:  teamType
    });
    initialBoardState.push({
      image: `./assets/images/queen_${type}.png`,
      x: 3,
      y,
      type: PieceType.QUEEN,
      team:  teamType
    });
  }

  for (let i = 0; i < 8; i++) {
    initialBoardState.push({
      image: "./assets/images/pawn_b.png",
      x: i,
      y: 6,
      type: PieceType.PAWN,
      team: TeamType.OPPONENT 
    });
  }

  for (let i = 0; i < 8; i++) {
    initialBoardState.push({
      image: "./assets/images/pawn_w.png",
      x: i,
      y: 1,
      type: PieceType.PAWN,
      team: TeamType.OUR
    });
  }

  // const pieces: Piece[] = [];

  const grabPiece = (e: React.MouseEvent) => {
    const chessboard = chessboardRef.current;
    const el = e.target as HTMLElement;
    if (el.classList.contains("chess-piece") && chessboard) {
      console.log(e);
      setGridX(Math.floor((e.clientX - chessboard.offsetLeft) / 100));
      setGridY(
        Math.abs(Math.floor((e.clientY - chessboard.offsetTop - 700) / 100))
      );

      const x = e.clientX - 50;
      const y = e.clientY - 50;
      el.style.position = "absolute";
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      setActivePiece(el);
    }
  };

  const movePiece = (e: React.MouseEvent) => {
    const el = e.target as HTMLElement;

    const chessboard = chessboardRef.current;
    if (activePiece && chessboard) {
      console.log(el);

      const minX = chessboard.offsetLeft - 25;
      const minY = chessboard.offsetTop - 25;
      const maxX = chessboard.offsetLeft + chessboard.clientWidth - 75;
      const maxY = chessboard.offsetTop + chessboard.clientHeight - 75;
      const x = e.clientX - 50;
      const y = e.clientY - 50;
      activePiece.style.position = "absolute";
      console.log(chessboard);

      // if x is less then minimum amount
      if (x < minX) {
        activePiece.style.left = `${minX}px`;
      }
      // if x is smaller then minimum amount
      else if (x > maxX) {
        activePiece.style.left = `${maxX}px`;
      } else {
        activePiece.style.left = `${x}px`;
      }
      // if y is smaller  then minumum amount
      if (y < minY) {
        activePiece.style.top = `${minY}px`;
      }
      // if y is greater then maxiumum amount
      else if (y > maxY) {
        activePiece.style.top = `${maxY}px`;
      } else {
        activePiece.style.top = `${y}px`;
      }
    }
  };
  const dropPiece = (e: React.MouseEvent) => {
    const chessboard = chessboardRef.current;
    if (activePiece && chessboard) {
      //updates the piece position
      setPieces((value) => {
        const x = Math.floor((e.clientX - chessboard.offsetLeft) / 100);
        const y = Math.abs(
          Math.floor((e.clientY - chessboard.offsetTop - 700) / 100)
        );
        console.log(x, y);

        const pieces = value.map((p) => {
          if (p.x === gridX && p.y === gridY) {
            const validMove = referee.isValidMove(gridX, gridY, x, y, p.type, p.team, value);
            if (validMove ) {
            p.x = x;
            p.y = y;
              
            }else{
              activePiece.style.position="relative"
              activePiece.style.removeProperty('top');
              activePiece.style.removeProperty('left');

            }
          }
          return p;
        });

        return pieces;
      });
      setActivePiece(null);
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
      ref={chessboardRef}
    >
      {board}
    </div>
  );
}
