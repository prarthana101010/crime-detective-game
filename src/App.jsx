import { useState } from "react";
import "./App.css";

const suspects = {
  alex: {
    name: "Alex Morgan",
    role: "Business Partner",
    initials: "AM",
  },
  sarah: {
    name: "Sarah Carter",
    role: "Victim's Wife",
    initials: "SC",
  },
  michael: {
    name: "Michael Reed",
    role: "Neighbor",
    initials: "MR",
  },
  david: {
    name: "David Wilson",
    role: "Employee",
    initials: "DW",
  },
};

const evidenceList = {
  phone: {
    name: "Victim's Phone",
    icon: "📱",
    text: "Daniel's last call was made at 10:45 PM and lasted 6 minutes.",
  },
  blood: {
    name: "Blood Pattern",
    icon: "🩸",
    text: "The blood pattern suggests that Daniel was attacked and moved.",
  },
  key: {
    name: "Brass Key",
    icon: "🔑",
    text: "A brass key was found underneath Daniel's desk.",
  },
  window: {
    name: "Window Marks",
    icon: "🪟",
    text: "Fresh marks were found around the window lock.",
  },
  document: {
    name: "Missing Document",
    icon: "📄",
    text: "An important business document is missing from the desk.",
  },
  body: {
    name: "Victim",
    icon: "👤",
    text: "Daniel was found beside his desk with signs of a struggle.",
  },
};

const questions = {
  alex: [
    ["Where were you at 10:30 PM?", "I was at home."],
    ["Did Daniel call you?", "Yes. He called me around 10:45 PM."],
    ["What did you discuss?", "Some business documents."],
  ],
  sarah: [
    ["When did you last see Daniel?", "Around 9:30 PM."],
    ["Did you hear anything?", "I heard a noise after 11 PM."],
    ["Did you enter the office?", "No, I stayed upstairs."],
  ],
  michael: [
    ["Did you see anything?", "I saw someone near Daniel's window."],
    ["When was this?", "A little after 11 PM."],
    ["Could you identify them?", "No, it was too dark."],
  ],
  david: [
    ["When did you leave?", "Before 7 PM."],
    ["Did you have access to the desk?", "Yes, sometimes."],
    ["Did you notice anything unusual?", "No."],
  ],
};

const correctConnections = [
  "phone-alex",
  "blood-alex",
  "document-alex",
];

