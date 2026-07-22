import "./Journey.css";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { motion } from "framer-motion";

const EVENTS = [
  {
    id: 1,
    time: "05:00 PM",
    title: "Guest Arrival",
    description:
      "Guests are warmly welcomed with refreshments and heartfelt hospitality.",
  },
  {
    id: 2,
    time: "06:00 PM",
    title: "Nikkah Ceremony",
    description:
      "The sacred marriage ceremony begins with blessings and prayers.",
  },
  {
    id: 3,
    time: "07:00 PM",
    title: "Dinner",
    description:
      "A delightful dinner will be served for all our beloved guests.",
  },
  {
    id: 4,
    time: "08:00 PM",
    title: "Walima Reception",
    description:
      "Join us as we celebrate the beginning of our beautiful journey together.",
  },
];

export default function Journey() {
  const sectionRef = useRef(null);

  const timelineRef = useRef(null);

  const markerRefs = useRef([]);

  const [progress, setProgress] = useState(0);

  const [markerPositions, setMarkerPositions] = useState([]);

  /*
  ==========================================
  SCROLL PROGRESS
  ==========================================
  */

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect =
        sectionRef.current.getBoundingClientRect();

      const viewport =
        window.innerHeight;

      const start =
        viewport * 0.78;

      const end =
        rect.height - viewport * 0.28;

      const current = Math.min(
        Math.max(start - rect.top, 0),
        end
      );

      const value =
        end <= 0 ? 0 : current / end;

      setProgress(
        Math.max(
          0,
          Math.min(1, value)
        )
      );
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      handleScroll
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );

      window.removeEventListener(
        "resize",
        handleScroll
      );
    };
  }, []);

  /*
  ==========================================
  READ MARKER POSITIONS
  ==========================================
  */

  useLayoutEffect(() => {
    const calculateMarkers = () => {
      if (!timelineRef.current) return;

      const parentRect =
        timelineRef.current.getBoundingClientRect();

      const positions =
        markerRefs.current.map((marker) => {
          if (!marker) return 0;

          const rect =
            marker.getBoundingClientRect();

          return (
            rect.top -
            parentRect.top +
            rect.height / 2
          );
        });

      setMarkerPositions(
        positions
      );
    };

    calculateMarkers();

    window.addEventListener(
      "resize",
      calculateMarkers
    );

    return () =>
      window.removeEventListener(
        "resize",
        calculateMarkers
      );
  }, []);

  /*
  ==========================================
  TIMELINE HEIGHT
  ==========================================
  */

  const timelineHeight =
    markerPositions.length
      ? markerPositions[
          markerPositions.length - 1
        ] + 160
      : EVENTS.length * 320;

  /*
  ==========================================
  ROSE POSITION
  ==========================================
  */

  let roseY = 0;

  if (markerPositions.length) {
    if (progress <= 0) {
      roseY =
        markerPositions[0];
    } else if (progress >= 1) {
      roseY =
        markerPositions[
          markerPositions.length - 1
        ];
    } else {
      const scaled =
        progress *
        (markerPositions.length - 1);

      const current =
        Math.floor(scaled);

      const next =
        Math.min(
          current + 1,
          markerPositions.length - 1
        );

      const local =
        scaled - current;

      const eased =
        local < 0.5
          ? 4 *
            local *
            local *
            local
          : 1 -
            Math.pow(
              -2 * local + 2,
              3
            ) /
              2;

      roseY =
        markerPositions[current] +
        (markerPositions[next] -
          markerPositions[current]) *
          eased;
    }
  }

  /*
  ==========================================
  GOLD FILL
  ==========================================
  */

  const fillHeight =
    Math.max(0, roseY);

  return (
    <section
      ref={sectionRef}
      className="journey"
    >
      <div className="journey-paper">

        {/* TITLE */}

        <div className="journey-title">

          <span>
            Wedding Schedule
          </span>

          <h2>
            Schedule of Events
          </h2>

          <p>
            Every beautiful moment has
            its own place in our
            celebration.
          </p>

        </div>

        {/* TIMELINE */}

        <div
          ref={timelineRef}
          className="timeline"
          style={{
            height: timelineHeight,
          }}
        >
                      {/* CENTER LINE */}

          <div className="timeline-center">

            <div className="timeline-line" />

            <div
              className="timeline-fill"
              style={{
                height: `${fillHeight}px`,
              }}
            />

            {/* NEW ROSE WRAPPER */}

            <div
              className="rose-wrapper"
              style={{
                transform: `translate(-50%, ${roseY}px)`,
              }}
            >

              <img
                src="/images/decorations/timeline-rose.webp"
                alt="Rose"
                className="timeline-rose"
                draggable={false}
              />

            </div>

          </div>

          {/* EVENTS */}

          <div className="timeline-events">

            {EVENTS.map((event, index) => {

              const active =
                progress >=
                index /
                  (EVENTS.length - 1);

              return (

                <motion.div

                  key={event.id}

                  className={`timeline-row ${
                    index % 2 === 0
                      ? "left"
                      : "right"
                  }`}

                  initial={{
                    opacity: 0,
                    y: 80,
                  }}

                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}

                  viewport={{
                    amount: 0.35,
                    once: false,
                  }}

                  transition={{
                    duration: 0.8,
                    ease: "easeOut",
                  }}

                >

                  {/* LEFT SIDE */}

                  {index % 2 === 0 ? (

                    <>

                      <div className="timeline-time">

                        <h4>

                          {event.time}

                        </h4>

                      </div>

                      <div
                        className="timeline-marker"
                        ref={(el) =>
                          (markerRefs.current[index] =
                            el)
                        }
                      >

                        <motion.div

                          className={`diamond ${
                            active
                              ? "active"
                              : ""
                          }`}

                          animate={{
                            scale: active
                              ? 1.2
                              : 1,

                            rotate: 45,
                          }}

                          transition={{
                            duration: 0.35,
                          }}

                        />

                      </div>

                      <motion.div

                        className={`timeline-card ${
                          active
                            ? "active"
                            : ""
                        }`}

                        animate={{
                          opacity: active
                            ? 1
                            : 0.65,

                          scale: active
                            ? 1
                            : 0.95,

                          y: active
                            ? 0
                            : 12,
                        }}

                        transition={{
                          duration: 0.45,
                        }}

                      >

                        <h3>

                          {event.title}

                        </h3>

                        <p>

                          {event.description}

                        </p>

                      </motion.div>

                    </>

                  ) : (

                    <>

                      <motion.div

                        className={`timeline-card ${
                          active
                            ? "active"
                            : ""
                        }`}

                        animate={{
                          opacity: active
                            ? 1
                            : 0.65,

                          scale: active
                            ? 1
                            : 0.95,

                          y: active
                            ? 0
                            : 12,
                        }}

                        transition={{
                          duration: 0.45,
                        }}

                      >

                        <h3>

                          {event.title}

                        </h3>

                        <p>

                          {event.description}

                        </p>

                      </motion.div>

                      <div
                        className="timeline-marker"
                        ref={(el) =>
                          (markerRefs.current[index] =
                            el)
                        }
                      >

                        <motion.div

                          className={`diamond ${
                            active
                              ? "active"
                              : ""
                          }`}

                          animate={{
                            scale: active
                              ? 1.2
                              : 1,

                            rotate: 45,
                          }}

                          transition={{
                            duration: 0.35,
                          }}

                        />

                      </div>

                      <div className="timeline-time">

                        <h4>

                          {event.time}

                        </h4>

                      </div>

                    </>

                  )}

                </motion.div>

              );

            })}

          </div>

        </div>

        {/* BOTTOM FLOURISH */}

        <motion.div

          className="journey-bottom"

          initial={{
            opacity: 0,
            y: 40,
          }}

          whileInView={{
            opacity: 1,
            y: 0,
          }}

          viewport={{
            once: true,
          }}

          transition={{
            duration: 0.8,
          }}

        >

          <img

            src="/images/decorations/flourish-gold.webp"

            alt="Gold Flourish"

            draggable={false}

          />

        </motion.div>

      </div>

    </section>

  );

}