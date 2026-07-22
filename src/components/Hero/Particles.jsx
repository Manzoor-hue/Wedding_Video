import "./Particles.css";

const particles = Array.from({ length: 25 });

export default function Particles() {
  return (
    <div className="particles">
      {particles.map((_, i) => (
        <span
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${6 + Math.random() * 8}s`,
            transform: `scale(${0.5 + Math.random()})`
          }}
        />
      ))}
    </div>
  );
}