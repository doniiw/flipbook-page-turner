import { useRef, useCallback, useEffect } from "react";

// Base64 encoded page turn sound (short swoosh)
const PAGE_TURN_SOUND_BASE64 = "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbsGc0NWKy5d2vWjE3abTs26xPLjx8yPLpqlItRIvV9+SlRi5Ol+b/35BDMF6m7v/ZejQ4dLn2/8xmMkqI0Pr+vVU0XZri/v6sRzpwsOz9/ZU7Ro3N9f3/fDFfq+b8/eRkNXW79Pz82ko/lNT3/P3KPE+f4fv8+6Y2a7Du+vz7ij1Rm+P6+/tiRobI8/r7+z9dpeT5+/vqT2+17/n7+85Cj9P3+fv7pTt8xvL5+/t9R5bZ9vn7+1Rmrun4+fv7MnG58/j5+/sUlNz1+Pn7+wR/zPP4+fv7AGrA8fj5+/sAXrTv+Pn7+wBSqe34+fv7AEee7Pj5+/sAPJTq+Pn7+wAxiuj4+fv7ACeA5/j5+/sAHnbm+Pn7+wAWbOX4+fv7AA5i5Pj4+/sAB1nj+Pj7+wAAUOL4+Pv7AABI4fj4+/sAAEDg+Pj7+wAAON/4+Pv7AAAxn";

const usePageTurnSound = (enabled: boolean = true) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element on mount
    audioRef.current = new Audio(PAGE_TURN_SOUND_BASE64);
    audioRef.current.volume = 0.3;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const playPageTurn = useCallback(() => {
    if (!enabled || !audioRef.current) return;
    
    // Reset and play
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {
      // Ignore autoplay restrictions
    });
  }, [enabled]);

  return { playPageTurn };
};

export default usePageTurnSound;
