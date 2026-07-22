import "./Flowers.css";

export default function Flowers() {
  return (
    <>
      {/* Hanging Garland */}
      <img
        src="/images/hero/gold-hanging-vine.webp"
        className="garland"
        alt=""
      />

      {/* Top Corners */}
      <img
        src="/images/hero/corner-flower-left.webp"
        className="flower flowerTL"
        alt=""
      />

      <img
        src="/images/hero/corner-flower-right.webp"
        className="flower flowerTR"
        alt=""
      />

      {/* Bottom Corners */}
      <img
        src="/images/hero/corner-flower-left.webp"
        className="flower flowerBL"
        alt=""
      />

      <img
        src="/images/hero/corner-flower-right.webp"
        className="flower flowerBR"
        alt=""
      />
    </>
  );
}