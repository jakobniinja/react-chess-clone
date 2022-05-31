import { useEffect, useRef, useState } from "react";
import Tile from "../Tile/Tile";
import "./Chessboard.css";

export default function Chessboard() {
  const [gridX, setGridX] = useState(0);
  const [gridY, setGridY] = useState(0);

  const chessboardRef = useRef<HTMLDivElement>(null);
  const initialBoardState: Piece[] = [];
  const [pieces, setPieces] = useState<Piece[]>(initialBoardState);

  const HORIZONTAL_AXIS = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const VERTICAL_AXIS = ["1", "2", "3", "4", "5", "6", "7", "8"];

  interface Piece {
    image: string;
    x: number;
    y: number;
  }
    for (let p = 0; p < 2; p++) {
      const type = p === 0 ? "b" : "w";
      const y = p === 0 ? 7 : 0;

      initialBoardState.push({ image: `./assets/images/rook_${type}.png`, x: 0, y });
      initialBoardState.push({ image: `./assets/images/rook_${type}.png`, x: 7, y });
      initialBoardState.push({ image: `./assets/images/knight_${type}.png`, x: 1, y });
      initialBoardState.push({ image: `./assets/images/knight_${type}.png`, x: 6, y });
      initialBoardState.push({ image: `./assets/images/bishop_${type}.png`, x: 2, y });
      initialBoardState.push({ image: `./assets/images/bishop_${type}.png`, x: 5, y });
      initialBoardState.push({ image: `./assets/images/king_${type}.png`, x: 4, y });
      initialBoardState.push({ image: `./assets/images/queen_${type}.png`, x: 3, y });
    }

    for (let i = 0; i < 8; i++) {
      pieces.push({ image: "./assets/images/pawn_b.png", x: i, y: 6 });
    }

    for (let i = 0; i < 8; i++) {
      pieces.push({ image: "./assets/images/pawn_w.png", x: i, y: 1 });
    }


  // const pieces: Piece[] = [];

  let activePiece: HTMLElement | null = null;

  const grabPiece = (e: React.MouseEvent) => {
    const chessboard = chessboardRef.current;
    const el = e.target as HTMLElement;
    if (el.classList.contains("chess-piece") && chessboard) {
      const gridX = Math.floor((e.clientX - chessboard.offsetLeft) / 100);
      const gridY = Math.abs(
        Math.ceil(e.clientY - chessboard.offsetTop - 800) / 100
      );

      setGridX(gridX);
      setGridY(gridY);



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

    const chessboard = chessboardRef.current;
    if (activePiece && chessboard) {
      console.log(el);

      const minX = chessboard.offsetLeft - 25;
      const minY = chessboard.offsetTop - 25;
      const maxX = chessboard.offsetLeft + chessboard.clientWidth - 75;
      const maxY = chessboard.offsetTop + chessboard.clientHeight - 75;
      const x = e.clientX - 50;
      const y = e.clientY - 50;
      setGridX(x);
      setGridY(y)
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
      const x = Math.floor((e.clientX - chessboard.offsetLeft) / 100);
      const y =Math.floor((e.clientY -chessboard.offsetTop) / 100);
      console.log(x,y)

      setPieces(value => {
        const pieces =value.map(p => {
          if(p.x===1 && p.y ===0){
            p.x =x;
            p.y =y;
          }
          return p;
        })
        return pieces ;
      })
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
      ref={chessboardRef}
    >
      {board}
    </div>
  );
}
