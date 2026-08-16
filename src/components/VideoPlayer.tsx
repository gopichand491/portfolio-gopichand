import { useState, useRef } from 'react';
import { Play, VolumeX, Volume2, Maximize } from 'lucide-react';

export default function VideoPlayer({ src }: { src: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayToggle = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.error('Video play failed:', err);
      });
    }
  };

  const handleMuteToggle = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.requestFullscreen) {
      video.requestFullscreen();
    }
  };

  return (
    <div className="relative rounded-xl overflow-hidden border border-white/10 bg-black/30 shadow-2xl group transition-all duration-300 hover:border-accent/20">
      <video
        ref={videoRef}
        src={src}
        className="w-full h-auto object-cover max-h-[300px]"
        playsInline
        muted={isMuted}
        loop
        preload="metadata"
        onClick={handlePlayToggle}
        aria-label="Gopi Chand introduction video"
      >
        <track kind="captions" />
        Your browser does not support the video element.
      </video>

      {/* Custom overlay controls */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
        <div className="flex items-center justify-between">
          <button
            onClick={handlePlayToggle}
            className="p-1.5 bg-accent/20 hover:bg-accent/40 text-white rounded-lg transition-all"
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            {isPlaying ? (
              <span className="text-xs font-semibold px-1 font-mono">PAUSE</span>
            ) : (
              <Play size={16} />
            )}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleMuteToggle}
              className="p-1.5 bg-white/5 hover:bg-white/15 text-white rounded-lg transition-all"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <button
              onClick={handleFullscreen}
              className="p-1.5 bg-white/5 hover:bg-white/15 text-white rounded-lg transition-all"
              aria-label="Fullscreen"
            >
              <Maximize size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Center Play Button if paused */}
      {!isPlaying && (
        <button
          onClick={handlePlayToggle}
          className="absolute inset-0 m-auto w-12 h-12 flex items-center justify-center bg-accent/90 text-white rounded-full hover:bg-accent hover:scale-105 transition-all shadow-lg shadow-accent/40 z-10"
          aria-label="Play video introduction"
        >
          <Play size={20} className="ml-0.5" />
        </button>
      )}
    </div>
  );
}
