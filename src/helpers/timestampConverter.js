const msToTime = (ms) => {
    let seconds = (ms / 1000).toFixed(0);
    let minutes = (ms / (1000 * 60)).toFixed(0);
    let hours = (ms / (1000 * 60 * 60)).toFixed(0);
    let days = (ms / (1000 * 60 * 60 * 24)).toFixed(0);
    let weeks = (ms / (1000 * 60 * 60 * 24 * 7)).toFixed(0);

    if( weeks >= 1) {
        return weeks + 'w'
    } else if(days >= 1) {
        return days + 'd'
    } else if( hours >= 1) {
        return hours + 'h'
    } else if(minutes >= 1) {
        return minutes + 'm'
    } else {
        return seconds + 's'
    }

}
export const timestampConverter = (timestamp) => {
    let timeNow = new Date();
    let timePosted = new Date(timestamp);
    let elapsedTime = timeNow.getTime() - timePosted.getTime();

    return msToTime(elapsedTime);
}