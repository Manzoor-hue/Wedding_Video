import { useEffect, useState } from "react";
import "./RSVPPopup.css";

export default function RSVPPopup({

    open,

    onClose,

    side

}) {

    const [form, setForm] = useState({

        name: "",

        attendance: "",

        excited: "",

        gallery: "",

        photo: "",

        marriage: "",

        memory: "",

        cry: ""

    });

    useEffect(() => {

        if (!open) return;

        document.body.style.overflow = "hidden";

        const handleEsc = (e) => {

            if (e.key === "Escape") {

                onClose();

            }

        };

        window.addEventListener("keydown", handleEsc);

        return () => {

            document.body.style.overflow = "auto";

            window.removeEventListener("keydown", handleEsc);

        };

    }, [open, onClose]);

    if (!open) return null;

    const handleChange = (e) => {

        const { name, value } = e.target;

        setForm((prev) => ({

            ...prev,

            [name]: value,

        }));

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        if (!form.name.trim()) {

            alert("Please enter your name.");

            return;

        }

        if (!form.attendance) {

            alert("Please select your attendance.");

            return;

        }

        const phone =

            side === "Bride"

                ? "916383146227"

                : "917401592598";

        const message = `

━━━━━━━━━━━━━━━━━━

🌿 *Wedding RSVP*

━━━━━━━━━━━━━━━━━━

*Side*
${side}

*Guest Name*
${form.name}

*Attendance*
${form.attendance}

*Most Excited For*
${form.excited || "Not answered"}

*Ready to Fill Gallery*
${form.gallery || "Not answered"}

*Must-have Wedding Photo*
${form.photo || "Not answered"}

*Marriage is...*
${form.marriage || "Not answered"}

*Favourite Memory*
${form.memory || "Not answered"}

*Who Will Cry First?*
${form.cry || "Not answered"}

━━━━━━━━━━━━━━━━━━

Thank you for your RSVP 🤍

We can't wait to celebrate with you!

━━━━━━━━━━━━━━━━━━

`;

        window.open(

            `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,

            "_blank"

        );

        setForm({

            name: "",

            attendance: "",

            excited: "",

            gallery: "",

            photo: "",

            marriage: "",

            memory: "",

            cry: ""

        });

        onClose();

    };
        return (

        <div
            className="popup-overlay"
            onClick={onClose}
        >

            <div
                className="popup-card"
                onClick={(e) => e.stopPropagation()}
            >

                {/* ===============================
                    CLOSE BUTTON
                =============================== */}

                <button
                    className="popup-close"
                    onClick={onClose}
                    aria-label="Close RSVP"
                >

                    ✕

                </button>


                {/* ===============================
                    HEADER
                =============================== */}

                <div className="popup-header">

                    <p className="popup-tag">

                        Wedding RSVP

                    </p>

                    <h2>

                        {side === "Bride"

                            ? "Aysha"

                            : "Imran"}

                    </h2>

                    <h3>

                        RSVP

                    </h3>

                    <img

                        src="/images/decorations/gold-divider.webp"

                        alt=""

                        className="popup-divider"

                    />

                    <p className="popup-family">

                        {side === "Bride"

                            ? "Celebrating with Aysha's Family"

                            : "Celebrating with Imran's Family"}

                    </p>

                    <p className="popup-subtitle">

                        Kindly respond before {" "}

                        <span>

                            09 August 2026

                        </span>

                    </p>

                </div>


                {/* ===============================
                    FORM
                =============================== */}

                <form
                    className="rsvp-form"
                    onSubmit={handleSubmit}
                >

                    {/* ===============================
                        NAME
                    =============================== */}

                    <div className="form-group">

                        <label>

                            Your Name

                            <span className="required">

                                *

                            </span>

                        </label>

                        <input

                            type="text"

                            name="name"

                            value={form.name}

                            onChange={handleChange}

                            placeholder="Enter your full name"

                        />

                    </div>


                    {/* ===============================
                        ATTENDANCE
                    =============================== */}

                    <div className="form-group">

                        <label>

                            Will we have the pleasure of celebrating with you?

                        </label>

                        <div className="radio-group">

                            <label className="radio-card">

                                <input

                                    type="radio"

                                    name="attendance"

                                    value="Inshallah, I'll be there to celebrate your special day 🤍"

                                    checked={
                                        form.attendance ===
                                        "Inshallah, I'll be there to celebrate your special day 🤍"
                                    }

                                    onChange={handleChange}

                                />

                                <span>

                                    Inshallah, I'll be there to celebrate your special day 🤍

                                </span>

                            </label>

                            <label className="radio-card">

                                <input

                                    type="radio"

                                    name="attendance"

                                    value="Though I can't attend, my prayers and best wishes are with you 🌿"

                                    checked={
                                        form.attendance ===
                                        "Though I can't attend, my prayers and best wishes are with you 🌿"
                                    }

                                    onChange={handleChange}

                                />

                                <span>

                                    Though I can't attend, my prayers and best wishes are with you 🌿

                                </span>

                            </label>

                        </div>

                    </div>
                                        {/* ===============================
                        MOST EXCITED
                    =============================== */}

                    <div className="form-group">

                        <label>

                            Which moment are you looking forward to the most?

                            <span className="optional">

                                Optional

                            </span>

                        </label>

                        <input

                            type="text"

                            name="excited"

                            value={form.excited}

                            onChange={handleChange}

                            placeholder="Nikkah, First Look, Dinner..."

                        />

                    </div>


                    {/* ===============================
                        PHOTO
                    =============================== */}

                    <div className="form-group">

                        <label>

                            Which photo are you definitely taking?

                            <span className="optional">

                                Optional

                            </span>

                        </label>

                        <input

                            type="text"

                            name="photo"

                            value={form.photo}

                            onChange={handleChange}

                            placeholder="A selfie with the couple..."

                        />

                    </div>


                    {/* ===============================
                        GALLERY
                    =============================== */}

                    <div className="form-group">

                        <label>

                            Ready to flood your gallery with wedding memories?

                            <span className="optional">

                                Optional

                            </span>

                        </label>

                        <input

                            type="text"

                            name="gallery"

                            value={form.gallery}

                            onChange={handleChange}

                            placeholder="Absolutely! 📸"

                        />

                    </div>


                    {/* ===============================
                        MARRIAGE
                    =============================== */}

                    <div className="form-group">

                        <label>

                            Complete this sentence

                            <span className="optional">

                                Optional

                            </span>

                        </label>

                        <h4 className="question-title">

                            "Marriage is..."

                        </h4>

                        <textarea

                            name="marriage"

                            value={form.marriage}

                            onChange={handleChange}

                            rows={3}

                            placeholder="Love, friendship, trust..."

                        />

                    </div>


                    {/* ===============================
                        MEMORY
                    =============================== */}

                    <div className="form-group">

                        <label>

                            Share your favourite memory with us

                            <span className="optional">

                                Optional

                            </span>

                        </label>

                        <textarea

                            name="memory"

                            value={form.memory}

                            onChange={handleChange}

                            rows={4}

                            placeholder="Tell us something we'll always remember..."

                        />

                    </div>


                    {/* ===============================
                        CRY
                    =============================== */}

                    <div className="form-group">

                        <label>

                            Who do you think will get emotional first?

                            <span className="optional">

                                Optional

                            </span>

                        </label>

                        <select

                            name="cry"

                            value={form.cry}

                            onChange={handleChange}

                        >

                            <option value="">

                                Choose your prediction

                            </option>

                            <option>

                                Bride ❤️

                            </option>

                            <option>

                                Groom ❤️

                            </option>

                            <option>

                                Both Together 🥹

                            </option>

                            <option>

                                Parents ❤️

                            </option>

                        </select>

                    </div>
                                        {/* ===============================
                        SUBMIT BUTTON
                    =============================== */}

                    <button
                        type="submit"
                        className="submit-btn"
                    >

                        <span>

                            Send RSVP via WhatsApp

                        </span>

                    </button>

                </form>

            </div>

        </div>

    );

}