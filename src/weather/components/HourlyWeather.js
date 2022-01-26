import React, {Component} from 'react';
import "../weatherStyle.css";
import ReactAnimatedWeather from "react-animated-weather";
import {getWeatherIcon, getHourlyTime, tempConverter}  from "../helpers";

export class HourlyWeather extends Component {
    render() {
        return (
            <div className="hourly">
                <div style={{width: "25%"}}>
                    {getHourlyTime(this.props.timeVal)}
                </div>
                <div style={{width: "15%"}}>
                    {tempConverter(this.props.tempVal)}&deg;C
                </div>
                <div style={{width: "20%", textAlign: "right"}}>
                    <ReactAnimatedWeather icon={getWeatherIcon(this.props.iconVal)} color="gold" size={20}/>
                </div>
                <div style={{width: "40%"}}>
                    {this.props.summary}
                </div>
            </div>
        )
    }
}