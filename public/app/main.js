mineralApp = angular.module('mineralApp', ['ngResource']);

mineralApp.factory('User', function ($resource) {
    return $resource('/api/users/:id', {id: '@id'}, {'update': {method: 'PUT'}});
});

mineralApp.factory('Role', function ($resource) {
    return $resource('/api/roles/:id', {id: '@id'}, {'update': {method: 'PUT'}});
});

mineralApp.factory('MineralClass', function ($resource) {
    return $resource('/api/mineralClasses/:id', {id: '@id'}, {'update': {method: 'PUT'}});
});
mineralApp.factory('Mineral', function ($resource) {
    return $resource('/api/minerals/:id', {id: '@id'}, {'update': {method: 'PUT'}});
});

function successAlert(message) {
    $.notify({
        title: "<strong>Инфо:</strong> ",
        message: message
    }, {
        type: 'success',
        mouse_over: 'pause',
        offset: {
            x: 20,
            y: 60
        }
    });
}

function errorAlert(message) {
    $.notify({
        title: "<strong>Ошибка:</strong> ",
        message: message
    }, {
        type: 'danger',
        mouse_over: 'pause',
        offset: {
            x: 20,
            y: 60
        }
    });
}

function handleError(error) {
    console.log(error);
    errorAlert(error.data.message || error.data || error);
}
