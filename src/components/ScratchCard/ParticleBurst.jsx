import "./ParticleBurst.css";
import { useMemo } from "react";

const COLORS = [
  "#FFD700",
  "#F4C430",
  "#FFF4B0",
  "#FFFFFF",
  "#D4AF37",
  "#E91E63",
  "#FFB6C1"
];

const TYPES = [
  "confetti",
  "confetti",
  "confetti",
  "heart",
  "petal",
  "sparkle",
  "circle"
];

export default function ParticleBurst() {

  const particles = useMemo(() => {

    return Array.from({ length: 120 }, (_, i) => {

      const left = i % 2 === 0;

      const angle = left
        ? -70 + Math.random() * 45
        : 205 + Math.random() * 45;

      const rad = angle * Math.PI / 180;

      const speed = 120 + Math.random() * 180;

      return {

        id: i,

        side: left ? "left" : "right",

        type: TYPES[Math.floor(Math.random() * TYPES.length)],

        x: Math.cos(rad) * speed,

        y: Math.sin(rad) * speed,

        rotate: Math.random() * 720 - 360,

        size: 6 + Math.random() * 12,

        delay: Math.random() * .18,

        duration: 1.6 + Math.random() * .9,

        color: COLORS[Math.floor(Math.random() * COLORS.length)]

      };

    });

  }, []);

  return (

    <div className="particle-burst">

      <div className="popper left"></div>

      <div className="popper right"></div>

      {particles.map((p) => (

        <span
          key={p.id}
          className={`particle ${p.type} ${p.side}`}
          style={{

            "--x": `${p.x}px`,
            "--y": `${p.y}px`,
            "--r": `${p.rotate}deg`,
            "--size": `${p.size}px`,
            "--delay": `${p.delay}s`,
            "--duration": `${p.duration}s`,
            "--color": p.color

          }}
        />

      ))}

    </div>

  );

}