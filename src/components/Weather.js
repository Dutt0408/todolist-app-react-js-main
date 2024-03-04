import React, { useState, useEffect } from "react";
import "./weather.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faTimes } from "@fortawesome/free-solid-svg-icons";

export const Weather = () => {
  const [weather, setWeather] = useState({
    temperature: "8",
    city: "Toronto...",
    weatherMain: "clear",
    windspeed: "2",
  });

  const [showContainer, setShowContainer] = useState(true);

  const fetchWeather = async (latitude, longitude) => {
    const apiKey = "94a3fb7ccb30a0fbe7f24b818bf27bf9";
    const apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    try {
      const response = await fetch(apiEndpoint);
      const data = await response.json();
      console.log("API response:", data);

      const temperatureKelvin = data.main && data.main.temp;
      const city = data.name;
      const timezoneSeconds = data.timezone;
      const windspeed = data.wind && data.wind.speed;
      const weatherInfo = data.weather && data.weather[0];

      if (
        temperatureKelvin !== undefined &&
        city !== undefined &&
        timezoneSeconds !== undefined
      ) {
        const temperatureCelsius = temperatureKelvin - 273.15;
        const timezoneHours = timezoneSeconds / 3600;
        setWeather({
          temperature: temperatureCelsius.toFixed(0),
          city,
          timezone: timezoneHours,
          weatherMain: weatherInfo.main,
          windspeed,
        });
      } else {
        console.error(
          "Temperature, city, or timezone data not found in API response:",
          data
        );
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const getBackgroundImage = () => {
    const sunnyBackground = "https://wallpapercave.com/wp/wp5303385.jpg";
    const cloudyBackground = "https://i.redd.it/nxjb812vd3kb1.jpg";
    const clearBackground =
      "https://upload.wikimedia.org/wikipedia/commons/2/26/Sunny_day_in_India.jpg";
    const RainyBackground =
      "https://images.unsplash.com/photo-1620385019253-b051a26048ce?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHJhaW58ZW58MHx8MHx8fDA%3D";
    const DefaultBackground =
      "https://upload.wikimedia.org/wikipedia/commons/2/26/Sunny_day_in_India.jpg";

    switch (weather.weatherMain) {
      case "Sunny":
        return sunnyBackground;
      case "Clouds":
        return cloudyBackground;
      case "Clear":
        return clearBackground;
      case "Rain":
        return RainyBackground;
      default:
        return DefaultBackground;
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(latitude, longitude);
        },
        (error) => {
          console.error("Error getting current location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getCurrentLocation();
    // eslint-disable-next-line
  }, []);

  const closeContainer = () => {
    setShowContainer(false);
  };

  const showContainerCondition = window.innerWidth > 800;

  return (
    <div
      className={`cloudcomponent ${
        showContainer && showContainerCondition ? "visible" : "hidden"
      }`}
    >
      {showContainer && showContainerCondition && (
        <div
          className="weather-bg"
          style={{ backgroundImage: `url(${getBackgroundImage()})` }}
        >
          <div className="weather">
            <div className="weather-texts">
              <p style={{ color: "white", fontWeight: "bold" }}>
                <FontAwesomeIcon
                  icon={faLocationDot}
                  style={{ color: "#e1e0e0" }}
                />{" "}
                {weather.city}
              </p>
              <p>
                {" "}
                <strong
                  style={{
                    fontWeight: "bolder",
                    fontSize: "1.8em",
                    color: "white",
                  }}
                >
                  {weather.temperature} °{" "}
                </strong>{" "}
              </p>
              <p style={{ color: "orange", fontWeight: "bold" }}>
                {weather.weatherMain}
              </p>
              <p
                style={{
                  color: "white",
                  fontWeight: "bold",
                  marginTop: "0.5em",
                }}
              >
                W: {weather.windspeed} m/s
              </p>
            </div>
          </div>
          <button
            className="close-button"
            onClick={closeContainer}
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.598)",
              border: "none",
            }}
          >
            <FontAwesomeIcon
              icon={faTimes}
              style={{ color: "red", fontWeight: "bold", fontSize: "20px" }}
            />
          </button>
        </div>
      )}
    </div>
  );
};
