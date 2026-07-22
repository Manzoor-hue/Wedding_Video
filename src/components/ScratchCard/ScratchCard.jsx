import "./ScratchCard.css";
import { useEffect, useRef, useState } from "react";
import ParticleBurst from "./ParticleBurst";

export default function ScratchCard() {
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);

  const [revealed, setRevealed] = useState(false);
  const [burst, setBurst] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;

    if (!canvas || !wrapper) return;

    const ctx = canvas.getContext("2d", {
      willReadFrequently: true,
    });

    function resize() {
      canvas.width = wrapper.offsetWidth;
      canvas.height = wrapper.offsetHeight;
      drawCover();
    }

    function drawCover() {
      const w = canvas.width;
      const h = canvas.height;

      const g = ctx.createLinearGradient(0, 0, w, h);

      g.addColorStop(0, "#FFF4C4");
      g.addColorStop(0.3, "#F2C75A");
      g.addColorStop(0.6, "#D89A1D");
      g.addColorStop(1, "#B87800");

      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < 600; i++) {
        ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.4})`;

        ctx.fillRect(
          Math.random() * w,
          Math.random() * h,
          2,
          2
        );
      }

      ctx.fillStyle = "#ffffff";
      ctx.font = "700 22px Cormorant Garamond";
      ctx.textAlign = "center";
      ctx.fillText("Scratch Here", w / 2, h / 2);
    }

    resize();

    window.addEventListener("resize", resize);

    let scratching = false;

    function getPos(e) {
      const rect = canvas.getBoundingClientRect();

      if (e.touches) {
        return {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top,
        };
      }

      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }

    function scratch(x, y) {
      ctx.globalCompositeOperation = "destination-out";

      ctx.beginPath();
      ctx.arc(x, y, 25, 0, Math.PI * 2);
      ctx.fill();

      checkReveal();
    }

    function checkReveal() {
      if (revealed) return;

      const pixels = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      ).data;

      let transparent = 0;

      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] < 20) transparent++;
      }

      const percent =
        transparent / (canvas.width * canvas.height);

      if (percent > 0.35) {
        setRevealed(true);

        setTimeout(() => {
          setBurst(true);
        }, 200);

        canvas.style.transition = "opacity .8s ease";
        canvas.style.opacity = "0";
        canvas.style.pointerEvents = "none";
      }
    }

    function start(e) {
      scratching = true;

      const p = getPos(e);
      scratch(p.x, p.y);
    }

    function move(e) {
      if (!scratching) return;

      e.preventDefault();

      const p = getPos(e);
      scratch(p.x, p.y);
    }

    function stop() {
      scratching = false;
    }

    canvas.addEventListener("mousedown", start);
    canvas.addEventListener("mousemove", move);
    window.addEventListener("mouseup", stop);

    canvas.addEventListener("touchstart", start);
    canvas.addEventListener("touchmove", move, {
      passive: false,
    });
    window.addEventListener("touchend", stop);

    return () => {
      window.removeEventListener("resize", resize);

      canvas.removeEventListener("mousedown", start);
      canvas.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", stop);

      canvas.removeEventListener("touchstart", start);
      canvas.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", stop);
    };
  }, [revealed]);

  return (
    <section className="scratch-section">

      <h2 className="scratch-title">
        {revealed ? "You're Invited!" : "Scratch to Reveal"}
      </h2>

      <div className="divider">
        <span></span>
        ❤
        <span></span>
      </div>

      <div className="scratch-heart">

        <div
          ref={wrapperRef}
          className={`scratch-card ${
            revealed ? "revealed" : ""
          }`}
        >

          <div
            className={`card-content ${
              revealed ? "show" : ""
            }`}
          >

            <div className="gold-top-flourish"></div>

            <h3 className="reveal-date">
              16 August 2026
            </h3>

            <h4 className="reveal-day">
              Sunday
            </h4>

            <small className="reveal-time">
              05:00 PM 
            </small>

            <div className="gold-bottom-flourish"></div>

          </div>

          <canvas
            ref={canvasRef}
            className="scratch-canvas"
          />

          {revealed && (
            <>
              <svg className="gold-border" viewBox="0 0 320 300" preserveAspectRatio="none">
                <path d="M160 280 C160 280 20 190 20 95 C20 40 68 20 104 20 C132 20 152 44 160 74 C168 44 188 20 216 20 C252 20 300 40 300 95 C300 190 160 280 160 280" />
              </svg>
              <div className="flash-burst"></div>
            </>
          )}

          {burst && <ParticleBurst />}

        </div>

      </div>

    </section>
  );
}