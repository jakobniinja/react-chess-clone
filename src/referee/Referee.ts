import { Piece, PieceType, TeamType, Position } from "./../Constants";

export default class Referee {
  tileIsOccupied(x: number, y: number, boardState: Piece[]) {
    const piece = boardState.find(
      (p) => p.position.x === x && p.position.y === y
    );

    if (piece) {
      return true;
    } else {
      return false;
    }
  }

  tileIsOccupiedByOpp(
    x: number,
    y: number,
    boardState: Piece[],
    team: TeamType
  ): boolean {
    const piece = boardState.find(
      (p) => p.position.x === x && p.position.y === y && p.team !== team
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
          !this.tileIsOccupied(
            desiredPosition.x,
            desiredPosition.y,
            boardState
          ) &&
          !this.tileIsOccupied(
            desiredPosition.x,
            desiredPosition.y - pawnDirection,
            boardState
          )
        ) {
          return true;
        }
      } else if (
        initialPosition.x === desiredPosition.x &&
        desiredPosition.y - initialPosition.y === pawnDirection
      ) {
        if (
          !this.tileIsOccupied(desiredPosition.x, desiredPosition.y, boardState)
        ) {
          return true;
        }
      }
      //ATTACK LOGIC
      else if (
        desiredPosition.x - initialPosition.x === -1 &&
        desiredPosition.y - initialPosition.y === pawnDirection
      ) {
        if (
          this.tileIsOccupiedByOpp(
            desiredPosition.x,
            desiredPosition.y,
            boardState,
            team
          )
        ) {
          return true;
        }
      } else if (
        desiredPosition.x - initialPosition.x === 1 &&
        desiredPosition.y - initialPosition.y === pawnDirection
      ) {
        if (
          this.tileIsOccupiedByOpp(
            desiredPosition.x,
            desiredPosition.y,
            boardState,
            team
          )
        ) {
          return true;
        }
      }
    } else if (type === PieceType.KNIGHT) {
      // console.log("knight");
      // MOVING LOGIC FOR KNIGHT
      // 8 DIFFERENT MOVING PATTERNS

      // TOP LINE
      if (desiredPosition.y - initialPosition.y === 2) {
        if (desiredPosition.x - initialPosition.x === -1) {
          console.log("top-left ");
        } else if (desiredPosition.x - initialPosition.x === 1) {
          console.log("top-right ");
        }
      }
      // BOTTOM LINE
      if (desiredPosition.y - initialPosition.y === -2) {
        if (desiredPosition.x - initialPosition.x === -1) {
          console.log("bottom-left ");
        } else if (desiredPosition.x - initialPosition.x === 1) {
          console.log("bottom-right ");
        }
      }

      // MIDDLE TOP
      if (desiredPosition.y - initialPosition.y === 1) {
        if (desiredPosition.x - initialPosition.x === 2) {
          console.log("middle-top right");
        }
        if (desiredPosition.x - initialPosition.x === -2) {
          console.log("middle-top left");
        }
      }

      // MIDDLE BOTTOM
      if (desiredPosition.y - initialPosition.y === -1) {
        if (desiredPosition.x - initialPosition.x === 2) {
          console.log("middle-bottom right");
        }
        if (desiredPosition.x - initialPosition.x === -2) {
          console.log("middle-bottom  left");
        }
      }
    }
    return false;
  }
}
