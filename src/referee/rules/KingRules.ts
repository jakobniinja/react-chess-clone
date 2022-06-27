import { tileIsOccupied } from './GeneralRules';
import { tileIsEmptyOrOccupiedByOpp } from './KnightRules';
import { Piece, Position, samePosition, TeamType } from "../../Constants";

export const kingMove = (
    initialPosition: Position,
    desiredPosition: Position,
    team: TeamType,
    boardState: Piece[]
  ): boolean  => {
    for (let i = 1; i < 2; i++) {
      // diagonal
      let multiplierx= ( desiredPosition.x  < initialPosition.x ) ? -1 :(desiredPosition.x > initialPosition.x)? 1 : 0
      let multipliery = ( desiredPosition.y  < initialPosition.y ) ? -1 :(desiredPosition.y > initialPosition.y)? 1 : 0;

      let passedPosition: Position = {
        x: initialPosition.x + i * multiplierx,
        y: initialPosition.y + i * multipliery,
      };

      // i * -1 - left

      // i * 1 - right

      // i * 0 - middle

      if (tileIsEmptyOrOccupiedByOpp(passedPosition, boardState, team)) {
      if (samePosition(passedPosition, desiredPosition)) {
          return true;
        }
      } else {
        if (tileIsOccupied(passedPosition, boardState)) {
          break;
        }
      }
    }
    return false;
  }
