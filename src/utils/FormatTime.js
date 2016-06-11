function formatTime(unix: number): string {
    debugger;
    var date = new Date(unix);
    var hours = date.getUTCHours();
    var minutes = date.getUTCMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes;

    return strTime + ' ' + ampm;
}

module.exports = formatTime;
