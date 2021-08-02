import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlayCircle,faForward,faBackward,faPauseCircle,faVolumeDown,} from "@fortawesome/free-solid-svg-icons";

import { playAudio } from "../util";

const Player = (a) => {
  
  
  //UseEffect Update List
  useEffect(()=> {
      //add active song
    const newSongs = a.songs.map((song) => {
        if (song.id === a.currentSong.id) {
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
  },[a.currentSong]);
    

  const trackAnim = {
    transform: `translateX(${a.songInfo.animPercnt}%)`,
  };
  //Event Handlers
  function getTime(time) {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  }
  const dragHandler = (e) => {
    a.audioRef.current.currentTime = e.target.value; //to update the current time in audio tag
    a.setSongInfo({ ...a.songInfo, currentTime: e.target.value });
  };

  const playSongHandler = () => {
    if (a.isPlay) {
      a.audioRef.current.pause();
      a.setIsPlay(!a.isPlay);
    } else {
      a.audioRef.current.play();
      a.setIsPlay(!a.isPlay);
    }
  };
  const skipTrackHandler = async (direction) => {
    let currentIndex = a.songs.findIndex((song) => song.id === a.currentSong.id);

    //Forward BAck
    if (direction === "skip-forward") {
      await a.setCurrentSong(a.songs[(currentIndex + 1) % a.songs.length]);
    }else if (direction === "skip-back") {
      if ((currentIndex - 1) === -1) {
        await a.setCurrentSong(a.songs[a.songs.length - 1]);
      }else {
        await a.setCurrentSong(a.songs[currentIndex - 1]);
      }
    }
    if (a.isPlay) a.audioRef.current.play();
  };
  
  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(a.songInfo.currentTime)}</p>
        <div style={{background: `linear-gradient(to right, ${a.currentSong.color[0]},${a.currentSong.color[1]})`,}} className="track" >
          <input value={a.songInfo.currentTime} type="range" max={a.songInfo.duration || 0} min={0} onChange={dragHandler}/>
          <div style={trackAnim} className="animate-track"></div>
        </div>
        <p>{a.songInfo.duration ? getTime(a.songInfo.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon onClick={() => skipTrackHandler("skip-back")} className="skip-back" size="2x" icon={faBackward}/>
        <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={a.isPlay ? faPauseCircle : faPlayCircle}/>
        <FontAwesomeIcon onClick={() => skipTrackHandler("skip-forward")} className="skip-forward" size="2x" icon={faForward}/>
        
      </div>
    </div>
  );
};

export default Player;
