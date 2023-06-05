"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initWindow = void 0;
var electron_1 = require("electron");
var path = require("path");
var tray_1 = require("./tray");
var constants_1 = require("./constants");
var waitPort = require("wait-port");
var initWindow = function () {
    // Create the browser window.
    var mainWindow = new electron_1.BrowserWindow({
        width: 1080,
        height: 720,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        }
    });
    //mainWindow.webContents.openDevTools();
    (0, tray_1.initTray)(mainWindow);
    mainWindow.on("minimize", function (event) {
        event.preventDefault();
        mainWindow.hide();
    });
    mainWindow.on("close", function (event) {
        event.preventDefault();
        mainWindow.hide();
    });
    mainWindow.on("show", function () {
        //appIcon.setHighlightMode('always')
    });
    waitPort({
        host: constants_1.Constants.XLR_HOST,
        port: constants_1.Constants.XLR_PORT,
        timeout: constants_1.Constants.XLR_TIMEOUT,
    })
        .then(function (_a) {
        var open = _a.open, ipVersion = _a.ipVersion;
        if (open) {
            console.log("The port is now open on IPv".concat(ipVersion, "!"));
            mainWindow.loadURL(constants_1.Constants.XLR_URL);
        }
        else
            console.log("The port did not open before the timeout...");
    })
        .catch(function (err) {
        console.error("An unknown error occured while waiting for the port: ".concat(err));
    });
};
exports.initWindow = initWindow;
//# sourceMappingURL=mainWindow.js.map