import React, { useState } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import cloudIcon from "./img/image.png";

const toDate = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const currentDate = new Date();
  return `${days[currentDate.getDay()]} ${currentDate.getDate()} ${
    months[currentDate.getMonth()]
  }`;
};

function Weather() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({
    loading: false,
    data: {},
    error: false,
  });

  const search = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setQuery("");
      setWeather({ ...weather, loading: true });
      const url = process.env.REACT_APP_OPENWEATHERMAP_URL;
      const appid = process.env.REACT_APP_OPENWEATHERMAP_APPID;
      try {
        const res = await axios.get(url, {
          params: {
            q: query,
            units: "metric",
            appid: appid,
          },
        });
        setWeather({ data: res.data, loading: false, error: false });
      } catch (error) {
        setWeather({ ...weather, data: {}, error: true });
        setQuery("");
      }
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box
        sx={{
          background: "rgba(15, 15, 30, 0.2)",
          borderRadius: "40px",
          backdropFilter: "blur(40px)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          fontSize: "24px",
          color: "white",
          padding: "20px",
          width: "100%",
          maxWidth: "600px",
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          align="center"
          gutterBottom
          sx={{ fontFamily: "Poppins" }}
        >
          Weather App{" "}
          <span role="img" aria-label="sun and cloud">
            <img
              src={cloudIcon}
              alt="cloud icon"
              style={{ width: "45px", height: "45px" }}
            />
          </span>
        </Typography>
        <Box display="flex" justifyContent="center" mb={4}>
          <TextField
            label="Search City..."
            variant="outlined"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyPress={search}
            sx={{
              "& .MuiInputBase-root": {
                color: "white",
                fontFamily: "Arial, sans-serif",
              },
              "& .MuiInputLabel-root": {
                color: "white",
                fontFamily: "Arial, sans-serif",
              },
              "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "lightblue",
                },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "lightblue",
                },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "lightblue",
              },
            }}
          />
        </Box>

        {weather.loading && (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        )}

        {weather.error && (
          <Box display="flex" justifyContent="center" my={4}>
            <Alert
              severity="error"
              sx={{
                background: "rgba(15, 15, 30, 0.2)",
                color: "white",
                fontFamily: "Poppins",
              }}
            >
              <span style={{ fontSize: "20px" }}> Sorry, city not found</span>
            </Alert>
          </Box>
        )}

        {weather && weather.data && weather.data.main && (
          <Box textAlign="center">
            <Typography
              variant="h4"
              component="h2"
              sx={{ fontFamily: "Poppins" }}
            >
              {weather.data.name}, <span>{weather.data.sys.country}</span>
            </Typography>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{ fontFamily: "Poppins" }}
            >
              {toDate()}
            </Typography>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              my={2}
            >
              <img
                src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
                alt={weather.data.weather[0].description}
              />
              <Typography variant="h3" sx={{ fontFamily: "Poppins" }}>
                {Math.round(weather.data.main.temp)}
                <sup>&deg;C</sup>
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ fontFamily: "Poppins" }}>
              {weather.data.weather[0].description.toUpperCase()}
            </Typography>
            <Typography variant="body1" sx={{ fontFamily: "Poppins" }}>
              Wind Speed: {weather.data.wind.speed} m/s
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default Weather;
