import { Utils } from '../global/globalIncludes';

const formatTime = Utils.FormatTime;

function groupSessions(sessions) {
    var data = {};
    sessions.forEach((session) => {
        var timeSectionKey = session.allDay ? 'All Day' : formatTime(session.startTime);
        data[timeSectionKey] = data[timeSectionKey] || {};
        data[timeSectionKey][session.id] = session;
    });
    return data;
}

module.exports = groupSessions;
