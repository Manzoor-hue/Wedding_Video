import { useState } from "react";
import "./RSVP.css";
import RSVPPopup from "./RSVPPopup";

export default function RSVP() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="rsvp-section" id="rsvp">

        <h2 className="rsvp-title">
          Confirm Your Attendance
        </h2>

        <p className="rsvp-text">
          To help us prepare for a joyful celebration,
          <br />
          kindly confirm your attendance.
        </p>

        <button
          className="seal-button"
          onClick={() => setOpen(true)}
          aria-label="Open RSVP"
        >
          <img
            src="/images/decorations/rsvp-seal.webp"
            alt="RSVP"
          />
        </button>

        <div className="click-open">

          <span>⌄</span>

          <p>Click to Open</p>

        </div>

        <h3 className="hope-text">

          Hope to see you there!

        </h3>

        <h4 className="couple-name">

          Imran & Aysha

        </h4>

      </section>

      <RSVPPopup
        open={open}
        onClose={() => setOpen(false)}
      />

    </>
  );
}