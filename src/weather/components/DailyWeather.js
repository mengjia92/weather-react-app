import React, {Component} from 'react';
import "../weatherStyle.css";
import ReactAnimatedWeather from "react-animated-weather";
import {ExtraDailyInfo} from "./ExtraDailyInfo";
import {getWeatherIcon, getWeekDay, tempConverter, timeConverter}  from "../helpers";

export class DailyWeather extends Component {
    state = {
        isClicked: false,
        divColor: "initial"
    }

    getMore() {
        this.setState({
            isClicked: false,
            divColor: "initial"
        });
    }

    foldMore() {
        this.setState({
            isClicked: true,
            divColor: "rgba(51, 8, 103, 0.2)"
        });
    }

    moreDetails() {
        this.state.isClicked ? this.getMore() : this.foldMore();
    }

    render() {
        const {isClicked, divColor} = this.state;

        return (
            <div className="daily" onClick={this.moreDetails.bind(this)} style={{backgroundColor: divColor}}>
                <ReactAnimatedWeather icon={getWeatherIcon(this.props.iconVal)} color="gold" size={50}/>
                <div className="dailyRow">{timeConverter(this.props.timeVal)}</div>
                <div className="dailyRow">{getWeekDay(this.props.timeVal)}</div>
                <div className="dailyRow">{"High: " + tempConverter(this.props.tempHighVal)}</div>
                <div className="dailyRow">{"Low: " + tempConverter(this.props.tempLowVal)}</div>

                {isClicked ? (
                    <ExtraDailyInfo
                        extraSunrise={this.props.sunrise}
                        extraSunset={this.props.sunset}
                        extraSummary={this.props.summary} />
                ) : (<div></div>)}
            </div>
        )
    }
}