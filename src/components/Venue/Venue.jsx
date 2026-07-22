import "./Venue.css";

export default function Venue() {
  return (
    <section className="venue">

      <h2>Location</h2>

      <div className="venue-divider">
        <span></span>
        ❦
        <span></span>
      </div>

      <h3>Faiz Mahal</h3>

      <p>
        No. 5, Whannels Road, Egmore,<br/>
        Chennai, Tamil Nadu 600 008.
      </p>

      <img
        src="/images/venue/faiz-mahal.webp"
        className="venue-image"
        alt="Faiz Mahal"
      />

<div className="location-map">

    <img
        src="/images/decorations/map-top.webp"
        className="map-decoration top"
        alt=""
    />

    <div className="map-frame">

        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.355784767857!2d80.26058507373376!3d13.076623512569746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526608d4e7bb17%3A0xe907373756d26cc4!2sFaiz%20Mahal!5e0!3m2!1sen!2sin!4v1784485939037!5m2!1sen!2sin"
            loading="lazy"
            allowFullScreen
            title="Wedding Venue"
        />

    </div>

    <img
        src="/images/decorations/map-bottom.webp"
        className="map-decoration bottom"
        alt=""
    />

</div>

      <a
        href="https://maps.app.goo.gl/sjPfFEThgJw9ioro6"
        target="_blank"
        rel="noreferrer"
        className="map-button"
      >
        📍 Open in Google Maps
      </a>

    </section>
  );
}