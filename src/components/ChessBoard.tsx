import styles from "./index.module.css";
import React from "react";
import { setDefaultResultOrder } from "dns";

const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

function ChessBoard() {
  let board = [];
  for (let j = verticalAxis.length - 1; j >= 0; j--) {
    for (let i = 0; i < horizontalAxis.length; i++) {
      board.push(
        <span>
          <div className="tile blackTile">
            [{horizontalAxis[i]}
            {verticalAxis[j]}]
          </div>
        </span>
      );
    }
  }
  return <div className={styles.chessboard}>{board}</div>;
}

export default ChessBoard;
