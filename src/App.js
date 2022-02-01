import "./styles.css";
import React, { useEffect, useState } from "react";
import {
  WiDayRain,
  WiCloudy,
  WiFahrenheit,
  WiDaySunnyOvercast,
  WiDaySnow
} from "react-icons/wi";

export default function App() {
  const [data, setData] = useState([]);
  const [city, setCity] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&days=5&units=imperial&appid=9c23d9e81dafb3073619a516ad0f56fb&cnt=5`
      );
      const json = await data.json();

      setData(json);
    };

    fetchData().catch(console.error);
  }, [city]);

  /* useEffect(() => {
     fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=9c23d9e81dafb3073619a516ad0f56fb&cnt=5`
    )
      .then((res) => res.json())
      .then((result) => {
        setData(result.list);

        console.log(result.list);
      }).catch((err) => {
        console.log(err);
      });
      
  }, []); */

  // const [city, setCity] = useState(""); //
  console.log(city);
  console.log(data);

  return (
    <div className="App">
      <h1 className="header">Hourly Weather Forecast</h1>

      <input
        className="search"
        type="text"
        placeholder="Search City or Zipcode"
        onChange={(event) => setCity(event.target.value)}
        value={city}
      />
      <p className="weatherCard">
        {data.list &&
          data.list.map((post) => (
            <div className="card" key={post.id}>
              <h2>{post.main.temp}&deg;F</h2>
              <h1 className="material">
                {post.weather[0].main === "Clouds" ? (
                  <WiCloudy style={{ fontSize: 100 }} />
                ) : post.weather[0].main === "Clear" ? (
                  <WiDaySunnyOvercast style={{ fontSize: 100 }} />
                ) : post.weather[0].main === "Rain" ? (
                  <WiDayRain style={{ fontSize: 100 }} />
                ) : post.weather[0].main === "Snow" ? (
                  <WiDaySnow style={{ fontSize: 100 }} />
                ) : null}
              </h1>
              <p className="size">{post.weather[0].main} </p>
              <p className="size">{post.dt_txt}</p>
            </div>
          ))}
      </p>
    </div>
  );
}
