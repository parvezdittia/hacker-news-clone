import React from "react";

function Upvotes({ count, voteUp, id }) {
  return (
    <>
      <div className="newsMetric newsMetric--button newMetrix--votes">
        <div onClick={() => voteUp(id)}>&#9650;</div>
        <div>{count}</div>
      </div>
    </>
  );
}

export default Upvotes;
