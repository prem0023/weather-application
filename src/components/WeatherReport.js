import React, { useContext, useEffect, useRef, useState } from "react";
import arrow from "../utils/arrow.jpg";
import { Link } from "react-router-dom";
import LocationContext from "./LocationContext";
import gps from "../utils/location.png";
import feels from "../utils/feels-like.png";
import droplet from "../utils/droplet.jpg";
import mist from "../utils/mist.png";
import clear from "../utils/clear.png";
import clouds from "../utils/clouds.png";
import drizzle from "../utils/drizzle.png";
import rain from "../utils/rain.png";
import snow from "../utils/snow.png";
import wind from "../utils/wind.png";

const WheatherReport = () => {
  const { place, setPlace } = useContext(LocationContext);
  const { location, setLocation } = useContext(LocationContext);
  const [weatherData, setWeatherData] = useState([]);

  const imageRef = useRef(mist);

  useEffect(() => {
    getWeatherReport();
    currentCity();
  }, [location.lat, location.lon]);

  const getWeatherReport = async () => {
    const data = await fetch(
      `https://openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lon}&units=metric&appid=439d4b804bc8187953eb36d2a8c26a02`
    );
    const json = await data.json();
    setWeatherData(json);
  };

  const currentCity = async () => {
    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=30d4590538591f84f57db7e84220e6e4`
    );
    data.json().then((data) => {
      setPlace([data?.name, data?.sys.country]);
    });
  };

  const changeImageSrc = () => {
    if (
      weatherData?.current?.weather[0]?.main.toLowerCase() == "mist" ||
      weatherData?.current?.weather[0]?.main.toLowerCase() == "haze"
    ) {
      imageRef.current.src = mist;
    } else if (
      weatherData?.current?.weather[0]?.main.toLowerCase() == "clear"
    ) {
      imageRef.current.src = clear;
    } else if (
      weatherData?.current?.weather[0]?.main.toLowerCase() == "clouds"
    ) {
      imageRef.current.src = clouds;
    } else if (
      weatherData?.current?.weather[0]?.main.toLowerCase() == "drizzle"
    ) {
      imageRef.current.src = drizzle;
    } else if (weatherData?.current?.weather[0]?.main.toLowerCase() == "rain") {
      imageRef.current.src = rain;
    } else if (weatherData?.current?.weather[0]?.main.toLowerCase() == "snow") {
      imageRef.current.src = snow;
    } else if (weatherData?.current?.weather[0]?.main.toLowerCase() == "wind") {
      imageRef.current.src = wind;
    }
  };
  changeImageSrc();

  return (
    <div className="bg-white w-80 border rounded-md">
      <div className=" px-5 flex border-b items-center border-b-gray-300">
        <Link to={"/"}>
          <img className="h-5 items-center" src={arrow} alt="back" />{" "}
        </Link>
        <div className="mx-5 py-2 text-sky-400 font-bold text-xl">
          Weather App
        </div>
      </div>

      <div className="flex flex-col items-center">
        <img className="w-32" ref={imageRef} src="" alt="icon" />
        <div className="font-bold text-5xl my-3">
          {Math.round(weatherData?.current?.temp)}° C
        </div>
        <div className="">{weatherData?.current?.weather[0]?.main}</div>
        <div className="flex items-center gap-1">
          <img className="h-4" src={gps} />
          <div className="my-2"> {place.join(", ")}</div>
        </div>

        <div className="flex w-full border-t border-t-gray-300 px-5">
          <div className="w-1/2 border-r flex py-2 items-center border-gray-300">
            <img className=" h-8" src={feels} />
            <div className="">
              <div className="text-xs">
                {weatherData?.current?.feels_like} ° C
              </div>
              <div className="text-xs">Feels Like</div>
            </div>
          </div>
          <div className="w-1/2 border-l flex py-2 justify-center items-center border-gray-300">
            <img className=" h-8" src={droplet} />
            <div className="">
              <div className="text-xs">{weatherData?.current?.humidity}%</div>
              <div className="text-xs">Humidity</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WheatherReport;
