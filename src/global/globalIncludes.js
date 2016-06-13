/*
 *  This file defines the global includes in the application
 */

const globalIncludes = {
    get Views() { return require('./includes/views'); },
    get Components() { return require('./includes/components'); },
    get Defaults() { return require('./includes/defaults'); },
    get Storage() { return require('./includes/storage'); },
    get Store() { return require('./includes/store'); },
    get Colors() { return require('./includes/colors'); },
    get Icons() { return require('./includes/icons'); },
    get Utils() { return require('./includes/utils'); },
    get Assets() { return require('./includes/assets'); }
};

module.exports = globalIncludes;
