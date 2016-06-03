// import * as Views from './includes/views';
// import * as Components from './includes/components';
// import * as Defaults from './includes/defaults';
// import * as Storage from './includes/storage';
// import * as Store from './includes/store';
// import * as Colors from './includes/colors';
// import * as Icons from './includes/icons';
// import * as Utils from './includes/utils';
// import * as Assets from './includes/assets';

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
}

module.exports = globalIncludes;
// export {
//     Views,
//     Components,
//     Defaults,
//     Storage,
//     Store,
//     Colors,
//     Icons,
//     Utils,
//     Assets
// };
