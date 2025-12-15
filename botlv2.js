class molesterBotlv2 {
  constructor(name, linkedBike) {
    this.name = name;
    this.linkedBike = linkedBike;
  }

  getMove(arena) {
    const moves = arena.getLegalMoves(
      this.linkedBike.x,
      this.linkedBike.y,
      false
    );
    const safe = moves.filter((m) => m.collision === false);

    const options = (safe.length ? safe : moves).map((m) => ({
      ...m,
      score: safe.length ? arena.getAvailableTilesNumber(m.xMove, m.yMove) : 0,
    }));

    const max = Math.max(...options.map((m) => m.score));
    const best = options.filter((m) => m.score === max);
    const chosen = best[Math.floor(Math.random() * best.length)];

    return [chosen.xMove, chosen.yMove];
  }
}
