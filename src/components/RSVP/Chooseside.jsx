import "./Chooseside.css";

import { motion, AnimatePresence } from "framer-motion";

export default function ChooseSide({

  open,

  onClose,

  onSelect,

}) {

  if (!open) return null;

  return (

    <AnimatePresence>

      <motion.div

        className="choose-overlay"

        initial={{ opacity: 0 }}

        animate={{ opacity: 1 }}

        exit={{ opacity: 0 }}

        transition={{ duration: .3 }}

      >

        <motion.div

          className="choose-card"

          initial={{
            opacity: 0,
            y: 40,
            scale: .95,
          }}

          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}

          exit={{
            opacity: 0,
            y: 30,
            scale: .95,
          }}

          transition={{
            duration: .45,
            ease: "easeOut",
          }}

        >

          {/* Close */}

          <button

            className="choose-close"

            onClick={onClose}

          >

            ✕

          </button>

          {/* Heading */}

          <h2>

            RSVP

          </h2>

          <img

            src="/images/decorations/gold-divider.webp"

            className="choose-divider"

            alt=""

          />

          <p className="choose-subtitle">

            Before we begin,

            <br />

            choose your side.

          </p>
                    <div className="choose-options">

            {/* Bride Card */}

            <motion.button

              type="button"

              className="side-card"

              whileHover={{
                y: -8,
                scale: 1.03,
              }}

              whileTap={{
                scale: .97,
              }}

              transition={{
                duration: .25,
              }}

              onClick={() => onSelect("Bride")}

            >

              <div className="side-glow"></div>

              <h3>

                Aysha's side

              </h3>

              <span>

                Celebrate with Aysha's Family

              </span>

            </motion.button>



<div className="side-divider">

    <img
        src="/images/decorations/gold-divider.webp"
        alt=""
    />

</div>



            {/* Groom Card */}

            <motion.button

              type="button"

              className="side-card"

              whileHover={{
                y: -8,
                scale: 1.03,
              }}

              whileTap={{
                scale: .97,
              }}

              transition={{
                duration: .25,
              }}

              onClick={() => onSelect("Groom")}

            >

              <div className="side-glow"></div>

              <h3>

                Imran's Side

              </h3>

              <span>

                Celebrate with the Imran's Family

              </span>

            </motion.button>

          </div>
                    <motion.p
            className="choose-note"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.35,
              duration: 0.4,
            }}
          >
            Your selection will only be used to direct your RSVP
            to the appropriate family.
          </motion.p>

        </motion.div>

      </motion.div>

    </AnimatePresence>

  );

}