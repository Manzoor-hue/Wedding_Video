import "./Welcome.css";

export default function Welcome({ onOpen }) {
  return (
    <section className="welcome">

      <div className="overlay"></div>

      <div className="content">

        <h3 className="bismillah">
          ﷽
        </h3>

        <h1>
          Aysha
          <span>&</span>
          Imran
        </h1>

        <p>
          Wedding Invitation
        </p>

        <button onClick={onOpen}>
          OPEN INVITATION
        </button>

      </div>

    </section>
  );
}