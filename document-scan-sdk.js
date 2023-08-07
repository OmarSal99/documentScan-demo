(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("documentScan", [], factory);
	else if(typeof exports === 'object')
		exports["documentScan"] = factory();
	else
		root["documentScan"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/api.js":
/*!********************!*\
  !*** ./src/api.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cancelScan: () => (/* binding */ cancelScan),
/* harmony export */   closeScanner: () => (/* binding */ closeScanner),
/* harmony export */   getScannersList: () => (/* binding */ getScannersList),
/* harmony export */   openScanner: () => (/* binding */ openScanner),
/* harmony export */   startScan: () => (/* binding */ startScan)
/* harmony export */ });
const getScannersList = (options) => {
  console.log(options);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let scanners = [
        {
          id: "1162547",
          name: "Epson Perfection V600 Flatbed Photo Scanner",
        },
        {
          id: "2547842",
          name: "HP ScanJet Pro 3500 f1 Flatbed Scanner (L2741A)",
        },
      ];
      resolve(scanners);
    }, 1000);
  });
};

const openScanner = (scannerId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`handle-${scannerId}`);
    }, 1000);
  });
};

const startScan = async (scannerHandle, options) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`${scannerHandle} started scanning`);
    }, 2000);
  });
};

const cancelScan = async (scannerHandle) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`${scannerHandle} cancelled scanning`);
    }, 2000);
  });
};

const closeScanner = async (scannerHandle) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`${scannerHandle} closed`);
    }, 2000);
  });
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cancelScannner: () => (/* binding */ cancelScannner),
/* harmony export */   closeScannerDev: () => (/* binding */ closeScannerDev),
/* harmony export */   getScannerList: () => (/* binding */ getScannerList),
/* harmony export */   openScannerdev: () => (/* binding */ openScannerdev),
/* harmony export */   readScanData: () => (/* binding */ readScanData),
/* harmony export */   startScanner: () => (/* binding */ startScanner)
/* harmony export */ });
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ "./src/api.js");


const CONNECTION_STATUS = {
  connected: "CONNECTED",
  disconnected: "DISCOONNECTED",
};

const SCANNING_STATUS = {
  ready: "READY",
  in_progress: "IN PROGRESS",
  cancelling: "CANCELLING",
};

let CURRENT_SCANNING_STATUS = "";
let CURRENT_CONNECTION_STATUS = CONNECTION_STATUS.disconnected;

const getScannerList = async (options) => {
  return (0,_api__WEBPACK_IMPORTED_MODULE_0__.getScannersList)(options);
};

const openScannerdev = async (scannerId) => {
  return new Promise(async (resolve, reject) => {
    let scannerHandle = await (0,_api__WEBPACK_IMPORTED_MODULE_0__.openScanner)(scannerId);
    CURRENT_CONNECTION_STATUS = CONNECTION_STATUS.connected;
    CURRENT_SCANNING_STATUS = SCANNING_STATUS.ready;
    chrome.notifications.create("open-scanner", {
      type: "basic",
      iconUrl: "./icon-16.png",
      title: "Scanner connected",
      message: `Scanner ${scannerHandle} is connected and ready to scan`,
    });
    resolve(scannerHandle);
  });
};

const startScanner = async (scannerHandle, options) => {
  return new Promise(async (resolve, reject) => {
    if (CURRENT_CONNECTION_STATUS === CONNECTION_STATUS.disconnected) {
      reject("There is no connected scanner");
      return;
    }
    let data = await (0,_api__WEBPACK_IMPORTED_MODULE_0__.startScan)(scannerHandle, options);
    CURRENT_SCANNING_STATUS = SCANNING_STATUS.in_progress;
    chrome.notifications.create("open-scanner", {
      type: "basic",
      iconUrl: "./icon-16.png",
      title: "Scanning in progress",
      message: data,
    });
    resolve(data);
  });
};

const readScanData = async (jobId) => {};

const cancelScannner = async (jobId) => {
  return new Promise(async (resolve, reject) => {
    if (CURRENT_CONNECTION_STATUS === CONNECTION_STATUS.disconnected) {
      reject("There is no connected scanner");
      return;
    }
    if (CURRENT_SCANNING_STATUS !== SCANNING_STATUS.in_progress) {
      reject("There are no scanning jobs running");
      return;
    }
    CURRENT_SCANNING_STATUS = SCANNING_STATUS.cancelling;
    let data = await (0,_api__WEBPACK_IMPORTED_MODULE_0__.cancelScan)(jobId);
    CURRENT_SCANNING_STATUS = SCANNING_STATUS.ready;
    chrome.notifications.create("open-scanner", {
      type: "basic",
      iconUrl: "./icon-16.png",
      title: "scanning cancelled",
      message: data,
    });
    resolve(data);
  });
};

const closeScannerDev = async (scannerHandle) => {
  return new Promise(async (resolve, reject) => {
    if (CURRENT_CONNECTION_STATUS === CONNECTION_STATUS.disconnected) {
      reject("There is no connected scanner");
      return;
    }
    if (CURRENT_SCANNING_STATUS === SCANNING_STATUS.in_progress) {
      reject("a scanning job is in progress");
      return;
    }
    let data = await (0,_api__WEBPACK_IMPORTED_MODULE_0__.closeScanner)(scannerHandle);
    CURRENT_SCANNING_STATUS = "";
    CURRENT_CONNECTION_STATUS = CONNECTION_STATUS.disconnected;
    chrome.notifications.create("open-scanner", {
      type: "basic",
      iconUrl: "./icon-16.png",
      title: "Scanner closed",
      message: data,
    });
    resolve(data);
  });
};

// module.exports = {
//   getScannerList,
//   openScannerdev,
//   startScanner,
//   readScanData,
//   cancelScannner,
//   closeScannerDev,
// };

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=document-scan-sdk.js.map