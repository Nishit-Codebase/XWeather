import { useState } from "react";
import "./App.css";
// a75512085e2544b1836142422252503
function App() {
  const [State, setState] = useState("");
  const [weather, setWeather] = useState(null); 

  const handleInputChange = (e) => {
    setState(e.target.value);
  };

  const fetchWeather = async () => {
    if (!State) return; 

    try {
      let response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=a75512085e2544b1836142422252503&q=${State}`
      );
      let data = await response.json();
      if (data.error) {
        console.error("City not found");
        setWeather(null);
      } else {
        setWeather(data.current);
      }
    } catch (e) {
      console.error("Error fetching weather data:", e);
    }
  };

  return (
    <>
      <input
        type="text"
        style={{ marginLeft: "30rem", marginTop: "10rem" }}
        onChange={handleInputChange}
        placeholder="Enter city name"
      />
      <button
        style={{ backgroundColor: "#4CAF4F", marginLeft: "10px" }}
        onClick={fetchWeather}
      >
        Search
      </button>

      {weather && (
        <div className="weather-cards">
          <div id="Box" className="weather-card">
            <b>Temperature</b>
            <p>{weather.temp_c}°C</p>
          </div>
          <div id="Box" className="weather-card">
            <b>Humidity</b>
            <p>{weather.humidity}%</p>
          </div>
          <div id="Box" className="weather-card">
            <b>Condition</b>
            <p>{weather.condition.text}</p>
          </div>
          <div id="Box" className="weather-card">
            <b>Wind Speed</b>
            <p>{weather.wind_kph} kph</p>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
