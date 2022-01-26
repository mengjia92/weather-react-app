import React, {Component} from "react";
import axios from "axios";
import "./weatherStyle.css";
import imgLoad from "./loading.png";
import {DailyWeather} from "./components/DailyWeather";
import {SearchBar} from "./components/SearchBar";
import {CurrentWeather} from "./components/CurrentWeather";
import {HourlyWeather} from "./components/HourlyWeather";


export class Dashboard extends Component {
    state = {
        newWeather: {},
        currLocInfo: {},
        isLoading: true,
        isClicked: false,
        switchContent: "Weather Forecast for 48 Hours",
        newCity: "Toronto"
    };

    // getCurrLocation() {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition((position) => {
    //             let long = position.coords.longitude.toFixed(4),
    //                 lat = position.coords.latitude.toFixed(4);
    //             this.loadData(lat, long);
    //         })
    //     }
    // }

    getNewLocation(val) {
        // // ----------------Alternative API----------------
        // const GEOCODE_URL = "http://api.weatherstack.com/current",
        //     KEY = "12d801c2e3a61befbeb5b514f7645330"
        //
        //  axios.get(`${GEOCODE_URL}?access_key=${KEY}&query=${this.state.newCity}`)
        //     .then(res => {
        //         this.setState({currLocInfo: res.data});
        //
        //         let lat = res.data?.location.lat,
        //             long = res.data?.location.lon;
        //         this.loadData(lat, long)
        //     })
        //     .catch(err => console.log('err', err))
        // // -----------------------------------------------

        const GEOCODE_URL = "https://api.opencagedata.com/geocode/v1/json",
            KEY = "47c0a001ef5c48eca94aed5d1ed53df4"

        axios.get(`${GEOCODE_URL}?q=${this.state.newCity}&key=${KEY}`)
            .then(res => {
                this.setState({currLocInfo: res.data});

                let lat = res.data?.results[0].geometry.lat,
                    long = res.data?.results[0].geometry.lng;
                this.loadData(lat, long)
            })
            .catch(err => console.log('err', err))
    }

    loadData(lat, long) {
        const WEATHER_URL = "https://skill-test-api.mark2win.com/api/weather";

        axios.get(`${WEATHER_URL}/${lat}/${long}`)
            .then(res => {
                this.setState({
                    newWeather: res.data,
                    isLoading: false
                });
            })
            .catch(err => console.log('err', err))
    }

    getNewSearch(val) {
        this.setState({newCity: val});
    }

    componentDidMount() {
        // this.state.newCity === null ? this.getCurrLocation() : this.getNewLocation(this.state.newCity);
        this.getNewLocation(this.state.newCity)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.newCity !== this.state.newCity) {
            this.getNewLocation(this.state.newCity)
        }
    }

    getNext7DaysForecast() {
        this.setState({
            isClicked: false,
            switchContent: "Weather Forecast for 48 Hours"
        });
    }

    get48HoursForecast() {
        this.setState({
            isClicked: true,
            switchContent: "Weather Forecast for Next 7 Days"
        });
    }

    switchForecast() {
        this.state.isClicked ? this.getNext7DaysForecast() : this.get48HoursForecast();
    }


    render() {
        const {newWeather, currLocInfo, isLoading, isClicked, switchContent, newCity} = this.state;

        if (isLoading) {
            return (
                <div style={{marginTop: 50}}>
                    <img src={imgLoad} style={{maxWidth: 80}} alt="loading" />
                </div>
            )
        } else {
            return (
                <div className="weather">
                    <SearchBar newCity={(val) => this.getNewSearch(val)}/>

                    <CurrentWeather
                        currLoc={`${currLocInfo?.results[0]?.components?.continent}/${currLocInfo?.results[0]?.components?.country}`}
                        iconVal={newWeather?.currently?.icon}
                        tempVal={newWeather?.currently?.temperature}
                        timeVal={currLocInfo?.timestamp?.created_http}
                        summary={newWeather?.currently?.summary}
                        humidVal={newWeather?.currently?.humidity}
                        pressureVal={newWeather?.currently?.pressure} />

                    <div className="switchBoard" onClick={this.switchForecast.bind(this)}>{switchContent}</div>

                    {isClicked ? (
                        <div className={"weatherColumn hourlyBoard"}>
                            {newWeather?.hourly?.data?.map((item) => {
                                return (
                                    <HourlyWeather
                                        timeVal={item.time}
                                        tempVal={item.temperature}
                                        iconVal={item.icon}
                                        summary={item.summary} />
                                )
                            })}
                        </div>
                    ) : (
                        <div className="weatherRow dailyBoard">
                            {newWeather?.daily?.data?.map((item) => {
                                return (
                                    <DailyWeather
                                        iconVal={item.icon}
                                        timeVal={item.time}
                                        tempHighVal={item.temperatureHigh}
                                        tempLowVal={item.temperatureLow}
                                        summary={item.summary}
                                        sunrise={item.sunriseTime}
                                        sunset={item.sunsetTime} />
                                )
                            })}
                        </div>
                    )}
                </div>
            )
        }
    }
}
