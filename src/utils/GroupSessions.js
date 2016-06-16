import { Utils } from '../global/globalIncludes';

const formatTime = Utils.FormatTime;

function groupSessions(sessions) {
    if (!sessions) { return {}; }
    const data = {};
    sessions.forEach((session) => {
        const timeSectionKey = session.allDay ? 'All Day' : formatTime(session.startTime);
        data[timeSectionKey] = data[timeSectionKey] || {};
        data[timeSectionKey][session.id] = session;
    });
    return data;
}

module.exports = groupSessions;
