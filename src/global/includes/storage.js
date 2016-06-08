/*
 *  This file defines the storage classes in the application
 */

/* eslint-disable global-require */

const storages = {
    get Navigation() { return require('../../storage/navigation'); },
    get Setting() { return require('../../storage/setting'); }
};

module.exports = storages;
