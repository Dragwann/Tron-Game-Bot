class molesterBotlv4D2 {
  constructor(name, linkedBike) {
    this.name = name;
    this.linkedBike = linkedBike;
    this.aggMatrix = null;
    this.maxDepth = 2;
  }

  createAggressiveMatrix(gridSize) {
    const matrix = [];
    for (let x = 0; x < gridSize; x++) {
      matrix[x] = [];
      for (let y = 0; y < gridSize; y++) {
        const d = Math.abs(x - gridSize / 2) + Math.abs(y - gridSize / 2);
        matrix[x][y] = gridSize - d;
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
        const de = Math.abs(x - enemy.x) + Math.abs(y - enemy.y);
        const ds = Math.abs(x - self.x) + Math.abs(y - self.y);
        matrix[x][y] = Math.max(0, size - de - ds / 2);
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
    const defMatrix = this.createDefensiveMatrix(arena, self, enemy);

    const moves = arena
      .getLegalMoves(self.x, self.y, true)
      .filter((m) => !m.collision);

    if (moves.length === 0) {
      return [self.x + 1, self.y];
    }

    let bestScore = -Infinity;
    let bestMoves = [];

    for (const m of moves) {
      const score = this.evaluateMove(
        arena,
        self,
        enemy,
        defMatrix,
        m.xMove,
        m.yMove,
        1
      );

      if (score > bestScore) {
        bestScore = score;
        bestMoves = [m];
      } else if (score === bestScore) {
        bestMoves.push(m);
      }
    }

    const chosen = bestMoves[Math.floor(Math.random() * bestMoves.length)];
    return [chosen.xMove, chosen.yMove];
  }

  evaluateMove(arena, self, enemy, defMatrix, x, y, depth) {
    const baseScore =
      arena.getAvailableTilesNumber(x, y) +
      defMatrix[x][y] * 0.7 +
      this.aggMatrix[x][y] * 0.3;

    if (depth >= this.maxDepth) {
      return baseScore;
    }

    let cloneArena = structuredClone(arena);
    let cloneSelf = structuredClone(self);

    cloneArena = Object.setPrototypeOf(cloneArena, Arena.prototype);
    cloneSelf = Object.setPrototypeOf(cloneSelf, Bike.prototype);

    cloneSelf.x = x;
    cloneSelf.y = y;

    const enemyMoves = cloneArena
      .getLegalMoves(enemy.x, enemy.y, true)
      .filter((m) => !m.collision);

    if (enemyMoves.length === 0) {
      return baseScore + 1000;
    }

    let worstEnemyResponse = Infinity;

    for (const em of enemyMoves) {
      const responseScore = cloneArena.getAvailableTilesNumber(
        em.xMove,
        em.yMove
      );

      if (responseScore < worstEnemyResponse) {
        worstEnemyResponse = responseScore;
      }
    }

    return baseScore - worstEnemyResponse;
  }
}
