import "./Names.css";

export default function Names() {
  return (
    <div className="heroContent">

      <img
        src="/images/hero/bismillah-gold.webp"
        className="bismillah reveal reveal1"
        alt=""
      />

      <h2 className="weddingDay reveal reveal2">
        Wedding Day
      </h2>

      <p className="date reveal reveal3">
        Sunday, 16 August 2026
      </p>

      <h1 className="coupleNames">

        <div className="reveal reveal4">
          Aysha
        </div>

        <span className="reveal reveal5">
          &
        </span>

        <div className="reveal reveal6">
          Imran
        </div>

      </h1>

    </div>
  );
}