import React from "react";

function Navigation(props) {
  return (
    <section>
      <button onClick={() => props.navigate("previous")}>Previous</button>
      <button onClick={() => props.navigate("next")}>Next</button>
    </section>
  );
}

export default Navigation;
