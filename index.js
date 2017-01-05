function isFunction(functionToCheck) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

function makeRecord(domLog, title) {
    var record = document.createElement('p');

    record.innerText = title;
    domLog.appendChild(record);
}

function logObjProp(obj) {
    var prop,
        logStory = document.querySelector('.log .log__holder'),
        msg = '';

    for (prop in obj) {
        if (isFunction(obj[prop])) {
            msg = obj[prop].toString();
        } else {
            msg = prop + " : " + obj[prop];
        }

        makeRecord(logStory, msg);
    }
}

function onError(message, file, line, col, error) {
    var logStory = document.querySelector('.log .log__holder');

    makeRecord(logStory, "<error message>");
    makeRecord(logStory, error.message);
    makeRecord(logStory, "<end error message>");

    return false;
}

function onReady(e) {
    var logStory = document.querySelector('.log .log__holder');

    makeRecord(logStory, "<window log>");
    logObjProp(window);
    makeRecord(logStory, "<end of window log>");

    makeRecord(logStory, "<local storage>");
    logObjProp(window.localStorage.valueOf());
    makeRecord(logStory, "<end local storage>");
}

document.addEventListener('DOMContentLoaded', onReady);
window.addEventListener('error', onError);
