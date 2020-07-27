import React from "react";

function Navigation(props) {
  return (
    <section className="navButtonsContainer">
      <button
        className="navButtons navButtons--border"
        onClick={() => props.navigate("previous")}
      >
        Previous
      </button>
      <button className="navButtons" onClick={() => props.navigate("next")}>
        Next
      </button>
    </section>
  );
}

export default Navigation;
