/*
 *  This file defines the utilities in the application
 */

/* eslint-disable global-require */

const utils = {
    get F8StyleSheet() { return require('../../utils/F8StyleSheet'); },
    get FormatTime() { return require('../../utils/FormatTime'); },
    get FormatDuration() { return require('../../utils/FormatDuration'); },
    get GroupSessions() { return require('../../utils/GroupSessions'); },
    get FilterSessions() { return require('../../utils/FilterSessions'); },
    get GetMapURL() { return require('../../utils/getMapURL'); }
};

module.exports = utils;
