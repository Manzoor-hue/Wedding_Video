import "./Journey.css";

import {
  motion,
  useScroll,
} from "framer-motion";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

const EVENTS = [
  {
    id: 1,
    time: "5 PM",
    title: "Guest Arrival",
  },
  {
    id: 2,
    time: "6 PM",
    title: "Nikkah Ceremony",
  },
  {
    id: 3,
    time: "7 PM",
    title: "Dinner",
  },
  {
    id: 4,
    time: "8 PM",
    title: "Walima",
  },
];

export default function Journey() {

  const sectionRef = useRef(null);

  const timelineRef = useRef(null);

  const markerRefs = useRef([]);

  const [progress, setProgress] = useState(0);

  const [positions, setPositions] = useState([]);

  const { scrollYProgress } = useScroll({

    target: sectionRef,

    offset: [
      "start end",
      "end start",
    ],

  });

  useEffect(() => {

    const unsubscribe =
      scrollYProgress.on("change", (latest) => {

        setProgress(latest);

      });

    return () => unsubscribe();

  }, [scrollYProgress]);

  useLayoutEffect(() => {

    const measure = () => {

      if (!timelineRef.current) return;

      const parent =
        timelineRef.current.getBoundingClientRect();

      const markerPositions =
        markerRefs.current.map((marker) => {

          if (!marker) return 0;

          const rect =
            marker.getBoundingClientRect();

          return (

            rect.top -

            parent.top +

            rect.height / 2

          );

        });

      setPositions(markerPositions);

    };

    measure();

    const observer =
      new ResizeObserver(measure);

    if (timelineRef.current) {

      observer.observe(
        timelineRef.current
      );

    }

    window.addEventListener(
      "resize",
      measure
    );

    return () => {

      observer.disconnect();

      window.removeEventListener(
        "resize",
        measure
      );

    };

  }, []);

  const timelineHeight =

    positions.length

      ? positions[positions.length - 1] + 120

      : EVENTS.length * 170;

  const firstMarker =

    positions.length

      ? positions[0]

      : 50;

  const lastMarker =

    positions.length

      ? positions[positions.length - 1]

      : 50;

  const flowerY =

    firstMarker +

    (lastMarker - firstMarker) *

    progress;

  const fillHeight = flowerY;

  const isMarkerActive = (index) => {

    if (!positions.length) return false;

    const markerProgress =

      index /

      (EVENTS.length - 1);

    return progress >= markerProgress;

  };
  return (
  <section
    className="journey"
    ref={sectionRef}
  >

    {/* Paper Background */}

    <img
      src="/images/decorations/paper.webp"
      className="paper-bg"
      alt=""
    />

    <div className="journey-container">

      {/* ===============================
          HEADING
      =============================== */}

      <motion.div
        className="journey-header"
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
          duration: .8,
        }}
      >

        <h2 className="journey-title">

          Schedule of Events

        </h2>

        <img
          src="/images/decorations/gold-divider.webp"
          className="journey-divider"
          alt=""
        />

      </motion.div>

      {/* ===============================
          TIMELINE
      =============================== */}

      <div
        ref={timelineRef}
        className="timeline-wrapper"
        style={{
          height: timelineHeight,
        }}
      >

        <div className="timeline-line" />

        <motion.div
          className="timeline-fill"
          animate={{
            height: fillHeight,
          }}
          transition={{
            duration: .08,
            ease: "linear",
          }}
        />

        <motion.img
          src="/images/decorations/timeline-rose.webp"
          className="timeline-rose"
          alt=""
          animate={{
            y: flowerY - 26,
          }}
          transition={{
            duration: .08,
            ease: "linear",
          }}
        />

        <div className="timeline-events">

          {EVENTS.map((event, index) => (

            <motion.div
              key={event.id}
              className="timeline-item"
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                amount: .4,
              }}
              transition={{
                duration: .6,
                delay: index * .15,
              }}
            >

              {/* LEFT */}

              <div className="event-time">

                {event.time}

              </div>

              {/* CENTER */}

              <div
                className="timeline-marker"
                ref={(el) =>
                  markerRefs.current[index] = el
                }
              >

                <div
                  className={`diamond ${
                    isMarkerActive(index)
                      ? "active"
                      : ""
                  }`}
                />

              </div>

              {/* RIGHT */}

              <div className="event-content">

                <h3 className="event-title">

                  {event.title}

                </h3>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </div>

    {/* Background Glow */}

    <div className="journey-bg-left" />

    <div className="journey-bg-right" />

  </section>
);

}