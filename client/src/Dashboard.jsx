import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import Song from "./Song";
import Player from "./Player";
import { Box } from "@material-ui/core";
import "./player.css";

const spotifyApi = new SpotifyWebApi({
  clientId: `${process.env.REACT_APP_CLIENT_ID}`,
});

export default function Dashboard({ code }) {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();

  function chooseTrack(track) {
    setPlayingTrack(track);
    // setSearch("");
  }

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return console.log("no access");

    // console.log(searchResults);

    // let finish = false;
    spotifyApi.searchTracks(search).then((res) => {
      // if (finish) return;
      // console.log(res.body.tracks.items);
      setSearchResults(
        res.body.tracks.items.map((track) => {
          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            images: track.album.images[2].url,
          };
        })
      );
    });

    // return () => (finish = true);
  }, [accessToken, search]);

  return (
    <div className="playerbackground">
      <Container
        className="d-flex flex-column py-2"
        style={{ height: "100vh" }}
      >
        <Box boxShadow={3} style={{ borderRadius: "300px" }}>
          <Form.Control
            type="search"
            placeholder="Search Songs/Artists"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ borderRadius: "300px" }}
          />
        </Box>
        <div id="parent">
          <div
            id="child"
            className="flex-grow-1 my-2"
            style={{
              backgroundColor: "black",
            }}
          >
            {searchResults.map((tracks) => (
              <Song
                tracks={tracks}
                key={tracks.uri}
                chooseTrack={chooseTrack}
                accessToken={accessToken}
              />
            ))}
          </div>
        </div>
        <div>
          <Player accessToken={accessToken} uri={playingTrack?.uri} />
        </div>
      </Container>
    </div>
  );
}
