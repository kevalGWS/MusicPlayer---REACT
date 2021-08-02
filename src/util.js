export const playAudio = (a) => {
    if (a.isPlay) {
      const playPromise = a.audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then((audio) => {
            a.audioRef.current.play();
          })
          .catch((error) => console.log(error));
      }
    }
  };
  