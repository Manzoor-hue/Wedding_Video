import { useEffect, useState } from "react";
import "./RSVPPopup.css";

export default function RSVPPopup({ open, onClose }) {

    const [form, setForm] = useState({
        name: "",
        attendance: "",
        guests: "1",
        song: "",
        children: ""
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

        const phone = "+919360700749"; // Replace with your WhatsApp number

        const message = `
━━━━━━━━━━━━━━━━━━

🤍 *Wedding RSVP*

━━━━━━━━━━━━━━━━━━

*Name*
${form.name}

*Attendance*
${form.attendance}

*Guests*
${form.guests}

*Favourite Song*
${form.song || "N/A"}

*Children*
${form.children || "None"}

━━━━━━━━━━━━━━━━━━

Looking forward to celebrating!

━━━━━━━━━━━━━━━━━━
`;

        window.open(
            `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
            "_blank"
        );

        setForm({
            name: "",
            attendance: "",
            guests: "1",
            song: "",
            children: ""
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

                    <div className="form-group">

                        <label>Your Name</label>

                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                        />

                    </div>

                    <div className="form-group">

                        <label>Will you be attending?</label>

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

                                Accepts with pleasure

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

                                Declines with regret

                            </label>

                        </div>

                    </div>

                    <div className="form-group">

                        <label>Number of Guests</label>

                        <select
                            name="guests"
                            value={form.guests}
                            onChange={handleChange}
                        >

                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>

                        </select>

                    </div>

                    <div className="form-group">

                        <label>Favourite Song (Optional)</label>

                        <input
                            type="text"
                            name="song"
                            value={form.song}
                            onChange={handleChange}
                            placeholder="Your favourite song"
                        />

                    </div>

                    <div className="form-group">

                        <label>Children Attending</label>

                        <input
                            type="text"
                            name="children"
                            value={form.children}
                            onChange={handleChange}
                            placeholder="Names & Ages (optional)"
                        />

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