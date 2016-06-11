import { Utils } from '../global/globalIncludes';

const formatTime = Utils.FormatTime;

function naivePlural(text: string, count: number): string {
    if (count > 1) {
        return text + 's';
    }
    return text;
}

function formatDuration(startTime, endTime): string {
    const startMs = new Date(startTime).getTime();
    const endMs = new Date(endTime).getTime();
    let ms = endMs - startMs;
    let minutes = ms / 1000 / 60;
    let hours = Math.floor(minutes / 60);

    if (hours > 2) {
        return 'Until ' + formatTime(endMs).toLowerCase();
    }

    let durationText = '';
    if (hours > 0) {
        durationText = `${hours} ${naivePlural('hour', hours)} `;
        minutes = minutes - hours * 60;
    }

    if (minutes > 0) {
        durationText = `${durationText}${Math.ceil(minutes)} min`;
    }
    debugger;

    return durationText.trim();
}

module.exports = formatDuration;
