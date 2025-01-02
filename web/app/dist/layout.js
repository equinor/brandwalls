"use strict";
exports.__esModule = true;
exports.metadata = void 0;
require("./globals.css");
exports.metadata = {
    title: "Equinor Brandwalls",
    description: "Application to showcase on brandwalls"
};
function RootLayout(_a) {
    var children = _a.children;
    return (React.createElement("html", { lang: "en" },
        React.createElement("body", null, children)));
}
exports["default"] = RootLayout;
