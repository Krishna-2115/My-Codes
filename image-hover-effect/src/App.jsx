import React from "react";
import ImageHoverBox from "./components/ImageHoverBox";
import img1 from "./assets/img1.jpeg";
import img2 from "./assets/img2.jpeg";

const App = () => {
  return (
    <div className="min-h-screen flex flex-wrap justify-center items-center">
      <ImageHoverBox image={img1} />
      <ImageHoverBox image={img2} />
    </div>
  );
};

export default App;
