import type {Session} from '../../reducers/sessions';

const formatTime = require('./formatTime');

export type SessionsListData = {
    [time: string]: {
        [sessionID: string]: Session;
    };
};

function groupSessions(sessions: Array<Session>): SessionsListData {
    var data = {};
    sessions.forEach((session) => {
        var timeSectionKey = session.allDay ? 'All Day' : formatTime(session.startTime);
        data[timeSectionKey] = data[timeSectionKey] || {};
        data[timeSectionKey][session.id] = session;
    });
    return data;
}

module.exports = groupSessions;
