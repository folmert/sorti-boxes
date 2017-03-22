// alternative for: handler.name property
function getFunctionName(func) {
    // Match:
    // - ^          the beginning of the string
    // - function   the word 'function'
    // - \s+        at least some white space
    // - ([\w\$]+)  capture one or more valid JavaScript identifier characters
    // - \s*        optionally followed by white space (in theory there won't be any here,
    //              so if performance is an issue this can be omitted[1]
    // - \(         followed by an opening brace
    //
    var result = /^function\s+([\w\$]+)\s*\(/.exec(func.toString());

    return result ? result[1] : ''; // for an anonymous function there won't be a match
}

if (!Array.prototype.filter) {
    Array.prototype.filter = function (fun/*, thisArg*/) {
        'use strict';

        if (this === void 0 || this === null) {
            throw new TypeError();
        }

        var t = Object(this);
        var len = t.length >>> 0;
        if (typeof fun !== 'function') {
            throw new TypeError();
        }

        var res = [];
        var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
        for (var i = 0; i < len; i++) {
            if (i in t) {
                var val = t[i];

                if (fun.call(thisArg, val, i, t)) {
                    res.push(val);
                }
            }
        }

        return res;
    };
}