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
    boardstate: Piece[],
    team: TeamType
  ) {
    return (
      !this.tileIsOccupied(position, boardstate) ||
      this.tileIsOccupiedByOpp(position, boardstate, team)
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

  pawnMove(
    initialPosition: Position,
    desiredPosition: Position,
    team: TeamType,
    boardState: Piece[]
  ): boolean {
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
    return false;
  }
  knightMove(
    initialPosition: Position,
    desiredPosition: Position,
    team: TeamType,
    boardState: Piece[]
  ): boolean {
    for (let i = -1; i < 2; i += 2) {
      for (let j = -1; j < 2; j += 2) {
        // TOP AND BOTTOM MOVEMENTS
        if (desiredPosition.y - initialPosition.y === 2 * i) {
          if (desiredPosition.x - initialPosition.x === j) {
            if (
              this.tileIsEmptyOrOccupiedByOpp(desiredPosition, boardState, team)
            ) {
              return true;
            }
          }
        }
        // RIGHT AND LEFT MOVEMENTS
        if (desiredPosition.x - initialPosition.x === 2 * i) {
          if (desiredPosition.y - initialPosition.y === j) {
            if (
              this.tileIsEmptyOrOccupiedByOpp(desiredPosition, boardState, team)
            ) {
              return true;
            }
          }
        }
      }
    }

    return false;
  }

  bishopMove(
    initialPosition: Position,
    desiredPosition: Position,
    team: TeamType,
    boardState: Piece[]
  ): boolean {
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
          if (
            this.tileIsEmptyOrOccupiedByOpp(passedPosition, boardState, team)
          ) {
            return true;
          }
        } else {
          // dealing with passing tile
          if (this.tileIsOccupied(passedPosition, boardState)) {
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
          if (
            this.tileIsEmptyOrOccupiedByOpp(passedPosition, boardState, team)
          ) {
            return true;
          }
        } else {
          if (this.tileIsOccupied(passedPosition, boardState)) {
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
          if (
            this.tileIsEmptyOrOccupiedByOpp(passedPosition, boardState, team)
          ) {
            return true;
          }
        } else {
          // dealing with destination tile
          if (this.tileIsOccupied(passedPosition, boardState)) {
            break;
          }
        }
      }

      // BOTTOM RIGHT
      if (
        desiredPosition.x > initialPosition.x &&
        desiredPosition.y < initialPosition.y
      ) {
        let passedPosition: Position = {
          x: initialPosition.x + i,
          y: initialPosition.y - i,
        };
        // check if the tile is the destination tile
        if (samePosition(passedPosition, desiredPosition)) {
          // dealing with destination tile
          if (
            this.tileIsEmptyOrOccupiedByOpp(passedPosition, boardState, team)
          ) {
            return true;
          }
        } else {
          // dealing with destination tile
          if (this.tileIsOccupied(passedPosition, boardState)) {
            break;
          }
        }
      }
    }

    return false;
  }
  rookMove(
    initialPosition: Position,
    desiredPosition: Position,
    team: TeamType,
    boardState: Piece[]
  ): boolean {
    if (initialPosition.x === desiredPosition.x) {
      for (let i = 1; i < 8; i++) {
        let multiplier = desiredPosition.y < initialPosition.y ? -1 : 1;
        let passedPosition: Position = {
          x: initialPosition.x,
          y: initialPosition.y + i * multiplier,
        };
        if (samePosition(passedPosition, desiredPosition)) {
          if (
            this.tileIsEmptyOrOccupiedByOpp(passedPosition, boardState, team)
          ) {
            return true;
          }
        } else {
          if (this.tileIsOccupied(passedPosition, boardState)) {
            break;
          }
        }
      }
    }

    if (initialPosition.y === desiredPosition.y) {
      for (let i = 1; i < 8; i++) {
        let multiplier = desiredPosition.x < initialPosition.x ? -1 : 1;
        let passedPosition: Position = {
          x: initialPosition.x + multiplier * i,
          y: initialPosition.y,
        };

        if (samePosition(passedPosition, desiredPosition)) {
          if (
            this.tileIsEmptyOrOccupiedByOpp(passedPosition, boardState, team)
          ) {
            return true;
          }
        } else {
          if (this.tileIsOccupied(passedPosition, boardState)) {
            break;
          }
        }
      }
    }
    return false;
  }
  queenMove(
    initialPosition: Position,
    desiredPosition: Position,
    team: TeamType,
    boardState: Piece[]
  ): boolean {
    for (let i = 1; i < 8; i++) {
      // vertical
      if (desiredPosition.x === initialPosition.x) {
        let multiplier = desiredPosition.y < initialPosition.y ? -1 : 1;
        let passedPosition: Position = {
          x: initialPosition.x,
          y: initialPosition.y + i * multiplier,
        };
        if (samePosition(passedPosition, desiredPosition)) {
          if (
            this.tileIsEmptyOrOccupiedByOpp(passedPosition, boardState, team)
          ) {
            return true;
          }
        } else {
          if (this.tileIsOccupied(passedPosition, boardState)) {
            break;
          }
        }
      }

      // horizontal
      if (desiredPosition.y === initialPosition.y) {
        let multiplier = desiredPosition.x < initialPosition.x ? -1 : 1;
        let passedPosition: Position = {
          x: initialPosition.x + i * multiplier,
          y: initialPosition.y,
        };
        if (samePosition(passedPosition, desiredPosition)) {
          if (
            this.tileIsEmptyOrOccupiedByOpp(passedPosition, boardState, team)
          ) {
            return true;
          }
        } else {
          if (this.tileIsOccupied(passedPosition, boardState)) {
            break;
          }
        }
      }

      // top-right
      if (
        desiredPosition.x > initialPosition.x &&
        desiredPosition.y > initialPosition.y
      ) {
        console.log("top-right");
      }

      // bottom-right
      if (
        desiredPosition.x > initialPosition.x &&
        desiredPosition.y < initialPosition.y
      ) {
        console.log("bottom-right");
      }

      // bottom-left
      if (
        desiredPosition.x < initialPosition.x &&
        desiredPosition.y < initialPosition.y
      ) {
        console.log("bottom-left");
      }

      // top-left

      if (
        desiredPosition.x < initialPosition.x &&
        desiredPosition.y > initialPosition.y
      ) {
        console.log("top-left");
      }
    }
    return false;
  }

  kingMove(
    initialPosition: Position,
    desiredPosition: Position,
    team: TeamType,
    boardState: Piece[]
  ): boolean {
    return false;
  }

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
        validMove = this.pawnMove(
          initialPosition,
          desiredPosition,
          team,
          boardState
        );

        break;
      case PieceType.KNIGHT:
        validMove = this.knightMove(
          initialPosition,
          desiredPosition,
          team,
          boardState
        );
        break;

      case PieceType.BISHOP:
        validMove = this.bishopMove(
          initialPosition,
          desiredPosition,
          team,
          boardState
        );
        break;

      case PieceType.ROOK:
        validMove = this.rookMove(
          initialPosition,
          desiredPosition,
          team,
          boardState
        );
        break;

      case PieceType.QUEEN:
        validMove = this.queenMove(
          initialPosition,
          desiredPosition,
          team,
          boardState
        );

        break;
      case PieceType.KING:
        console.log("king");

        validMove = this.kingMove(
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
