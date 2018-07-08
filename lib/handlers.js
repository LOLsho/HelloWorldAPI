

const handlers = {};

handlers.notFound = function (dataFromUser, callback) {
    callback(404, {'Error': `This route is not found! Use '/hello' route and method POST to see the welcome message`});
};


handlers.hello = function (dataFromUser, callback) {
    if (dataFromUser.method === 'post') {
        callback(200, {'Message': 'Welcome! It is my first homework. Hopefully everything is all right with it.. Thanks for visiting ;)'});
    } else {
        callback(400, {'Message': `Error: You're using method ${dataFromUser.method.toUpperCase()}. Please use method POST!`});
    }

};

module.exports = handlers;