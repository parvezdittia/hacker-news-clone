import React from "react";

function Navigation({ navigate, page }) {
  return (
    <section className="navButtonsContainer">
      {page >= 1 ? (
        <button
          className="navButtons navButtons--border"
          onClick={() => navigate("previous")}
        >
          Previous
        </button>
      ) : null}

      <button className="navButtons" onClick={() => navigate("next")}>
        Next
      </button>
    </section>
  );
}

export default Navigation;
