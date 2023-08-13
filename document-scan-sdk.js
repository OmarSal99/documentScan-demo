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
        {
          id: "8572642",
          name: "Epson WorkForce DS-1630 A4 Document Scanner",
        },
        {
          id: "5541968",
          name: "Plustek PS186 Desktop Document Scanner",
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
      resolve(`scanJob-${scannerHandle}`);
    }, 2000);
  });
};

const cancelScan = async (scanJob) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`${scanJob} cancelled`);
    }, 1000);
  });
};

const closeScanner = async (scannerHandle) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`${scannerHandle} closed`);
    }, 1000);
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
  scanning: "SCANNING",
  cancelling: "CANCELLING",
};

let CURRENT_SCANNING_STATUS = "";
let CURRENT_CONNECTION_STATUS = CONNECTION_STATUS.disconnected;

const opennedScanners = [];

const showNotification = (id, title, message) => {
  chrome.notifications.create(id, {
    type: "basic",
    iconUrl: "./icon-16.png",
    title: title,
    message: message,
  });
};

const getScannerList = async (options) => {
  return (0,_api__WEBPACK_IMPORTED_MODULE_0__.getScannersList)(options);
};

const openScannerdev = async (scannerId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let scannerHandle = await (0,_api__WEBPACK_IMPORTED_MODULE_0__.openScanner)(scannerId);
      opennedScanners.push(scannerHandle);
      CURRENT_SCANNING_STATUS = SCANNING_STATUS.ready;
      showNotification(
        "open_scanner",
        "Scanner connected",
        `Scanner ${scannerHandle} is connected and ready to scan`
      );
      resolve(scannerHandle);
    } catch (e) {
      showNotification("open_scanner", "Openning scanner failed", e);
      reject(e);
    }
  });
};

const startScanner = async (scannerHandle, options) => {
  return new Promise(async (resolve, reject) => {
    if (!opennedScanners.includes(scannerHandle)) {
      showNotification(
        "start_scan",
        "Scanning failed",
        "There is no connected scanner"
      );
      reject("There is no connected scanner");
      return;
    }
    try {
      CURRENT_SCANNING_STATUS = SCANNING_STATUS.scanning;
      showNotification(
        "start_scan",
        "Scanning in progress",
        `${scannerHandle} started Scanning`
      );
      let scanJob = await (0,_api__WEBPACK_IMPORTED_MODULE_0__.startScan)(scannerHandle, options);
      CURRENT_SCANNING_STATUS = SCANNING_STATUS.ready;
      resolve(scanJob);
    } catch (e) {
      showNotification(
        "start_scan",
        "Scanning failed",
        "could not execute scan"
      );
      reject(e);
    }
  });
};

const readScanData = async (jobId) => {};

const cancelScannner = async (jobId) => {
  return new Promise(async (resolve, reject) => {
    if (CURRENT_SCANNING_STATUS !== SCANNING_STATUS.scanning) {
      showNotification(
        "cancel_scan",
        "Could not cancel scan",
        "There are no scanning jobs running"
      );
      reject("There are no scanning jobs running");
      return;
    }
    try {
      CURRENT_SCANNING_STATUS = SCANNING_STATUS.cancelling;
      let data = await (0,_api__WEBPACK_IMPORTED_MODULE_0__.cancelScan)(jobId);
      CURRENT_SCANNING_STATUS = SCANNING_STATUS.ready;
      showNotification("cancel_scan", "scanning cancelled", data);
      resolve(data);
    } catch (e) {
      showNotification("cancel_scan", "Could not cancel scan", e);
      reject(e);
    }
  });
};

const closeScannerDev = async (scannerHandle) => {
  return new Promise(async (resolve, reject) => {
    if (!opennedScanners.includes(scannerHandle)) {
      showNotification(
        "close_scanner",
        "Closing failed",
        "There is no connected scanner"
      );
      reject("There is no connected scanner");
      return;
    }
    if (CURRENT_SCANNING_STATUS === SCANNING_STATUS.scanning) {
      showNotification(
        "close_scanner",
        "Closing failed",
        "a scanning job is in progress"
      );
      reject("a scanning job is in progress");
      return;
    }
    try {
      let data = await (0,_api__WEBPACK_IMPORTED_MODULE_0__.closeScanner)(scannerHandle);
      opennedScanners.filter((item) => item !== scannerHandle);
      if (opennedScanners.length === 0) {
        CURRENT_SCANNING_STATUS = "";
      }
      showNotification("close_scanner", "Scanner closed", data);
      resolve(data);
    } catch (e) {
      showNotification("close_scanner", "Closing failed", e);
      reject(e);
    }
  });
};

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=document-scan-sdk.js.map