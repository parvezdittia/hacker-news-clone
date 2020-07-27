import React from "react";

function Upvotes({ count }) {
  return (
    <>
      <div className="newsMetric newsMetric--button">
        <div>&#9650;</div>
        <div>{count}</div>
      </div>
    </>
  );
}

export default Upvotes;
