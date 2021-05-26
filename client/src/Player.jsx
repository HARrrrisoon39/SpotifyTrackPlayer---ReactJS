import React from "react";
import SpotifyPlayer from "./SpotifyPlayer";

function Player({ accessToken, uri }) {
  if (!accessToken) return null;
  return (
    <SpotifyPlayer
      accessToken={accessToken}
      uri={uri ? [uri] : ["spotify:track:0qOnSQQF0yzuPWsXrQ9paz"]}
    />
  );
}

export default Player;
