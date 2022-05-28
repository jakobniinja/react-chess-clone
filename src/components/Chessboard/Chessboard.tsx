import "./Chessboard.css";

export default function Chessboard() {
  const HORIZONTAL_AXIS = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const VERTICAL_AXIS = ["1", "2", "3", "4", "5", "6", "7", "8"];

  let board = [];

  for (let i = VERTICAL_AXIS.length-1; i >= 0; i--) {
    for (let j = 0; j < HORIZONTAL_AXIS.length; j++) {
      const number = j + i + 2;
      if (number % 2 === 0) {
        board.push(
          <div className="tile black-tile">
            {/* [{HORIZONTAL_AXIS[i]} {VERTICAL_AXIS[j]}] */}
          </div>
        );
      } else {
        board.push(
          <div className="tile white-tile">
            {/* [{HORIZONTAL_AXIS[i]} {VERTICAL_AXIS[j]}] */}
          </div>
        );
      }
    }
  }
  return <div id="chessboard">{board}</div>;
}
