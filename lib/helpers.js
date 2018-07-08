



const helpers = {};

helpers.parseJsonToObject = function (str) {
    try {
        return JSON.parse(str);
    } catch (e) {
        return {};
    }
};



module.exports = helpers;