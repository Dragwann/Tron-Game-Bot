## Molester lv3V1  
Add : - Aggressive Matrix  
      - Aggressive behavior: favors center of the arena.  
      - Scores moves by combining mobility (available tiles) and centrality (matrix).  
      - Chooses randomly among top-scoring moves for unpredictability.  
      - Fallback: move right if no safe moves.  
Cons : Generate Matrix each rounds.  
 
## Molester lv3V2  
Add : - Defensive Matrix  
      - Defensive behavior: favors positions away from enemy while maintaining mobility.  
      - Scores moves by combining mobility (available tiles) and defensive matrix.  
      - Chooses randomly among top-scoring moves in both matrix for unpredictability.  
      - Fallback: move right if no safe moves.  
Fix : - Previous version (lv3V1) always generated an aggressive matrix each round, ignoring enemy position.  
      - lv3V1 favored center too aggressively, making it predictable against enemies.  
      - Now considers both self and enemy positions for smarter move scoring.  
      - Matrix are now generated at with Bot generation.  
      - "AggressiveMatrix" is static // "DefensiveMatrix" is dynamic  

## Molester lv3V25 BEST VERSION OF THE BOT
Add : Predicition Depth 1  
Fix : - Aggressive matrix was not called  
