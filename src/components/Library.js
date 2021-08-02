import React from "react";

import LibSong from "./LibSong";

const Library = (a) => {
  return (
    <div className={`library ${a.libStatus ? "active-library" : " "}`}>
      <h2>Library</h2>
      <div className="library-songs">
        {a.songs.map((song) => (
          <LibSong song={song} songs={a.songs} cover={song.cover} name={song.name} artist={song.artist} active={song.active} key={song.id} id={song.id} setCurrentSong={a.setCurrentSong} audioRef={a.audioRef} isPlay={a.isPlay} setSongs={a.setSongs}/>
        ))}
      </div>
    </div>
  );
};

export default Library;
