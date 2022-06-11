import { isValidElement, useRef, useState } from "react";
import Tile from "../Tile/Tile";
import "./Chessboard.css";

import Referee from "../../referee/Referee";
import {
  HORIZONTAL_AXIS,
  VERTICAL_AXIS,
  PieceType,
  TeamType,
  Piece,
  initialBoardState,
  Position,
  GRID_SIZE,
  samePosition,
} from "../../Constants";

export default function Chessboard() {
  const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
  const [grabPosition, setGrabPosition] = useState<Position>({ x: -1, y: -1 });
  const chessboardRef = useRef<HTMLDivElement>(null);
  const [pieces, setPieces] = useState<Piece[]>(initialBoardState);
  const referee = new Referee();

  const grabPiece = (e: React.MouseEvent) => {
    const chessboard = chessboardRef.current;
    const el = e.target as HTMLElement;
    if (el.classList.contains("chess-piece") && chessboard) {
      console.log(e);
      const grabX = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE);
      const grabY = Math.abs(
        Math.floor((e.clientY - chessboard.offsetTop - 700) / GRID_SIZE)
      );
      setGrabPosition({ x: grabX, y: grabY });

      const x = e.clientX - GRID_SIZE / 2;
      const y = e.clientY - GRID_SIZE / 2;
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
      const x = e.clientX - GRID_SIZE / 2;
      const y = e.clientY - GRID_SIZE / 2;
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
      // if y is smaller  then minimum amount
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
      const x = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE);

      const y = Math.abs(
        Math.floor((e.clientY - chessboard.offsetTop - 700) / GRID_SIZE)
      );
      const currentPiece = pieces.find((p) =>
        samePosition(p.position, grabPosition)
      );

      if (currentPiece) {
        const validMove = referee.isValidMove(
          grabPosition,
          { x, y },
          currentPiece.type,
          currentPiece.team,
          pieces
        );
        const isEnpassentMove = referee.isAppasentMove(
          grabPosition,
          { x, y },

          currentPiece.type,
          currentPiece.team,
          pieces
        );

        const pawnDirection = currentPiece.team === TeamType.OUR ? 1 : -1;
        if (isEnpassentMove) {
          const updatePiece = pieces.reduce((acc, i) => {
            if (samePosition(i.position, grabPosition)) {
              i.enPassent = false;
              i.position.x = x;
              i.position.y = y;
              acc.push(i);
            } else if (!samePosition(i.position, { x, y: pawnDirection })) {
              if (i.type === PieceType.PAWN) {
                i.enPassent = false;
              }
              acc.push(i);
            }
            return acc;
          }, [] as Piece[]);
          setPieces(updatePiece);
        } else if (validMove) {
          // UPDATE THE PIECE POSITION
          const updatedPieces = pieces.reduce((acc, i) => {
            if (samePosition(i.position, grabPosition)) {
              i.enPassent =
                Math.abs(grabPosition.y - y) === 2 && i.type === PieceType.PAWN;

              i.position.x = x;
              i.position.y = y;
              acc.push(i);
            } else if (!samePosition(i.position, { x, y })) {
              if (i.type === PieceType.PAWN) {
                i.enPassent = false;
              }
              acc.push(i);
            }
            return acc;
          }, [] as Piece[]);
          setPieces(updatedPieces);
        } else {
          // RESET THE PIECE POSITION
          activePiece.style.position = "relative";
          activePiece.style.removeProperty("top");
          activePiece.style.removeProperty("left");
        }
      }

      setActivePiece(null);
    }
  };

  let board = [];

  for (let j = VERTICAL_AXIS.length - 1; j >= 0; j--) {
    for (let i = 0; i < HORIZONTAL_AXIS.length; i++) {
      const number = j + i + 2;
      const piece = pieces.find((p) =>
        samePosition(p.position, { x: i, y: j })
      );

      let image = piece ? piece.image : undefined;
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
