import { tileIsEmptyOrOccupiedByOpp } from './KnightRules';
import { Piece, Position, samePosition, TeamType } from "../../Constants";
import { tileIsOccupied } from './GeneralRules';

export const   queenMove = (
    initialPosition: Position,
    desiredPosition: Position,
    team: TeamType,
    boardState: Piece[]
  ): boolean  => {
    for (let i = 1; i < 8; i++) {
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
      if (samePosition(passedPosition, desiredPosition)) {

        if (tileIsEmptyOrOccupiedByOpp(passedPosition, boardState, team)) {
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
