import { createContext } from "react";

const LocationContext = createContext({
  location: {
    lat: 8.4833,
    lon: 76.9167,
  },
  place: ["Thiruvananthapuram", "IN"],
});

export default LocationContext;
