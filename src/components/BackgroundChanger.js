import React, { useState, useEffect } from "react";

const BackgroundChanger = () => {
  const backgrounds = [
    'url("https://w.forfun.com/fetch/97/97b9db667f6a8076c3fe43a263a27019.jpeg")',
    'url("https://i.pinimg.com/736x/ff/1d/bc/ff1dbca0bffa8d885ebfb891f1827965.jpg")',
  ];

  const largerScreenBackgrounds = [
    'url("https://images8.alphacoders.com/453/453945.jpg")',
    'url("https://wallpapercave.com/wp/wp2887696.jpg")',
  ];

  const [backgroundImage, setBackgroundImage] = useState(
    backgrounds[Math.floor(Math.random() * backgrounds.length)]
  );

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * backgrounds.length);
    setBackgroundImage(backgrounds[randomIndex]); // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const largerScreenQuery = window.matchMedia("(min-width: 1201px)");
    const handleScreenChange = (event) => {
      if (event.matches) {
        const randomIndex = Math.floor(
          Math.random() * largerScreenBackgrounds.length
        );
        setBackgroundImage(largerScreenBackgrounds[randomIndex]);
      }
    };

    largerScreenQuery.addListener(handleScreenChange);
    handleScreenChange(largerScreenQuery);

    return () => {
      largerScreenQuery.removeListener(handleScreenChange);
    }; // eslint-disable-next-line
  }, []);

  return (
    <>
      <style>
        {`
          #background-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            background-size: cover;
            background-position: center; /* Adjust as needed */
            background-image: ${backgroundImage};
            background-color: rgba(255, 255, 255, 0.2); /* Adjust the color and opacity */
            backdrop-filter: blur(0.5px); /* Adjust the blur radius as needed */
            pointer-events: none;
          }
        `}
      </style>
      <div id="background-container"></div>
    </>
  );
};

export default BackgroundChanger;
