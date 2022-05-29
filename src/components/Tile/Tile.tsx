import "./Tile.css";
import React from "react";

interface Props {
  number: number;
  image: string | undefined;
}
function Tile({ number, image }: Props) {
  if (number % 2 === 0) {
    return (
      <div className="tile black-tile">
        <img src={image} />
        {/* [{HORIZONTAL_AXIS[i]} {VERTICAL_AXIS[j]}] */}
      </div>
    );
  } else {
    return (
      <div className="tile white-tile">
        <img src={image} />
        {/* [{HORIZONTAL_AXIS[i]} {VERTICAL_AXIS[j]}] */}
      </div>
    );
  }
}
export default Tile;
