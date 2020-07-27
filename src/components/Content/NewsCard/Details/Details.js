import React from "react";

function timeSince(date) {
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years ago";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months ago";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days ago";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours ago";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes ago";
  }
  return Math.floor(seconds) + " seconds ago";
}

function Details({ url, author, timeStamp }) {
  return (
    <div className="newsCardMeta">
      {url ? (
        <a className="newsCardLink" href={url} target="_blank">
          {new URL(url).hostname}
        </a>
      ) : null}
      <div>
        <span className="newsCardSpecifics">by {author}</span>
        <span className="newsCardSpecifics">{timeSince(timeStamp * 1000)}</span>
        <button className="newCardHide">Hide</button>
      </div>
    </div>
  );
}

export default Details;
