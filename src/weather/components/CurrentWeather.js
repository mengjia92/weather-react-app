import React, {Component} from "react";
import "../weatherStyle.css";
import ReactAnimatedWeather from "react-animated-weather";
import {getWeatherIcon, tempConverter} from "../helpers";

export class CurrentWeather extends Component {
    render() {
        return (
            <div className="weatherColumn">
                <div className="currLocation">{this.props.currLoc}</div>

                <div className="weatherRow">
                    <div className="weatherIcon">
                        <ReactAnimatedWeather icon={getWeatherIcon(this.props.iconVal)} color="white" size={100}/>
                    </div>

                    <div className="degree">
                        {tempConverter(this.props.tempVal)}&deg;C
                    </div>

                    <div className="currInfo">
                        <p>{this.props.timeVal}</p>
                        <p>{this.props.summary}</p>
                        <p>{"Humidity: " + this.props.humidVal}</p>
                        <p>{"Pressure: " + this.props.pressureVal}</p>
                    </div>
                </div>
            </div>
        )
    }
}