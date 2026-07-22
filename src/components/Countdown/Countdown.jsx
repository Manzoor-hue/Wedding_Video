import "./Countdown.css";
import { useEffect, useState } from "react";

const WEDDING_DATE = new Date("2026-08-16T17:00:00");

export default function Countdown() {

    const getTimeLeft = () => {

        const difference = WEDDING_DATE - new Date();

        if (difference <= 0) {

            return {

                days: "00",
                hours: "00",
                minutes: "00",
                seconds: "00",

            };

        }

        return {

            days: String(
                Math.floor(
                    difference / (1000 * 60 * 60 * 24)
                )
            ).padStart(2, "0"),

            hours: String(
                Math.floor(
                    (difference / (1000 * 60 * 60)) % 24
                )
            ).padStart(2, "0"),

            minutes: String(
                Math.floor(
                    (difference / (1000 * 60)) % 60
                )
            ).padStart(2, "0"),

            seconds: String(
                Math.floor(
                    (difference / 1000) % 60
                )
            ).padStart(2, "0"),

        };

    };

    const [timeLeft, setTimeLeft] = useState(getTimeLeft());

    const [fade, setFade] = useState(false);

    useEffect(() => {

        const interval = setInterval(() => {

            setFade(true);

            setTimeout(() => {

                setTimeLeft(getTimeLeft());

                setFade(false);

            }, 250);

        }, 1000);

        return () => clearInterval(interval);

    }, []);

    return (

        <section className="countdown">

            <h2 className="countdown-title">
                The Celebration Begins In
            </h2>

            <div className="countdown-grid">

                <div className="count-box">

                    <span>
                        {timeLeft.days}
                    </span>

                    <small>Days</small>

                </div>

                <div className="separator">:</div>

                <div className="count-box">

                    <span>
                        {timeLeft.hours}
                    </span>

                    <small>Hours</small>

                </div>

                <div className="separator">:</div>

                <div className="count-box">

                    <span>
                        {timeLeft.minutes}
                    </span>

                    <small>Minutes</small>

                </div>

                <div className="separator">:</div>

                <div className="count-box">

                    <span
                        className={fade ? "fade-number" : ""}
                    >
                        {timeLeft.seconds}
                    </span>

                    <small>Seconds</small>

                </div>

            </div>

        </section>

    );

}