function App() {
  const [screen, setScreen] = useState("menu");
  const [evidence, setEvidence] = useState([]);
  const [popup, setPopup] = useState(null);
  const [panel, setPanel] = useState(null);

  const [selectedSuspect, setSelectedSuspect] = useState(null);
  const [messages, setMessages] = useState([]);

  const [boardEvidence, setBoardEvidence] = useState(null);
  const [boardSuspect, setBoardSuspect] = useState(null);
  const [connections, setConnections] = useState([]);

  const [ending, setEnding] = useState(null);

  function collectEvidence(id) {
    if (!evidence.includes(id)) {
      setEvidence((old) => [...old, id]);
    }

    setPopup(id);
  }

  function openSuspect(id) {
    setSelectedSuspect(id);
    setMessages([]);
    setPanel("interrogation");
  }

  function askQuestion(question, answer) {
    setMessages((old) => [
      ...old,
      { who: "DETECTIVE", text: question },
      {
        who: suspects[selectedSuspect].name,
        text: answer,
      },
    ]);
  }

  function selectBoardEvidence(id) {
    setBoardEvidence(id);
  }

  function selectBoardSuspect(id) {
    setBoardSuspect(id);
  }

  function connectEvidence() {
    if (!boardEvidence || !boardSuspect) {
      return;
    }

    const connection = `${boardEvidence}-${boardSuspect}`;

    if (!connections.includes(connection)) {
      setConnections((old) => [...old, connection]);
    }

    setBoardEvidence(null);
    setBoardSuspect(null);
  }

  function makeAccusation(id) {
    const solved = correctConnections.every((item) =>
      connections.includes(item)
    );

    if (id === "alex" && solved) {
      setEnding("correct");
    } else {
      setEnding("wrong");
    }
  }

  function restart() {
    window.location.reload();
  }

  return (
    <div className="game">

      {/* MENU */}
      {screen === "menu" && (
        <section className="menu">
          <div className="menu-content">
            <span className="case-label">
              POLICE CASE FILE #047
            </span>

            <h1>THE LAST CALL</h1>

            <p className="subtitle">
              CRIME DETECTIVE MYSTERY
            </p>

            <p className="intro">
              One victim.
              <br />
              Four suspects.
              <br />
              One hidden truth.
            </p>

            <button
              className="gold-button"
              onClick={() => setScreen("briefing")}
            >
              START INVESTIGATION
            </button>
          </div>
        </section>
      )}

      {/* BRIEFING */}
      {screen === "briefing" && (
        <section className="briefing">
          <div className="briefing-card">
            <span className="case-label">
              CASE #047
            </span>

            <h1>THE LAST CALL</h1>

            <p>
              Daniel Carter, a businessman, has been found
              dead inside his private office.
            </p>

            <p>
              Four people are connected to the case.
              Your job is to find the truth.
            </p>

            <div className="facts">
              <div>
                <small>VICTIM</small>
                <strong>Daniel Carter</strong>
              </div>

              <div>
                <small>TIME</small>
                <strong>11:30 PM</strong>
              </div>

              <div>
                <small>SUSPECTS</small>
                <strong>4</strong>
              </div>
            </div>

            <p className="warning">
              ⚠ Not every statement can be trusted.
            </p>

            <button
              className="gold-button"
              onClick={() => setScreen("scene")}
            >
              ENTER CRIME SCENE
            </button>
          </div>
        </section>
      )}

      {/* CRIME SCENE */}
      {screen === "scene" && (
        <section className="scene">

          <header className="topbar">
            <div>
              <span className="case-label">
                CASE #047
              </span>

              <h2>DANIEL CARTER — CRIME SCENE</h2>
            </div>

            <div className="counter">
              EVIDENCE {evidence.length}/6
            </div>
          </header>

          <main className="room">

            <div className="window">
              🪟
            </div>

            <div className="painting">
              CARTER
            </div>

            <div className="sofa" />

            <div className="desk">
              <div className="desk-top" />
              <div className="desk-leg left" />
              <div className="desk-leg right" />
            </div>

            <button
              className="hotspot phone"
              onClick={() => collectEvidence("phone")}
            >
              📱
            </button>

            <button
              className="hotspot blood"
              onClick={() => collectEvidence("blood")}
            >
              🩸
            </button>

            <button
              className="hotspot key"
              onClick={() => collectEvidence("key")}
            >
              🔑
            </button>

            <button
              className="hotspot window-clue"
              onClick={() => collectEvidence("window")}
            >
              🔍
            </button>

            <button
              className="hotspot document"
              onClick={() => collectEvidence("document")}
            >
              📄
            </button>

            <button
              className="hotspot body"
              onClick={() => collectEvidence("body")}
            >
              👤
            </button>

          </main>

          {/* BOTTOM MENU */}
          <nav className="hud">

            <button onClick={() => setPanel("evidence")}>
              🔎
              <span>EVIDENCE</span>
            </button>

            <button onClick={() => setPanel("suspects")}>
              👥
              <span>SUSPECTS</span>
            </button>

            <button onClick={() => setPanel("board")}>
              🧩
              <span>CASE BOARD</span>
            </button>

            <button onClick={() => setPanel("report")}>
              📋
              <span>REPORT</span>
            </button>

          </nav>

          {/* EVIDENCE PANEL */}
          {panel === "evidence" && (
            <div className="overlay">
              <div className="panel">

                <button
                  className="close"
                  onClick={() => setPanel(null)}
                >
                  ×
                </button>

                <span className="case-label">
                  INVESTIGATION
                </span>

                <h2>COLLECTED EVIDENCE</h2>

                {evidence.length === 0 ? (
                  <p className="muted">
                    Search the crime scene first.
                  </p>
                ) : (
                  evidence.map((id) => (
                    <div
                      className="evidence-card"
                      key={id}
                    >
                      <div className="evidence-icon">
                        {evidenceList[id].icon}
                      </div>

                      <div>
                        <h3>
                          {evidenceList[id].name}
                        </h3>

                        <p>
                          {evidenceList[id].text}
                        </p>
                      </div>
                    </div>
                  ))
                )}

              </div>
            </div>
          )}

          {/* SUSPECTS */}
          {panel === "suspects" && (
            <div className="overlay">
              <div className="panel large">

                <button
                  className="close"
                  onClick={() => setPanel(null)}
                >
                  ×
                </button>

                <span className="case-label">
                  PERSONS OF INTEREST
                </span>

                <h2>SUSPECTS</h2>

                <div className="suspects">

                  {Object.entries(suspects).map(
                    ([id, suspect]) => (
                      <div
                        className="suspect"
                        key={id}
                      >

                        <div className="avatar">
                          {suspect.initials}
                        </div>

                        <h3>
                          {suspect.name}
                        </h3>

                        <p>
                          {suspect.role}
                        </p>

                        <button
                          className="dark-button"
                          onClick={() =>
                            openSuspect(id)
                          }
                        >
                          INTERROGATE
                        </button>

                      </div>
                    )
                  )}

                </div>

              </div>
            </div>
          )}

          {/* INTERROGATION */}
          {panel === "interrogation" &&
            selectedSuspect && (
              <div className="overlay">

                <div className="interrogation">

                  <div className="interrogation-header">
                    <span className="case-label">
                      INTERROGATION ROOM
                    </span>

                    <h2>
                      {suspects[selectedSuspect].name}
                    </h2>

                    <p>
                      {suspects[selectedSuspect].role}
                    </p>

                    <button
                      className="close"
                      onClick={() =>
                        setPanel("suspects")
                      }
                    >
                      ×
                    </button>
                  </div>

                  <div className="chat">

                    {messages.length === 0 && (
                      <div className="message suspect-message">
                        <b>
                          {suspects[
                            selectedSuspect
                          ].name.toUpperCase()}
                        </b>

                        <p>
                          What do you want to know?
                        </p>
                      </div>
                    )}

                    {messages.map((message, index) => (
                      <div
                        className={
                          message.who === "DETECTIVE"
                            ? "message detective-message"
                            : "message suspect-message"
                        }
                        key={index}
                      >
                        <b>{message.who}</b>
                        <p>{message.text}</p>
                      </div>
                    ))}

                  </div>

                  <div className="questions">

                    <h3>ASK QUESTIONS</h3>

                    {questions[selectedSuspect].map(
                      ([question, answer], index) => (
                        <button
                          key={index}
                          onClick={() =>
                            askQuestion(
                              question,
                              answer
                            )
                          }
                        >
                          {index + 1}. {question}
                        </button>
                      )
                    )}

                  </div>

                </div>

              </div>
            )}

          {/* CASE BOARD */}
          {panel === "board" && (
            <div className="overlay">

              <div className="panel large">

                <button
                  className="close"
                  onClick={() => setPanel(null)}
                >
                  ×
                </button>

                <span className="case-label">
                  INVESTIGATION BOARD
                </span>

                <h2>
                  CONNECT THE EVIDENCE
                </h2>

                <p className="muted">
                  Select one evidence and one suspect.
                </p>

                <h3>EVIDENCE</h3>

                <div className="board-grid">

                  {evidence.map((id) => (
                    <button
                      key={id}
                      className={
                        boardEvidence === id
                          ? "selected"
                          : ""
                      }
                      onClick={() =>
                        selectBoardEvidence(id)
                      }
                    >
                      {evidenceList[id].icon}{" "}
                      {evidenceList[id].name}
                    </button>
                  ))}

                </div>

                <h3>SUSPECT</h3>

                <div className="board-grid">

                  {Object.entries(suspects).map(
                    ([id, suspect]) => (
                      <button
                        key={id}
                        className={
                          boardSuspect === id
                            ? "selected"
                            : ""
                        }
                        onClick={() =>
                          selectBoardSuspect(id)
                        }
                      >
                        👤 {suspect.name}
                      </button>
                    )
                  )}

                </div>

                <div className="preview">

                  <span>
                    {boardEvidence
                      ? `${evidenceList[boardEvidence].icon} ${evidenceList[boardEvidence].name}`
                      : "Select evidence"}
                  </span>

                  <b>→</b>

                  <span>
                    {boardSuspect
                      ? `👤 ${suspects[boardSuspect].name}`
                      : "Select suspect"}
                  </span>

                </div>

                <button
                  className="gold-button connect"
                  disabled={
                    !boardEvidence ||
                    !boardSuspect
                  }
                  onClick={connectEvidence}
                >
                  CONNECT
                </button>

                <h3>YOUR CONNECTIONS</h3>

                {connections.length === 0 ? (
                  <p className="muted">
                    No connections yet.
                  </p>
                ) : (
                  connections.map(
                    (connection, index) => {
                      const parts =
                        connection.split("-");

                      const evidenceId = parts[0];
                      const suspectId = parts[1];

                      const correct =
                        correctConnections.includes(
                          connection
                        );

                      return (
                        <div
                          className={
                            correct
                              ? "connection correct"
                              : "connection"
                          }
                          key={index}
                        >
                          <span>
                            {evidenceList[
                              evidenceId
                            ].icon}{" "}
                            {evidenceList[
                              evidenceId
                            ].name}
                          </span>

                          <b>→</b>

                          <span>
                            👤{" "}
                            {suspects[
                              suspectId
                            ].name}
                          </span>

                          <strong>
                            {correct ? "✓" : "?"}
                          </strong>
                        </div>
                      );
                    }
                  )
                )}

                {connections.length >= 3 && (
                  <button
                    className="accuse"
                    onClick={() =>
                      setPanel("accusation")
                    }
                  >
                    MAKE FINAL ACCUSATION
                  </button>
                )}

              </div>

            </div>
          )}

          {/* REPORT */}
          {panel === "report" && (
            <div className="overlay">

              <div className="panel">

                <button
                  className="close"
                  onClick={() => setPanel(null)}
                >
                  ×
                </button>

                <span className="case-label">
                  CASE REPORT
                </span>

                <h2>INVESTIGATION STATUS</h2>

                <div className="report">
                  <span>
                    Evidence collected
                  </span>

                  <b>
                    {evidence.length}/6
                  </b>
                </div>

                <div className="report">
                  <span>
                    Evidence connections
                  </span>

                  <b>
                    {connections.length}
                  </b>
                </div>

                <h3>IMPORTANT CLUES</h3>

                <ul className="findings">
                  <li>
                    Daniel's final call was at 10:45 PM.
                  </li>

                  <li>
                    The victim was probably moved.
                  </li>

                  <li>
                    An important business document is missing.
                  </li>

                  <li>
                    Fresh marks were found on the window.
                  </li>
                </ul>

              </div>

            </div>
          )}

          {/* EVIDENCE POPUP */}
          {popup && (
            <div className="popup">

              <div className="popup-card">

                <span className="case-label">
                  EVIDENCE FOUND
                </span>

                <div className="big-icon">
                  {evidenceList[popup].icon}
                </div>

                <h2>
                  {evidenceList[popup].name}
                </h2>

                <p>
                  {evidenceList[popup].text}
                </p>

                <button
                  className="gold-button"
                  onClick={() => setPopup(null)}
                >
                  CONTINUE
                </button>

              </div>

            </div>
          )}

          {/* FINAL ACCUSATION */}
          {panel === "accusation" && (
            <div className="overlay">

              <div className="panel large">

                <button
                  className="close"
                  onClick={() =>
                    setPanel("board")
                  }
                >
                  ×
                </button>

                <span className="case-label">
                  FINAL DECISION
                </span>

                <h2>
                  WHO KILLED DANIEL?
                </h2>

                <p className="muted">
                  Choose the suspect you believe
                  committed the crime.
                </p>

                <div className="accusation-grid">

                  {Object.entries(suspects).map(
                    ([id, suspect]) => (
                      <button
                        key={id}
                        onClick={() =>
                          makeAccusation(id)
                        }
                      >
                        <div className="avatar">
                          {suspect.initials}
                        </div>

                        <strong>
                          {suspect.name}
                        </strong>

                        <span>
                          {suspect.role}
                        </span>
                      </button>
                    )
                  )}

                </div>

              </div>

            </div>
          )}

          {/* ENDING */}
          {ending && (
            <div className="ending">

              <div className="ending-card">

                {ending === "correct" ? (
                  <>
                    <span className="case-label">
                      CASE SOLVED
                    </span>

                    <div className="result-icon">
                      ✓
                    </div>

                    <h2>
                      ALEX MORGAN
                    </h2>

                    <p>
                      You correctly identified
                      Alex Morgan as the killer.
                    </p>

                    <div className="truth">
                      <h3>THE EVIDENCE</h3>

                      <p>
                        📱 Phone records connect Alex
                        to Daniel shortly before the murder.
                      </p>

                      <p>
                        🩸 The blood pattern suggests
                        the body was moved.
                      </p>

                      <p>
                        📄 The missing business document
                        provides a motive.
                      </p>

                      <strong>
                        INVESTIGATION RESULT: CORRECT
                      </strong>
                    </div>
                  </>
                ) : (
                  <>
                    <span className="case-label">
                      CASE UNSOLVED
                    </span>

                    <div className="result-icon">
                      ×
                    </div>

                    <h2>
                      WRONG ACCUSATION
                    </h2>

                    <p>
                      Your evidence does not support
                      this suspect as the killer.
                    </p>

                    <div className="truth">
                      <h3>
                        INVESTIGATION FAILED
                      </h3>

                      <p>
                        Re-examine the evidence and
                        connect the important clues.
                      </p>
                    </div>
                  </>
                )}

                <button
                  className="gold-button"
                  onClick={restart}
                >
                  PLAY AGAIN
                </button>

              </div>

            </div>
          )}

        </section>
      )}

    </div>
  );
}

export default App;
