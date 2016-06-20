/*
 *  This file defines the storage classes in the application
 */

/* eslint-disable global-require */

const storages = {
    get Generic() { return require('../../storage/generic'); }
};

module.exports = storages;
