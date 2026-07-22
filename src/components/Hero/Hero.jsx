import "./Hero.css";

import Background from "./Background";
import LightRays from "./LightRays";
import Particles from "./Particles";
import Leaves from "./Leaves";
import Water from "./Water";
import Names from "./Names";
import Scroll from "./Scroll";

// Sections

import Story from "../Story/Story";
import Countdown from "../Countdown/Countdown";
import ScratchCard from "../ScratchCard/ScratchCard";
import Journey from "../Journey/Journey";
import Venue from "../Venue/Venue";
import Dress from "../Dress/Dress";
import RSVP from "../RSVP/RSVP";

export default function Hero() {
  return (
    <>
      {/* ================= HERO ================= */}

      <section className="hero">

        <Background />

        <LightRays />

        <Particles />

        <Leaves />

        <Water />

        <Names />

        <Scroll />

      </section>

      {/* ================= STORY ================= */}

      <Story />

      <Countdown />
      
      <ScratchCard />
      
      {/* ================= JOURNEY ================= */}

      <Journey />

      <Venue />
      <Dress />
      <RSVP />

    </>
  );
}