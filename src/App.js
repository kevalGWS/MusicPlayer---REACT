import React, { useState, useRef } from "react";
import "./styles/app.scss";

//Import Components
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import Nav from "./components/Nav";

//Import data
import SonuKeSurile from "./data";

//Util class
import { playAudio } from "./util";

//hello



function App() {

   //use Ref
  const audioRef = useRef(null);
  
  //states
  const [songs, setSongs] = useState(SonuKeSurile());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlay, setIsPlay] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animPercnt: 0,
    volume: 0,
  });
  const [libStatus, setLibStatus] = useState(false); 

  
  
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;

    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const percentage = Math.round((roundedCurrent / roundedDuration) * 100);
    setSongInfo({...songInfo,currentTime: current,duration: duration,animPercnt: percentage,volume: e.target.volume,});
  };
  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    if (isPlay) audioRef.current.play();
  };

  return (
    <div className={`App ${libStatus ? "library-active" : ""}`}>
      <Nav libStatus={libStatus} setLibStatus={setLibStatus} />
      <Song isPlay={isPlay} currentSong={currentSong} />
      <Player audioRef={audioRef} setIsPlay={setIsPlay} currentSong={currentSong} isPlay={isPlay} songInfo={songInfo} setSongInfo={setSongInfo} songs={songs} setSongs={setSongs} setCurrentSong={setCurrentSong}/>
      <Library songs={songs} setCurrentSong={setCurrentSong} audioRef={audioRef} isPlay={isPlay} setSongs={setSongs} libStatus={libStatus}/>
      <audio onLoadedMetadata={timeUpdateHandler} onTimeUpdate={timeUpdateHandler} ref={audioRef} src={currentSong.audio} onEnded={songEndHandler}></audio>
    </div>

  );
}

export default App;
