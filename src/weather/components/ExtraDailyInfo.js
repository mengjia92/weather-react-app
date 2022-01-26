import React, {Component} from 'react';
import "../weatherStyle.css";
import {getSunriseTime} from "../helpers";

export class ExtraDailyInfo extends Component {
    render() {
        return (
            <div>
                <div className="dailyRow" style={{lineHeight: "1.2em"}}>
                    {"Sunrise: " + getSunriseTime(this.props.extraSunrise)}
                </div>
                <div className="dailyRow" style={{lineHeight: "1.2em"}}>
                    {"Sunset: " + getSunriseTime(this.props.extraSunset)}
                </div>
                <div className="dailyRow" style={{lineHeight: "1.2em"}}>
                    {this.props.extraSummary}
                </div>
            </div>
        )
    }
}