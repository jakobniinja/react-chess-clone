import {
  Piece,
  PieceType,
  TeamType,
  Position,
  samePosition,
} from "./../Constants";

export default class Referee {
  tileIsEmptyOrOccupiedByOpp(
    position: Position,
    boarstate: Piece[],
    team: TeamType
  ) {
    return (
      !this.tileIsOccupied(position, boarstate) ||
      this.tileIsOccupiedByOpp(position, boarstate, team)
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

  isValidMove(
    initialPosition: Position,
    desiredPosition: Position,
    type: PieceType,
    team: TeamType,
    boardState: Piece[]
  ) {
    // MOVEMENT LOGIC
    if (type === PieceType.PAWN) {
      const specialRow = team === TeamType.OUR ? 1 : 6;
      const pawnDirection = team === TeamType.OUR ? 1 : -1;

      if (
        initialPosition.x === desiredPosition.x &&
        initialPosition.y === specialRow &&
        desiredPosition.y - initialPosition.y === 2 * pawnDirection
      ) {
        if (
          !this.tileIsOccupied(desiredPosition, boardState) &&
          !this.tileIsOccupied(
            { x: desiredPosition.x, y: desiredPosition.y - pawnDirection },
            boardState
          )
        ) {
          return true;
        }
      } else if (
        initialPosition.x === desiredPosition.x &&
        desiredPosition.y - initialPosition.y === pawnDirection
      ) {
        if (!this.tileIsOccupied(desiredPosition, boardState)) {
          return true;
        }
      }
      //ATTACK LOGIC
      else if (
        desiredPosition.x - initialPosition.x === -1 &&
        desiredPosition.y - initialPosition.y === pawnDirection
      ) {
        if (this.tileIsOccupiedByOpp(desiredPosition, boardState, team)) {
          return true;
        }
      } else if (
        desiredPosition.x - initialPosition.x === 1 &&
        desiredPosition.y - initialPosition.y === pawnDirection
      ) {
        if (this.tileIsOccupiedByOpp(desiredPosition, boardState, team)) {
          return true;
        }
      }
    } else if (type === PieceType.KNIGHT) {
      for (let i = -1; i < 2; i += 2) {
        for (let j = -1; j < 2; j += 2) {
          // TOP AND BOTTOM MOVEMENTS
          if (desiredPosition.y - initialPosition.y === 2 * i) {
            if (desiredPosition.x - initialPosition.x === j) {
              if (
                this.tileIsEmptyOrOccupiedByOpp(
                  desiredPosition,
                  boardState,
                  team
                )
              ) {
                return true;
              }
            }
          }
          // RIGHT AND LEFT MOVEMENTS
          if (desiredPosition.x - initialPosition.x === 2 * i) {
            if (desiredPosition.y - initialPosition.y === j) {
              if (
                this.tileIsEmptyOrOccupiedByOpp(
                  desiredPosition,
                  boardState,
                  team
                )
              ) {
                return true;
              }
            }
          }
        }
      }
    } else if (type === PieceType.BISHOP) {
      // MOVEMENT
      // UPPER RIGHT
      for (let i = 1; i < 8; i++) {
        if(desiredPosition.x - initialPosition.x === i && desiredPosition.y - initialPosition.y === i){
          console.log(`Moving ${i} squares`)
          break;
        }
      }
      // UPPER LEFT
      for (let i =0; i < 8; i++) {
        if (desiredPosition.x -initialPosition.x === -i && desiredPosition.y - initialPosition.y ===i) {
          console.log(`Moving ${i} squares`)
          break;
          
        }
      }

      // BOTTOM LEFT
      for (let i =0; i < 8; i++) {
        if (desiredPosition.x -initialPosition.x === -i && desiredPosition.y - initialPosition.y ===-i) {
          console.log(`Moving ${i} squares`)
          break;
          
        }
      }

      // BOTTOM RIGHT
      for (let i =0; i < 8; i++) {
        if (desiredPosition.x -initialPosition.x === i && desiredPosition.y - initialPosition.y ===-i) {
          console.log(`Moving ${i} squares`)
          break;
          
        }
      }
      return false;
    }
  }
}
