import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface WelcomeAudioPlayerProps {
  className?: string;
}

export const WelcomeAudioPlayer: React.FC<WelcomeAudioPlayerProps> = ({ className = '' }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  // Initialize and attempt auto-play on enter
  useEffect(() => {
    const audio = new Audio('/assets/welcome-music.mp3');
    audio.loop = true;
    audio.volume = 0.10; // Exactly 10% volume (একদম হালকা সাউন্ড ১০%)
    audioRef.current = audio;

    const playAudio = () => {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Autoplay was blocked by browser policy without user gesture.
          // Wait for first user interaction (touch, click, scroll) anywhere.
          setIsPlaying(false);
        });
    };

    // Try immediate autoplay
    playAudio();

    // Browser interaction fallback: plays on first click/touch/scroll
    const handleFirstGesture = () => {
      if (!hasInteracted && audioRef.current) {
        audioRef.current.volume = 0.10;
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            setHasInteracted(true);
          })
          .catch(() => {});
      }
    };

    window.addEventListener('click', handleFirstGesture, { once: true });
    window.addEventListener('touchstart', handleFirstGesture, { once: true });
    window.addEventListener('scroll', handleFirstGesture, { once: true });
    window.addEventListener('keydown', handleFirstGesture, { once: true });

    return () => {
      audio.pause();
      audio.src = '';
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
      window.removeEventListener('scroll', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
    };
  }, []);

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.volume = 0.10;
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {});
    }
  }, [isPlaying]);

  return (
    <div className={`relative flex items-center ${className}`}>
      <button
        onClick={togglePlay}
        className="group relative flex items-center gap-1.5 p-1 sm:p-1.5 rounded-full bg-[#181613] hover:bg-[#221f1a] border border-[#cfa95f]/40 hover:border-[#cfa95f] transition-all duration-300 shadow-[0_2px_12px_rgba(0,0,0,0.5)] cursor-pointer select-none active:scale-95"
        title={isPlaying ? 'মিউজিক বন্ধ করতে ক্লিক করুন (১০% সাউন্ড)' : 'ওয়েলকাম মিউজিক চালু করুন'}
        aria-label={isPlaying ? 'Turn off welcome music' : 'Turn on welcome music'}
      >
        {/* Cute Animated Cartoon Character with Golden Headphones */}
        <div className="relative w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center shrink-0">
          {/* Subtle audio glow aura when active */}
          {isPlaying && (
            <span className="absolute inset-0 rounded-full bg-[#cfa95f]/25 animate-ping opacity-75 pointer-events-none" />
          )}

          <svg
            viewBox="0 0 64 64"
            className={`w-full h-full drop-shadow-[0_2px_8px_rgba(207,169,95,0.4)] transition-transform duration-300 ${
              isPlaying ? 'scale-105 animate-[bounce_1.4s_infinite]' : 'opacity-80 scale-95'
            }`}
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="goldHeadphones" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#fdf6e6" />
                <stop offset="50%" stopColor="#cfa95f" />
                <stop offset="100%" stopColor="#966d21" />
              </linearGradient>
              <linearGradient id="cuteFace" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fff3e0" />
                <stop offset="100%" stopColor="#ffe0b2" />
              </linearGradient>
            </defs>

            {/* Headphone Band */}
            <path
              d="M14 30 C 14 14, 50 14, 50 30"
              fill="none"
              stroke="url(#goldHeadphones)"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Cute Round Face */}
            <circle cx="32" cy="34" r="16" fill="url(#cuteFace)" stroke="#5d4037" strokeWidth="1.5" />

            {/* Cute Rosy Cheeks */}
            <circle cx="23" cy="37" r="2.8" fill="#ff8a80" opacity="0.8" />
            <circle cx="41" cy="37" r="2.8" fill="#ff8a80" opacity="0.8" />

            {/* Eyes */}
            {isPlaying ? (
              // Joyful Happy Curved Eyes (^ ^)
              <g stroke="#3e2723" strokeWidth="2.2" strokeLinecap="round" fill="none">
                <path d="M23 32 Q 26 28 29 32" />
                <path d="M35 32 Q 38 28 41 32" />
              </g>
            ) : (
              // Calm Sleepy Closed Eyes (- -)
              <g stroke="#5d4037" strokeWidth="2" strokeLinecap="round">
                <line x1="23" y1="32" x2="29" y2="32" />
                <line x1="35" y1="32" x2="41" y2="32" />
              </g>
            )}

            {/* Mouth */}
            {isPlaying ? (
              // Happy Open Singing Smile
              <path d="M29 38 Q 32 43 35 38" fill="#d32f2f" stroke="#3e2723" strokeWidth="1" />
            ) : (
              // Gentle Subtle Smile
              <path d="M30 38 Q 32 40 34 38" fill="none" stroke="#5d4037" strokeWidth="1.2" strokeLinecap="round" />
            )}

            {/* Mini Gem Crown on Head */}
            <polygon points="32,17 35,21 39,19 36,25 28,25 25,19 29,21" fill="url(#goldHeadphones)" />
            <circle cx="32" cy="22" r="1.5" fill="#fff" />

            {/* Golden Headphones Ear Cups */}
            <rect
              x="10"
              y="26"
              width="7"
              height="14"
              rx="3.5"
              fill="url(#goldHeadphones)"
              stroke="#2c2219"
              strokeWidth="1"
            />
            <rect
              x="47"
              y="26"
              width="7"
              height="14"
              rx="3.5"
              fill="url(#goldHeadphones)"
              stroke="#2c2219"
              strokeWidth="1"
            />
          </svg>
        </div>

        {/* Mini Sound Equalizer Bars (Live Dancing Wave) */}
        <div className="flex items-end gap-[2px] h-4 px-1" aria-hidden="true">
          <span
            className={`w-[2.5px] rounded-full bg-[#cfa95f] transition-all duration-200 ${
              isPlaying ? 'h-3.5 animate-[pulse_0.6s_infinite_ease-in-out]' : 'h-1 opacity-40'
            }`}
          />
          <span
            className={`w-[2.5px] rounded-full bg-[#e8d5a3] transition-all duration-200 ${
              isPlaying ? 'h-2 animate-[pulse_0.9s_infinite_ease-in-out_0.2s]' : 'h-1 opacity-40'
            }`}
          />
          <span
            className={`w-[2.5px] rounded-full bg-[#cfa95f] transition-all duration-200 ${
              isPlaying ? 'h-4 animate-[pulse_0.5s_infinite_ease-in-out_0.4s]' : 'h-1 opacity-40'
            }`}
          />
        </div>

        {/* Status text badge */}
        <span className="text-[10px] tracking-wider uppercase font-semibold text-[#cfa95f] pr-1.5 hidden lg:inline">
          {isPlaying ? '১০%' : 'OFF'}
        </span>
      </button>

      {/* Floating Tooltip Guide */}
      <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[9px] tracking-wider uppercase text-[#cfa95f]/80 bg-[#0b0a09]/95 px-2 py-0.5 rounded border border-[#cfa95f]/25 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md">
        {isPlaying ? 'ক্লিক করে মিউজিক অফ করুন' : 'মিউজিক প্লে করুন'}
      </span>
    </div>
  );
};
