import {
  Piece,
  PieceType, Position,
  samePosition, TeamType
} from "./../Constants";
import { bishopMove } from './rules/BishopRules';
import { tileIsOccupied, tileIsOccupiedByOpp } from './rules/GeneralRules';
import { kingMove, knightMove, pawnMove, queenMove, rookMove } from './rules';

export default class Referee {
  tileIsEmptyOrOccupiedByOpp(
    position: Position,
    boardstate: Piece[],
    team: TeamType
  ) {
    return (
      !tileIsOccupied(position, boardstate) ||
      tileIsOccupiedByOpp(position, boardstate, team)
    );
  }
  tileIsOccupied(position: Position, boardState: Piece[]) {
    const piece = boardState.find((p) => samePosition(p.position, position));

    if (piece) {
      return true;
    } else {
      return false;
    }
  }

  tileIsOccupiedByOpp(
    position: Position,
    boardState: Piece[],
    team: TeamType
  ): boolean {
    const piece = boardState.find(
      (p) => samePosition(p.position, position) && p.team !== team
    );
    if (piece) {
      return true;
    } else {
      return false;
    }
  }

  isAppasentMove = (
    initialPosition: Position,
    desiredPosition: Position,

    type: PieceType,
    team: TeamType,
    boardState: Piece[]
  ) => {
    const pawnDirection = team === TeamType.OUR ? 1 : -1;
    if (type === PieceType.PAWN) {
      if (
        (desiredPosition.x - initialPosition.x === -1 ||
          desiredPosition.x - initialPosition.x === 1) &&
        desiredPosition.y - initialPosition.y === pawnDirection
      ) {
        const piece = boardState.find(
          (p) =>
            p.position.x === desiredPosition.x &&
            p.position.y === desiredPosition.y - pawnDirection &&
            p.enPassent
        );
        if (piece) {
          return true;
        }
      }
    }

    return false;
  };

  

  
  

  

  // TODO 
  // PAWN PROMOTION
  // prevent the king moving into danger
  // add castling
  // stalemate
  // check 
  // checkmate 

  isValidMove(
    initialPosition: Position,
    desiredPosition: Position,
    type: PieceType,
    team: TeamType,
    boardState: Piece[]
  ) {
    // MOVEMENT LOGIC
    let validMove = false;
    switch (type) {
      case PieceType.PAWN:
        validMove = pawnMove(
          initialPosition,
          desiredPosition,
          team,
          boardState
        );

        break;
      case PieceType.KNIGHT:
        validMove = knightMove(
          initialPosition,
          desiredPosition,
          team,
          boardState
        );
        break;

      case PieceType.BISHOP:
        validMove = bishopMove(
          initialPosition,
          desiredPosition,
          team,
          boardState
        );
        break;

      case PieceType.ROOK:
        validMove = rookMove(
          initialPosition,
          desiredPosition,
          team,
          boardState
        );
        break;

      case PieceType.QUEEN:
        validMove = queenMove(
          initialPosition,
          desiredPosition,
          team,
          boardState
        );

        break;
      case PieceType.KING:
        validMove = kingMove(
          initialPosition,
          desiredPosition,
          team,
          boardState
        );

        break;
      default:
        console.log("unknown");
        break;
    }
    return validMove;
  }
}
