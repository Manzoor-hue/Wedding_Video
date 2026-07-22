import { useRef, useState } from "react";
import "./Envelope.css";

import Hero from "../Hero/Hero";

export default function Envelope() {
  const videoRef = useRef(null);
  const audioRef = useRef(null);

    const [started, setStarted] = useState(false);
    const [pressed, setPressed] = useState(false);
    const [zoom, setZoom] = useState(false);
    const [showHero, setShowHero] = useState(false);
    const [fadeVideo, setFadeVideo] = useState(false);

    const openInvitation = async () => {
    if (started) return;

    setPressed(true);

    setTimeout(async () => {
        setZoom(true);
        setStarted(true);

        try {
        await audioRef.current.play();
        } catch (e) {}

        videoRef.current.play();

    }, 450);
    };

const handleVideoEnd = () => {
  // Show the Hero underneath the video
  setShowHero(true);

  // Give React one frame to render Hero, then fade video out
  requestAnimationFrame(() => {
    setFadeVideo(true);
  });
};

  return (
    <>   
        <div  className={`intro ${fadeVideo ? "fade" : ""} ${pressed ? "pressed" : ""}`}>

          {!started && (
            <>
              <img
                src="/images/envelope/envelope.webp"
                className={`envelope ${zoom ? "zoom" : ""}`}
                alt="Envelope"
              />

              {/* Invisible Click Area */}
              <div
                className="sealHotspot"
                onClick={openInvitation}
              ></div>
            </>
          )}

          <video
            ref={videoRef}
            className={`introVideo ${started ? "show" : ""}`}
            playsInline
            preload="auto"
            onEnded={handleVideoEnd}
          >
            <source
              src="/videos/intro.mp4"
              type="video/mp4"
            />
          </video>

          <audio
            ref={audioRef}
            src="/music/bgm.mp3"
            loop
          />
        </div>
      

      <Hero />
    </>
  );
}