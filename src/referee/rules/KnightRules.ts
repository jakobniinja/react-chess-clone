import { Piece, Position, TeamType } from "../../Constants";
import { tileIsOccupied, tileIsOccupiedByOpp } from "./GeneralRules";

export const tileIsEmptyOrOccupiedByOpp = (
  position: Position,
  boardstate: Piece[],
  team: TeamType
) => {
  return (
    !tileIsOccupied(position, boardstate) ||
    tileIsOccupiedByOpp(position, boardstate, team)
  );
};
export const knightMove = (
  initialPosition: Position,
  desiredPosition: Position,
  team: TeamType,
  boardState: Piece[]
): boolean => {
  for (let i = -1; i < 2; i += 2) {
    for (let j = -1; j < 2; j += 2) {
      // TOP AND BOTTOM MOVEMENTS
      if (desiredPosition.y - initialPosition.y === 2 * i) {
        if (desiredPosition.x - initialPosition.x === j) {
          if (tileIsEmptyOrOccupiedByOpp(desiredPosition, boardState, team)) {
            return true;
          }
        }
      }
      // RIGHT AND LEFT MOVEMENTS
      if (desiredPosition.x - initialPosition.x === 2 * i) {
        if (desiredPosition.y - initialPosition.y === j) {
          if (tileIsEmptyOrOccupiedByOpp(desiredPosition, boardState, team)) {
            return true;
          }
        }
      }
    }
  }

  return false;
};
