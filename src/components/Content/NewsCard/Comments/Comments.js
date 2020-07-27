import React from "react";

function Comments({ count }) {
  return (
    <div className="newsMetric newsMetric--comments">
      <div className="newsMetric--icon">&#128488;&#65039;</div>
      <div className="newsMetric--commentCount">{count}</div>
    </div>
  );
}

export default Comments;
