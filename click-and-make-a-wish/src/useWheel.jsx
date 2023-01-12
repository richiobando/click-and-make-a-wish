// from https://github.com/SMAKSS/react-scroll-direction
import React, { useState, useEffect } from "react";

export default function useDetectScroll(props) {
  const {
    thr = 0,
    scrollUp =  "up" ,
    scrollDown =  "down" ,
    still = "still",
  } = props;
  // const [scrollDir, setScrollDir] = useState(still);
  const [wheelMoves, setWheelMoves] = useState({deltaX:0,
    deltaY:0});
  
  useEffect(() => {
    const threshold = thr > 0 ? thr : 0;
    let ticking = false;
    let lastScroll = undefined;

    window.addEventListener("wheel", (e) => {
      const x = e.deltaX
      const y = e.deltaY
      setWheelMoves({...wheelMoves,deltaX:x,
        deltaY:y})
      });
      // return () => window.removeEventListener("wheel", onScroll);
  }, [wheelMoves]);
  
  return [wheelMoves]
}
