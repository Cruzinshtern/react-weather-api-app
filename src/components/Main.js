import React, {useState} from "react";
import axios from "axios";
import Header from "./Header";
import Content from "./Content";
import WeatherSearch from "./WeatherSearch";
import WeatherData from "./WeatherData";
import Error from "./Error";
import DateTime from "./DateTime";
import Context from "../Context";

const Main = () => {
    const [weather, setWeather] = useState();
    const [city, setCity] = useState();
    const [error, setError] = useState();

    const api_call = async e => {
        e.preventDefault();
        const location = e.target.elements.location.value;
        if(!location) {
            setWeather(null);
            return setError("Please enter the name of the city");
        }
        const API_KEY = '9cfcc957f946f62c03e5b931a8634609';
        const URL = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`;

        const response = await axios.get(URL);
        setWeather(response.data.main);
        setCity(response.data.name);
        setError(null);
    }
    console.log(weather);
    return (
        <div className="main">
            <Header />
            <Content>
                <DateTime />
                <Context.Provider value={{ api_call, weather, city }}>
                    <WeatherSearch />
                    { weather && <WeatherData />   }
                    { error && <Error error={error}/> }
                </Context.Provider>
            </Content>
        </div>
    )
}

export default Main;
