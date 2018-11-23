"use strict";

var mr_data, _temp;

_temp = document.documentElement.innerHTML;

for (var prop in mr_data) {
    _temp = _temp.split("{{::" + prop + "}}").join(_data[prop]);
};

document.body.innerHTML = _temp;
