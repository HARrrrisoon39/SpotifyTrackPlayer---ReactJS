import React, { useEffect } from "react";
import { Box, Card } from "@material-ui/core";
import "./player.css";

function SpotifyPlayer({ uri, player, accessToken }) {
  if (!uri) return null;

  return (
    <>
      <Box boxShadow={3}>
        <Card style={{ paddingBottom: "20px", borderRadius: "3px" }}>
          <div className="holder">
            <iframe
              id="iframeResult"
              className="frame"
              title="Spotify"
              src={`https://open.spotify.com/embed/?uri=${uri}`}
              allow="autoplay; encrypted-media"
              width="100%"
              height="72"
              frameBorder="10"
            />

            <Card className="bar"></Card>
          </div>
        </Card>
      </Box>
    </>
  );
}

export default SpotifyPlayer;
