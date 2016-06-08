/*
 *  This file defines the defaults in the application
 */

/* eslint-disable global-require */

const defaults = {
    get BlankView() { return require('../../views/Defaults/blankView'); },
    get WarningView() { return require('../../views/Defaults/warningView'); },
    get LoadingView() { return require('../../views/Defaults/loadingView'); }
};

module.exports = defaults;
