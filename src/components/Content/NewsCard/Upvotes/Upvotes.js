import React from "react";

function Upvotes({ count, voteUp, id, userUpVotes }) {
  console.log(userUpVotes);
  return (
    <>
      <div className="newsMetric newsMetric--button newMetrix--votes">
        <div
          onClick={() => voteUp(id)}
          style={userUpVotes > 0 ? { color: "#5bd95b" } : null}
        >
          &#9650;
        </div>
        <div>{count + userUpVotes}</div>
      </div>
    </>
  );
}

export default Upvotes;
