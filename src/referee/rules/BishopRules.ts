import { Piece, Position, samePosition, TeamType } from "../../Constants";
import { tileIsOccupied } from "./GeneralRules";
import { tileIsEmptyOrOccupiedByOpp } from "./KnightRules";

export const bishopMove = (
  initialPosition: Position,
  desiredPosition: Position,
  team: TeamType,
  boardState: Piece[]
): boolean => {
  for (let i = 1; i < 8; i++) {
    if (
      desiredPosition.x > initialPosition.x &&
      desiredPosition.y > initialPosition.y
    ) {
      let passedPosition: Position = {
        x: initialPosition.x + i,
        y: initialPosition.y + i,
      };
      // check if the tile is the destination tile
      if (samePosition(passedPosition, desiredPosition)) {
        // dealing with destination tile
        if (tileIsEmptyOrOccupiedByOpp(passedPosition, boardState, team)) {
          return true;
        }
      } else {
        // dealing with passing tile
        if (tileIsOccupied(passedPosition, boardState)) {
          break;
        }
      }
    }

    // UPPER LEFT
    if (
      desiredPosition.x < initialPosition.x &&
      desiredPosition.y > initialPosition.y
    ) {
      let passedPosition: Position = {
        x: initialPosition.x - i,
        y: initialPosition.y + i,
      };
      // check if the tile is the destination tile
      if (samePosition(passedPosition, desiredPosition)) {
        // dealing with the destination tile
        if (tileIsEmptyOrOccupiedByOpp(passedPosition, boardState, team)) {
          return true;
        }
      } else {
        if (tileIsOccupied(passedPosition, boardState)) {
          break;
        }
      }
    }
    // BOTTOM LEFT
    if (
      desiredPosition.x < initialPosition.x &&
      desiredPosition.y < initialPosition.y
    ) {
      let passedPosition: Position = {
        x: initialPosition.x - i,
        y: initialPosition.y - i,
      };

      // check if the tile is the destination tile
      if (samePosition(passedPosition, desiredPosition)) {
        // dealing with destination tile
        if (tileIsEmptyOrOccupiedByOpp(passedPosition, boardState, team)) {
          return true;
        }
      } else {
        // dealing with destination tile
        if (tileIsOccupied(passedPosition, boardState)) {
          break;
        }
      }
    }
  }

  return false;
};
