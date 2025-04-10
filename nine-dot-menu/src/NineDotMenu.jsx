import React, { useState, useMemo, useEffect } from "react";
import {
  IoCameraOutline,
  IoDiamondOutline,
  IoChatbubbleOutline,
  IoAlarmOutline,
  IoGameControllerOutline,
  IoMoonOutline,
  IoWaterOutline,
  IoTimeOutline,
  IoCloseOutline,
} from "react-icons/io5";

const NineDotMenu = () => {
  const [active, setActive] = useState(false);
  const [showIcons, setShowIcons] = useState(false);

  useEffect(() => {
    let timeout;
    if (active) {
      timeout = setTimeout(() => setShowIcons(true), 500);
    } else {
      setShowIcons(false);
    }
    return () => clearTimeout(timeout);
  }, [active]);

  const iconItems = useMemo(
    () => [
      { icon: <IoCameraOutline />, x: -1, y: 0 },
      { icon: <IoDiamondOutline />, x: 1, y: 0 },
      { icon: <IoChatbubbleOutline />, x: 0, y: -1 },
      { icon: <IoAlarmOutline />, x: 0, y: 1 },
      { icon: <IoGameControllerOutline />, x: -1, y: 1 },
      { icon: <IoMoonOutline />, x: -1, y: -1 },
      { icon: <IoWaterOutline />, x: 1, y: -1 },
      { icon: <IoTimeOutline />, x: 1, y: 1 },
    ],
    []
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#262433]">
      <div className="relative w-[170px] h-[170px] flex items-center justify-center">
        {/* Expanding Icon Dots */}
        <div
          className="relative w-10 h-10 flex items-center justify-center cursor-pointer transition-all duration-500 z-10"
          onClick={() => setActive(true)}
        >
          {iconItems.map((item, i) => (
            <span
              key={i}
              style={{
                transform: active
                  ? `translate(${60 * item.x}px, ${60 * item.y}px)`
                  : `translate(${14 * item.x}px, ${14 * item.y}px)`,
                transitionDelay: `${0.1 * i}s`,
              }}
              className={`absolute flex items-center justify-center 
                transition-all duration-500
                ${active ? "w-[45px] h-[45px] bg-[#37384f]" : "w-[7px] h-[7px] bg-white"}`}
            >
              <i
                className={`transition-all duration-300 text-white ${
                  showIcons ? "text-[1.35em]" : "text-[0em]"
                } hover:text-[#22d3ee] hover:drop-shadow-[0_0_2px_#22d3ee] hover:drop-shadow-[0_0_5px_#22d3ee] hover:drop-shadow-[0_0_15px_#22d3ee]`}
              >
                {item.icon}
              </i>
            </span>
          ))}
        </div>

        {/* Close Button - Fix z-index and position */}
        <div
          onClick={() => setActive(false)}
          className={`absolute flex items-center justify-center transition-all duration-500 z-20 ${
            active
              ? "w-10 h-10 bg-[#22d3ee] pointer-events-auto delay-[800ms]"
              : "w-[7px] h-[7px] bg-white pointer-events-none delay-[400ms]"
          }`}
        >
          <IoCloseOutline
            className={`text-[#10131c] transition-all duration-500 ${
              active ? "scale-100 delay-[1000ms] text-[2em]" : "scale-0"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default NineDotMenu;
