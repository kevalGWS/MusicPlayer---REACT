import React from "react";

const LibSong = (a) => {
  const songSelectHandler =async () => {
    
    //const selectedSong = a.songs.filter((s) => s.id === a.id);
    
    await a.setCurrentSong(a.song); //add active state
    
    
    //Set Active in library
    const newSongs = a.songs.map((song) => {
      if (song.id === a.id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    a.setSongs(newSongs);

    //Play audio
    if (a.isPlay) a.audioRef.current.play();
  };
  return (
    <div onClick={songSelectHandler} className={`library-song ${a.active ? "selected" : ""}`}>
      <img src={a.cover} alt="" />
      <div className="song-description">
        <h3>{a.name}</h3>
        <h4>{a.artist}</h4>
      </div>
    </div>
  );
};

export default LibSong;
