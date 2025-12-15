## Bot lv4V2 (Unstable)

Add : - Aggressive Matrix integration (static)
      - Reuses center-oriented scoring from lv3V25.  
      - Aggressive matrix is generated once and reused every turn.  
      - Encourages central positioning while keeping unpredictability.  
      - Combined with defensive and predictive scoring.  
      - Hybrid scoring system (Aggressive + Defensive + Prediction)  
      - Scores moves using available space (mobility).  
      - Adds defensive matrix value relative to enemy position.  
      - Adds aggressive matrix value to guide strategic positioning.  
      - Subtracts prediction penalty based on simulated future state.  
      - Chooses randomly among best-scoring moves.  
      
Fix : - Previous lv4V2 did not leverage aggressive positioning data.  
      - Bot could become overly defensive or edge-biased.  
      - Restores strategic center control without removing prediction logic.  
      - Avoids recomputing aggressive matrix every round.  
      
Note : - AggressiveMatrix is static (generated once).  
       - DefensiveMatrix is dynamic (recomputed each turn).  
       - Prediction done via maxDepth.  
       - Fallback behavior remains unchanged if no safe moves.  
       - Optimizations are still required to beat lv3V25
