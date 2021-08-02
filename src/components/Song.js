import React from "react";

const Song = (a) => {
  return (

    <div className="song">
      <img className={a.isPlay} src={a.currentSong.cover} alt=""/>
      <h2>{a.currentSong.name}</h2>
      <h3>{a.currentSong.artist}</h3>
    </div>
  );
};

export default Song;
