/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 781:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 979:
/***/ ((module) => {

module.exports = eval("require")("jsonc-parser");


/***/ }),

/***/ 625:
/***/ ((module) => {

module.exports = eval("require")("yaml");


/***/ }),

/***/ 896:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 928:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
const core = __nccwpck_require__(781);
const fs = __nccwpck_require__(896);
const path = __nccwpck_require__(928);
const jsonc = __nccwpck_require__(979);
const yaml = __nccwpck_require__(625);

function parseData(pathToData) {
  const absPath = path.join(process.env.GITHUB_WORKSPACE, pathToData);
  const data = fs.readFileSync(absPath, "utf8");
  if (pathToData.endsWith(".yaml") || pathToData.endsWith(".yml")) {
    return yaml.parse(data);
  }
  return jsonc.parse(data);
}

function run() {
  try {
    // eg. package.json
    const pathToData = core.getInput("file-path");

    // eg. version
    const key = core.getInput("key");

    // eg. v
    const tagPrefix = core.getInput("tag-prefix");

    // eg 1.0.0
    const tagWithoutPrefix = process.env.GITHUB_REF.replace(
      `refs/tags/${tagPrefix}`,
      "",
    );

    const failOnMismatch = !(core.getInput("fail-on-mismatch") === "false");

    const data = parseData(pathToData);

    if (data[key] === tagWithoutPrefix) {
      core.setOutput("matches", true);
    } else if (failOnMismatch) {
      core.setFailed(
        `${pathToData}[${key}] does not match tag ${tagWithoutPrefix}`,
      );
    }

    core.setOutput("matches", false);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();

module.exports = __webpack_exports__;
/******/ })()
;