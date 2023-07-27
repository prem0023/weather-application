import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LocationContext from "./LocationContext";

const City = () => {
  const [city, setCity] = useState();
  const [findCity, setFindCity] = useState([]);
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();

  const { location, setLocation } = useContext(LocationContext);
  const { place, setPlace } = useContext(LocationContext);

  useEffect(() => {
    const timeId = setTimeout(() => {
      if (city != undefined) {
        getCity();
      }
    }, 300);
    return () => clearTimeout(timeId);
  }, [city]);

  const getCity = async () => {
    const data = await fetch(
      `https://openweathermap.org/data/2.5/find?q=${city}&appid=439d4b804bc8187953eb36d2a8c26a02&units=metric`
    );
    const json = await data.json();
    if (json?.list && json.list.length > 0) {
      setFindCity([json.list[0]?.name, json.list[0]?.sys?.country]);
      setLat(json.list[0]?.coord?.lat);
      setLon(json.list[0]?.coord?.lon);
      setPlace(findCity);
    }
  };

  const getWeatherReport = () => {
    setLocation({ lat: lat, lon: lon });
    setPlace(findCity);
  };

  const findMyCoordinates = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (err) => {
          alert(err.message);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="bg-white w-80 border rounded-md min-w-220px">
      <div className=" border-b border-b-gray-300">
        <div className="mx-5 py-2 text-sky-500 font-bold text-xl">
          Weather App
        </div>
      </div>

      <div className="mx-5 my-8">
        <input
          className="p-2 w-full rounded-md border border-gray-300"
          placeholder="Enter city name"
          onChange={(e) => setCity(e.target.value)}
        />

        {findCity.length > 0 && (
          <div
            className="sticky bg-white p-2 rounded-b-lg shadow-lg border border-x-gray-300 border-b-gray-300s"
            onClick={() => getWeatherReport()}
          >
            <Link to={"/weather-report"}>{findCity.join(",")}</Link>
          </div>
        )}
        <div className="flex items-center my-5">
          <div className="flex-1 border-b border-gray-300"></div>
          <div className="mx-1 text-gray-300">OR</div>
          <div className="flex-1 border-b border-gray-300"></div>
        </div>

        <button
          className="p-2 mb-5 rounded-md w-full bg-sky-500 border border-gray-300"
          onClick={() => findMyCoordinates()}
        >
          <Link to={"/weather-report"}> Get Device Location</Link>
        </button>
      </div>
    </div>
  );
};

export default City;
