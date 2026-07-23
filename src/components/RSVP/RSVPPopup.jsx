import { useEffect, useState } from "react";
import "./RSVPPopup.css";

export default function RSVPPopup({ open, onClose }) {

    const [form, setForm] = useState({

        name: "",

        attendance: "",

        team: "",

        excited: "",

        gallery: "",

        photo: "",

        marriage: "",

        memory: "",

        cry: ""

    });

    useEffect(() => {

        if (!open) return;

        const handleEsc = (e) => {

            if (e.key === "Escape") {

                onClose();

            }

        };

        document.body.style.overflow = "hidden";

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

        if (form.name.trim() === "") {

            alert("Please enter your name.");

            return;

        }

        if (form.attendance === "") {

            alert("Please select your attendance.");

            return;

        }

        const phone = "+916383146227";

        const message = `
━━━━━━━━━━━━━━━━━━

*Wedding RSVP*

━━━━━━━━━━━━━━━━━━

*Name*
${form.name}

*Attendance*
${form.attendance || "Not answered"}

*Team*
${form.team || "Not answered"}

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

*Who will Cry First?*
${form.cry || "Not answered"}

━━━━━━━━━━━━━━━━━━

Thank you...
We can't wait to celebrate together!

━━━━━━━━━━━━━━━━━━
`;

        window.open(

            `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,

            "_blank"

        );

        setForm({

            name: "",

            attendance: "",

            team: "",

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

                <button
                    className="popup-close"
                    onClick={onClose}
                >
                    ✕
                </button>

                <h2>RSVP</h2>

                <p className="popup-subtitle">
                    Please RSVP before <strong>09 August 2026</strong>
                </p>

                <form
                    className="rsvp-form"
                    onSubmit={handleSubmit}
                >

                    {/* ===============================
                        NAME
                    =============================== */}

                    <div className="form-group">

                        <label>Your Name *</label>

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

                            <label>

                                <input
                                    type="radio"
                                    name="attendance"
                                    value="Accepts with pleasure"
                                    checked={
                                        form.attendance ===
                                        "Accepts with pleasure"
                                    }
                                    onChange={handleChange}
                                />

                                Inshaallah, I'll be there to celebrate Your Special day 🤍

                            </label>

                            <label>

                                <input
                                    type="radio"
                                    name="attendance"
                                    value="Declines with regret"
                                    checked={
                                        form.attendance ===
                                        "Declines with regret"
                                    }
                                    onChange={handleChange}
                                />

                                Though I can't attend, my prayers and best wishes are with you 🌿

                            </label>

                        </div>

                    </div>

                    {/* ===============================
                        TEAM
                    =============================== */}

                    <div className="form-group">

                        <label>
                            Which team are you joining?
                            <span className="optional">
                                (Optional)
                            </span>
                        </label>

                        <select
                            name="team"
                            value={form.team}
                            onChange={handleChange}
                        >

                            <option value="">
                                Select your team
                            </option>

                            <option>
                                🤵 Groom Squad
                            </option>

                            <option>
                                👰 Bride Squad
                            </option>

                            <option>
                                🤍 Team Both
                            </option>

                        </select>

                    </div>

                    {/* ===============================
                        MOST EXCITED
                    =============================== */}

                    <div className="form-group">

                        <label>
                            What's one moment you're excited for?
                            <span className="optional">
                                (Optional)
                            </span>
                        </label>

                        <input
                            type="text"
                            name="excited"
                            value={form.excited}
                            onChange={handleChange}
                            placeholder="Nikkah, Dinner, Photos..."
                        />

                    </div>

                    {/* ===============================
                        READY TO FILL GALLERY
                    =============================== */}

                    <div className="form-group">

                        <label>
                            Ready to fill your gallery?
                            <span className="optional">
                                (Optional)
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
                        MUST HAVE PHOTO
                    =============================== */}

                    <div className="form-group">

                        <label>
                            What's your must-have wedding photo?
                            <span className="optional">
                                (Optional)
                            </span>
                        </label>

                        <input
                            type="text"
                            name="photo"
                            value={form.photo}
                            onChange={handleChange}
                            placeholder="Selfie with the couple..."
                        />

                    </div>

                    {/* ===============================
                        MARRIAGE IS...
                    =============================== */}

                    <div className="form-group">

                        <label>
                            Complete this sentence:
                            <br />
                            <em>"Marriage is..."</em>
                            <span className="optional">
                                (Optional)
                            </span>
                        </label>

                        <textarea
                            name="marriage"
                            value={form.marriage}
                            onChange={handleChange}
                            rows={3}
                            placeholder="Love, friendship, patience..."
                        />

                    </div>

                    {/* ===============================
                        FAVOURITE MEMORY
                    =============================== */}

                    <div className="form-group">

                        <label>
                            What's your favourite memory with us?
                            <span className="optional">
                                (Optional)
                            </span>
                        </label>

                        <textarea
                            name="memory"
                            value={form.memory}
                            onChange={handleChange}
                            rows={4}
                            placeholder="Share your favourite memory..."
                        />

                    </div>

                    {/* ===============================
                        WHO WILL CRY FIRST
                    =============================== */}

                    <div className="form-group">

                        <label>
                            Predict who will cry first.
                            <span className="optional">
                                (Optional)
                            </span>
                        </label>

                        <select
                            name="cry"
                            value={form.cry}
                            onChange={handleChange}
                        >

                            <option value="">
                                Make your prediction
                            </option>

                            <option>
                                😂 Bride
                            </option>

                            <option>
                                😂 Groom
                            </option>

                            <option>
                                🥹 Both
                            </option>

                            <option>
                                ❤️ Parents
                            </option>

                        </select>

                    </div>

                    <button
                        type="submit"
                        className="submit-btn"
                    >
                        Send via WhatsApp
                    </button>

                </form>

            </div>

        </div>

    );

}