import React from "react";
import $ from "jquery";

export default function Song({ tracks, chooseTrack, accessToken }) {
  function handlePlay() {
    chooseTrack(tracks);

    let doc = document.getElementById("iframeResult");
    let doc2 = doc.contentWindow;

    console.log(doc2);
  }

  return (
    <div
      className="d-flex m-2 align-items-center"
      style={{ cursor: "pointer" }}
      onClick={handlePlay}
    >
      <img
        src={tracks.images}
        style={{ height: "64px", width: "64px" }}
        alt="track"
      />
      <div className="ml-3">
        <div style={{ color: "white" }}>{tracks.title}</div>
        <div className="text-muted" style={{ color: "white" }}>
          {tracks.artist}
        </div>
      </div>
    </div>
  );
}
