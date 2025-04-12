import React from "react";
import "./ImageHoverBox.css";

const ImageHoverBox = ({ image }) => {
  return (
    <div className="relative w-[310px] h-[550px] m-12 cursor-pointer group overflow-hidden">
      {/* Synchronized white bar */}
      <div className="barSlide absolute left-0 w-full h-[6px] bg-white z-50" />

      {/* Grayscale base image */}
      <div className="absolute top-0 left-0 w-full h-full grayscale contrast-[8]">
        <img
          src={image}
          alt="Grayscale"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Reveal color image */}
      <div className="imgReveal absolute top-0 left-0 w-full h-full">
        <img
          src={image}
          alt="Color"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default ImageHoverBox;
