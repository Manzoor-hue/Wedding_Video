import "./Leaves.css";

const petals = Array.from({ length: 18 });

export default function Leaves() {
  return (
    <div className="petalContainer">
      {petals.map((_, i) => (
        <img
          key={i}
          src={`/images/hero/leaves/gold-leaf-0${(i % 6) + 1}.webp`}
          className="petal"
          alt=""
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 12}s`,
            animationDuration: `${12 + Math.random() * 8}s`,
            width: `${12 + Math.random() * 16}px`,
          }}
        />
      ))}
    </div>
  );
}