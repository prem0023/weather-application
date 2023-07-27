import { Outlet, createBrowserRouter } from "react-router-dom";
import Error from "./components/Error";
import City from "./components/City";
import WeatherReport from "./components/WeatherReport";
import { useState } from "react";
import LocationContext from "./components/LocationContext";

const AppLayout = () => {
  const [location, setLocation] = useState({
    lat: 0,
    lon: 0,
  });

  const [place, setPlace] = useState(["Kolkata", "IN"]);
  return (
    <LocationContext.Provider
      value={{
        location: location,
        setLocation: setLocation,
        place: place,
        setPlace: setPlace,
      }}
    >
      <div class="h-screen flex items-center justify-center min-w-[130px]">
        <div class="z-10 bg-sky-500 h-screen w-screen"></div>
        <div class="z-20 absolute top-0 left-0 h-full w-full flex items-center justify-center">
          <Outlet />
        </div>
      </div>
    </LocationContext.Provider>
  );
};

const App = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <City />,
      },
      {
        path: "/weather-report",
        element: <WeatherReport />,
      },
    ],
  },
]);

export default App;
