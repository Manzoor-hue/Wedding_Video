import "./Story.css";
import { useState } from "react";

export default function Story() {

  const [flip, setFlip] = useState(false);

  return (

    <section className="story">

      <div className="storyContainer">

        <h2>Our Story</h2>

        <img
          src="/images/decorations/gold-divider.webp"
          className="divider"
          alt=""
        />

        <div
          className={`photoFrame ${flip ? "flip" : ""}`}
          onClick={() => setFlip(!flip)}
        >

          <div className="flipCard">

            {/* Front */}

            <div className="front">

              <img
                src="/images/couple/couple.webp"
                className="storyPhoto"
                alt="Couple"
              />

            </div>

            {/* Back */}

            <div className="back">

              <img
                src="/images/couple/Bridal.webp"
                className="storyPhoto"
                alt="Bride"
              />

            </div>

          </div>

        </div>

        <p className="quote">

          “Every love story is beautiful,
          but ours is our favorite.”

        </p>

        <p className="storyText">

          From childhood memories to becoming
          life partners, Allah سبحانه وتعالى
          beautifully wrote our story long
          before we understood it.

          <br /><br />

          With the blessings of our parents
          and families, we begin this new
          journey together.

        </p>

      </div>

    </section>

  );

}