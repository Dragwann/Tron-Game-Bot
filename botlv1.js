class molesterBotlv1 {
  constructor(name, linkedBike) {
    this.name = name;
    this.linkedBike = linkedBike;
  }

  getMove(arena) {
    let moves = arena.getLegalMoves(
      this.linkedBike.x,
      this.linkedBike.y,
      false
    );

    let safeMoves = moves.filter(
      (m) =>
        m.collision === false &&
        m.xMove >= 0 &&
        m.xMove < arena.gridSize &&
        m.yMove >= 0 &&
        m.yMove < arena.gridSize
    );

    let chosenMove;
    if (safeMoves.length > 0) {
      let randomIndex = Math.floor(Math.random() * safeMoves.length);
      chosenMove = safeMoves[randomIndex];
    } else {
      let randomIndex = Math.floor(Math.random() * moves.length);
      chosenMove = moves[randomIndex];
    }

    return [chosenMove.xMove, chosenMove.yMove];
  }
}
