import jsonQuery from 'json-query';
// var jsonQuery = require('json-query')

function FilterSessions(data, query) {
    return jsonQuery(query, { data }).value;
}

module.exports = FilterSessions;
