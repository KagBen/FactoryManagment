const getQueryParameters =() => {
    var params = {};
    var queryString = window.location.search.substring(1); // Exclude the leading "?"
    var paramArray = queryString.split('&');

    for (var i = 0; i < paramArray.length; i++) {
        var pair = paramArray[i].split('=');
        var key = decodeURIComponent(pair[0]);
        var value = decodeURIComponent(pair[1]);
        params[key] = value;
    }

    return params;
}

export {getQueryParameters}