import "./ScratchCard.css";
import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";

const WIDTH = 260;
const HEIGHT = 240;
const BRUSH = 24;

export default function ScratchCard() {

  const canvasRef = useRef(null);

  const drawingRef = useRef(false);

  const revealedRef = useRef(false);

  const [revealed, setRevealed] = useState(false);

  useEffect(() => {

    const canvas = canvasRef.current;

    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;

    canvas.width = WIDTH * dpr;
    canvas.height = HEIGHT * dpr;

    canvas.style.width = WIDTH + "px";
    canvas.style.height = HEIGHT + "px";

    const ctx = canvas.getContext("2d");

    ctx.scale(dpr, dpr);

    drawCover(ctx);

    function getPoint(e){

      const rect =
      canvas.getBoundingClientRect();

      return{

        x:
        (e.touches
          ? e.touches[0].clientX
          : e.clientX) - rect.left,

        y:
        (e.touches
          ? e.touches[0].clientY
          : e.clientY) - rect.top

      };

    }

    function start(e){

      if(revealedRef.current) return;

      drawingRef.current = true;

      scratch(e);

    }

    function scratch(e){

      if(!drawingRef.current) return;

      e.preventDefault();

      const p = getPoint(e);

      ctx.save();

      ctx.globalCompositeOperation =
      "destination-out";

      ctx.beginPath();

      ctx.arc(
        p.x,
        p.y,
        BRUSH,
        0,
        Math.PI*2
      );

      ctx.fill();

      ctx.restore();

    }

    function end(){

      drawingRef.current = false;

      checkReveal();

    }

    function checkReveal(){

      if(revealedRef.current) return;

      const pixels =
      ctx.getImageData(
        0,
        0,
        WIDTH,
        HEIGHT
      ).data;

      let cleared = 0;

      let total = 0;

      for(
        let i = 3;
        i < pixels.length;
        i += 4
      ){

        total++;

        if(pixels[i] < 20){

          cleared++;

        }

      }

      if(cleared / total > 0.60){

        revealedRef.current = true;

        setRevealed(true);

        canvas.style.transition =
        "opacity .8s ease";

        canvas.style.opacity = "0";

        canvas.style.pointerEvents =
        "none";

        confetti({

          particleCount:180,

          spread:90,

          startVelocity:40,

          scalar:1.05,

          origin:{
            x:.5,
            y:.45
          }

        });

      }

    }

    canvas.addEventListener(
      "mousedown",
      start
    );

    canvas.addEventListener(
      "mousemove",
      scratch
    );

    window.addEventListener(
      "mouseup",
      end
    );

    canvas.addEventListener(
      "touchstart",
      start,
      { passive:false }
    );

    canvas.addEventListener(
      "touchmove",
      scratch,
      { passive:false }
    );

    window.addEventListener(
      "touchend",
      end
    );
        return () => {

      canvas.removeEventListener(
        "mousedown",
        start
      );

      canvas.removeEventListener(
        "mousemove",
        scratch
      );

      window.removeEventListener(
        "mouseup",
        end
      );

      canvas.removeEventListener(
        "touchstart",
        start
      );

      canvas.removeEventListener(
        "touchmove",
        scratch
      );

      window.removeEventListener(
        "touchend",
        end
      );

    };

  }, []);

  function drawCover(ctx){

    ctx.clearRect(
      0,
      0,
      WIDTH,
      HEIGHT
    );

    /* ===============================
       LUXURY GOLD BASE
    ================================ */

    const gold =
      ctx.createLinearGradient(
        0,
        0,
        WIDTH,
        HEIGHT
      );

    gold.addColorStop(0,"#fff8d8");
    gold.addColorStop(.15,"#f6df86");
    gold.addColorStop(.35,"#d8b03c");
    gold.addColorStop(.50,"#fff2b4");
    gold.addColorStop(.70,"#c89420");
    gold.addColorStop(1,"#896216");

    ctx.fillStyle = gold;

    ctx.fillRect(
      0,
      0,
      WIDTH,
      HEIGHT
    );

    /* ===============================
       METALLIC STRIPES
    ================================ */

    for(
      let i=-HEIGHT;
      i<WIDTH;
      i+=12
    ){

      ctx.beginPath();

      ctx.strokeStyle =
      "rgba(255,255,255,.18)";

      ctx.lineWidth = 2;

      ctx.moveTo(i,0);

      ctx.lineTo(
        i+HEIGHT,
        HEIGHT
      );

      ctx.stroke();

    }

    /* ===============================
       GOLD SPARKLES
    ================================ */

    for(
      let i=0;
      i<420;
      i++
    ){

      ctx.beginPath();

      ctx.fillStyle =
      `rgba(
        255,
        255,
        255,
        ${Math.random()*0.18}
      )`;

      ctx.arc(

        Math.random()*WIDTH,

        Math.random()*HEIGHT,

        Math.random()*1.6,

        0,

        Math.PI*2

      );

      ctx.fill();

    }

    /* ===============================
       SOFT TOP SHINE
    ================================ */

    const shine =
      ctx.createRadialGradient(

        WIDTH*.35,

        HEIGHT*.18,

        10,

        WIDTH*.35,

        HEIGHT*.18,

        140

      );

    shine.addColorStop(
      0,
      "rgba(255,255,255,.50)"
    );

    shine.addColorStop(
      .45,
      "rgba(255,255,255,.15)"
    );

    shine.addColorStop(
      1,
      "rgba(255,255,255,0)"
    );

    ctx.fillStyle = shine;

    ctx.fillRect(
      0,
      0,
      WIDTH,
      HEIGHT
    );

    /* ===============================
       SCRATCH TEXT
    ================================ */

    ctx.font =
    "600 18px Cinzel";

    ctx.textAlign =
    "center";

    ctx.textBaseline =
    "middle";

    ctx.fillStyle =
    "#ffffff";

    ctx.shadowColor =
    "rgba(0,0,0,.25)";

    ctx.shadowBlur = 8;

    ctx.fillText(

      "SCRATCH TO REVEAL",

      WIDTH/2,

      HEIGHT/2

    );

    ctx.shadowBlur = 0;

  }

  return (

    <section className="scratch-section">

      <div className="scratch-container">

        <svg
          width="0"
          height="0"
          style={{
            position:"absolute"
          }}
          aria-hidden="true"
        >

          <defs>

            <clipPath
              id="royal-heart"
              clipPathUnits="objectBoundingBox"
            >

              <path d="
                M0.5,0.96
                C0.5,0.96 0.06,0.70 0.06,0.36
                C0.06,0.18 0.20,0.06 0.32,0.06
                C0.42,0.06 0.48,0.14 0.5,0.24
                C0.52,0.14 0.58,0.06 0.68,0.06
                C0.80,0.06 0.94,0.18 0.94,0.36
                C0.94,0.70 0.5,0.96 0.5,0.96
                Z
              "/>

            </clipPath>

          </defs>

        </svg>
        <h2 className="scratch-title">
          Forever Start Here
        </h2>
        
        <h3 className="scratch-title1">
          Join us as our story unfolds
        </h3>    

        <div className="divider">

          <span />

          ✦

          <span />

        </div>

        <div className="heart-wrapper">

          <div className="heart-shadow" />

          <div className="heart-clip">

            <div
              className={`card-content ${
                revealed ? "show" : ""
              }`}
            >

              <div className="gold-top-flourish" />

              <h3 className="reveal-date">
                16 August 2026
              </h3>

              <p className="reveal-day">
                Sunday
              </p>

              <p className="reveal-time">
                05:00 PM
              </p>

              <div className="gold-bottom-flourish" />

            </div>

            <canvas
              ref={canvasRef}
              className="scratch-canvas"
            />

            <div className="heart-vignette" />

            <div className="heart-highlight" />

          </div>

          <svg
            className="heart-outline"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >

            <path
              d="
              M50,96
              C50,96 6,70 6,36
              C6,18 20,6 32,6
              C42,6 48,14 50,24
              C52,14 58,6 68,6
              C80,6 94,18 94,36
              C94,70 50,96 50,96
              Z
              "
            />

          </svg>

          {revealed && (

            <div className="flash-burst" />

          )}

        </div>

      </div>

    </section>

  );

}