class molesterBotlv3V25 {
  constructor(name, linkedBike) {
    this.name = name;
    this.linkedBike = linkedBike;

    this.aggMatrix = null;
    this.defMatrix = [];
  }

  createAggressiveMatrix(gridSize) {
    const matrix = [];

    for (let x = 0; x < gridSize; x++) {
      matrix[x] = [];
      for (let y = 0; y < gridSize; y++) {
        const distFromCenter =
          Math.abs(x - gridSize / 2) + Math.abs(y - gridSize / 2);

        matrix[x][y] = gridSize - distFromCenter;
      }
    }
    return matrix;
  }

  createDefensiveMatrix(arena, self, enemy) {
    const size = arena.gridSize;
    const matrix = [];

    for (let x = 0; x < size; x++) {
      matrix[x] = [];
      for (let y = 0; y < size; y++) {
        const distToEnemy = Math.abs(x - enemy.x) + Math.abs(y - enemy.y);
        const distToSelf = Math.abs(x - self.x) + Math.abs(y - self.y);

        matrix[x][y] = Math.max(0, size - distToEnemy - distToSelf / 2);
      }
    }
    return matrix;
  }

  getMove(arena, game) {
    if (!this.aggMatrix) {
      this.aggMatrix = this.createAggressiveMatrix(arena.gridSize);
    }

    const self = this.linkedBike;
    const enemy = game.getOtherPlayer().linkedBike;

    this.defMatrix = this.createDefensiveMatrix(arena, self, enemy);

    const moves = arena.getLegalMoves(self.x, self.y, true);
    const safeMoves = moves.filter((m) => !m.collision);

    if (safeMoves.length === 0) {
      return [self.x + 1, self.y];
    }

    const options = safeMoves.map((m) => {
      const x = m.xMove;
      const y = m.yMove;

      return {
        ...m,
        score:
          arena.getAvailableTilesNumber(x, y) +
          this.defMatrix[x][y] * 0.7 +
          this.aggMatrix[x][y] * 0.3,
      };
    });

    const maxScore = Math.max(...options.map((m) => m.score));
    const bestMoves = options.filter((m) => m.score === maxScore);
    const chosen = bestMoves[Math.floor(Math.random() * bestMoves.length)];

    return [chosen.xMove, chosen.yMove];
  }
}
