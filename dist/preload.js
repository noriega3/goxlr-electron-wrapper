// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener("DOMContentLoaded", function () {
    var replaceText = function (selector, text) {
        var element = document.getElementById(selector);
        if (element) {
            element.innerText = text;
        }
    };
    for (var _i = 0, _a = ["chrome", "node", "electron"]; _i < _a.length; _i++) { //@ts-ignore
        var type = _a[_i];
        replaceText("".concat(type, "-version"), process.versions[type]); // eslint-disable-line
    }
});
//# sourceMappingURL=preload.js.map