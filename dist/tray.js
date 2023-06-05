"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initTray = void 0;
var electron_1 = require("electron");
var constants_1 = require("./constants");
var path = require("path");
var xlr = require('./xlr');
var ICON_PATH = path.join(__dirname, "../logoTemplate.png");
var initTray = function (win) {
    var appTray = new electron_1.Tray(ICON_PATH);
    var contextMenu = electron_1.Menu.buildFromTemplate([
        {
            label: "Show App",
            click: function () {
                win.show();
            },
        },
        {
            label: "Refresh Settings Page",
            click: function () {
                win.loadURL(constants_1.Constants.XLR_URL);
            },
        },
        {
            label: "Relaunch GoXLR Utility",
            click: function () {
                xlr.stop();
                setTimeout(function () {
                    xlr.start();
                }, 10000);
            },
        },
        {
            label: "Quit",
            click: function () {
                xlr.stop();
                win.destroy();
                electron_1.app.quit();
            },
        },
    ]);
    appTray.setContextMenu(contextMenu);
    return true;
};
exports.initTray = initTray;
//# sourceMappingURL=tray.js.map