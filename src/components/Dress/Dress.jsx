import "./Dress.css";

export default function DressCode() {
  return (
    <section className="dress-section">

      <div className="dress-card">

        {/* Paper */}
        <img
          src="/images/decorations/paper.webp"
          className="paper"
          alt="Paper"
        />

        {/* Flowers */}
        <img
          src="/images/decorations/floral-top-right.webp"
          className="flower-top"
          alt=""
        />

        <img
          src="/images/decorations/floral-bottom-left.webp"
          className="flower-bottom"
          alt=""
        />

        {/* Content */}
        <div className="paper-content">

          <div className="dress-block">

            <h2>Dress Code</h2>

            <p>
              We kindly ask guests to avoid deep
              <br />
              <span>red</span> and <span>maroon</span> attire
              for the
              <br />
              celebration.
            </p>

          </div>

          <div className="gift-block">

            <h2>Gift Preference</h2>

            <p>
              Kindly, no boxed gifts please.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}