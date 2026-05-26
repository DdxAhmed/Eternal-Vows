import React, { createContext, useContext, useState, useEffect, useRef } from "react";

interface AudioContextType {
  isPlaying: boolean;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  hasStarted: boolean;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const playerRef = useRef<any>(null);
  const isPlayingRef = useRef(false);
  const iframeId = "youtube-bg-player";

  // Keep a ref of isPlaying to use inside callback closures
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let isMounted = true;

    const initPlayer = () => {
      if (!isMounted) return;

      let container = document.getElementById(iframeId);
      if (!container) {
        container = document.createElement("div");
        container.id = iframeId;
        container.style.position = "absolute";
        container.style.width = "0";
        container.style.height = "0";
        container.style.pointerEvents = "none";
        container.style.opacity = "0";
        container.style.left = "-9999px";
        container.style.top = "-9999px";
        document.body.appendChild(container);
      }

      try {
        playerRef.current = new (window as any).YT.Player(iframeId, {
          height: "0",
          width: "0",
          videoId: "GMihmMfeazY",
          playerVars: {
            start: 31,
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
            iv_load_policy: 3,
          },
          events: {
            onReady: (event: any) => {
              console.log("YouTube Player is ready");
              if (isPlayingRef.current) {
                event.target.playVideo();
              }
            },
            onStateChange: (event: any) => {
              // YT.PlayerState.PLAYING = 1, PAUSED = 2
              if (event.data === 1) {
                setIsPlaying(true);
              } else if (event.data === 2) {
                setIsPlaying(false);
              }
            },
          },
        });
      } catch (err) {
        console.error("Failed to initialize YT.Player", err);
      }
    };

    if (!(window as any).YT || !(window as any).YT.Player) {
      // Make sure we don't append script multiple times
      if (!document.getElementById("youtube-iframe-api")) {
        const tag = document.createElement("script");
        tag.id = "youtube-iframe-api";
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      }

      // Chain onto existing onYouTubeIframeAPIReady if it exists
      const previousAPIReady = (window as any).onYouTubeIframeAPIReady;
      (window as any).onYouTubeIframeAPIReady = () => {
        if (previousAPIReady) previousAPIReady();
        initPlayer();
      };
    } else {
      initPlayer();
    }

    return () => {
      isMounted = false;
      if (playerRef.current && typeof playerRef.current.destroy === "function") {
        try {
          playerRef.current.destroy();
        } catch (e) {
          console.error("Error destroying YT Player", e);
        }
      }
    };
  }, []);

  const play = () => {
    setHasStarted(true);
    setIsPlaying(true);
    if (playerRef.current && typeof playerRef.current.playVideo === "function") {
      try {
        playerRef.current.playVideo();
      } catch (e) {
        console.error("Failed to call playVideo", e);
      }
    }
  };

  const pause = () => {
    setIsPlaying(false);
    if (playerRef.current && typeof playerRef.current.pauseVideo === "function") {
      try {
        playerRef.current.pauseVideo();
      } catch (e) {
        console.error("Failed to call pauseVideo", e);
      }
    }
  };

  const toggle = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  return (
    <AudioContext.Provider value={{ isPlaying, play, pause, toggle, hasStarted }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};
