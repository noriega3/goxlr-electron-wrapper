"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./constants");
var node_child_process_1 = require("node:child_process");
var xlr = (function () {
    var instance;
    var start = function () {
        var daemon = (0, node_child_process_1.spawn)("".concat(constants_1.Constants.MACOS_XLR_DAEMON_PATH, "/goxlr-daemon"));
        daemon.stdout.on('data', function (data) {
            console.log("stdout: ".concat(data));
        });
        daemon.stderr.on('data', function (data) {
            console.error("stderr: ".concat(data));
        });
        daemon.on('close', function (code) {
            console.log("child process exited with code ".concat(code));
            if (instance != undefined && (instance.pid === daemon.pid)) {
                instance = undefined;
            }
        });
        if (instance) {
            //wait to close first
            forceStop();
        }
        instance = daemon;
    };
    var stop = function () {
        if (instance && instance.kill) {
            instance.kill();
        }
        else {
            forceStop();
        }
    };
    var forceStop = function () {
        var cmd = (0, node_child_process_1.spawn)('killall', ['goxlr-daemon']);
        cmd.stdout.on('data', function (data) {
            console.log("cmd stdout: ".concat(data));
        });
        cmd.stderr.on('data', function (data) {
            console.error("cmd stderr: ".concat(data));
        });
        cmd.on('close', function (code) {
            console.log("cmd child process exited with code ".concat(code));
        });
    };
    return {
        current: instance,
        start: start,
        stop: stop,
        forceStop: forceStop
    };
})();
module.exports = xlr;
//# sourceMappingURL=xlr.js.map