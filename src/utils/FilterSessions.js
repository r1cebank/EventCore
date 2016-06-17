import jsonQuery from 'json-query';

function FilterSessions(data, query) {
    return jsonQuery(query, { data }).value;
}

module.exports = FilterSessions;
