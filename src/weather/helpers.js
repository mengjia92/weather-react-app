export function tempConverter(temp) {
    return Math.round(((temp - 32) * 5) / 9);
}

export function timeConverter(t) {
    let date = new Date(t * 1000),
        dateVal = date.getFullYear() + "-" +
            (date.getMonth()+1).toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
            }) + "-" +
            date.getDate().toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
            });
    return dateVal
}

export function getWeekDay(t) {
    let weekDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        idx = new Date(t * 1000).getDay();
    return weekDay[idx];
}

export function getHourlyTime(t) {
    let date = new Date(t * 1000),
        dateVal = date.getFullYear() + "-" +
            (date.getMonth()+1).toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
            }) + "-" +
            date.getDate().toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
            }) + " " +
            date.getHours().toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
            }) + ":00";
    return dateVal
}

export function getSunriseTime(t) {
    let date = new Date(t * 1000);
    return date.getHours().toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
    }) + ":" + date.getMinutes().toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
    })
}

export function getWeatherIcon(val) {
    switch (val) {
        case "clear-day":
            return "CLEAR_DAY";
        case "clear-night":
            return "CLEAR_NIGHT";
        case "partly-cloudy-day":
            return "PARTLY_CLOUDY_DAY";
        case "partly-cloudy-night":
            return "PARTLY_CLOUDY_NIGHT";
        default:
            return val.toUpperCase();
    }
}