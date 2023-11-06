const scannersList = [
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

const CONNECTION_STATUS = {
  CONNECTED: "connected",
  DISCONNECTED: "disconnected",
};

const SCANNING_STATUS = {
  READY: "ready",
  SCANNING: "scanning",
  CANCELLING: "canceling",
};

let CURRENT_SCANNING_STATUS = "";

const showNotification = (id, title, message) => {
  // chrome.notifications.create(id, {
  //   type: "basic",
  //   iconUrl: "./icon-16.png",
  //   title: title,
  //   message: message,
  // });
};

/**
 * Wrapper API for chrome.documentScan
 */
class DocumentScanSdk {
  /**
   * constructor
   */
  constructor() {
    this.opennedScanners = [];
  }
  /**
   * Get a list of connected scanners
   * @param {Object} options
   * @returns {Promise}
   */
  async getScannerList(options) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(scannersList);
      }, 1000);
    });
  }

  /**
   * Open a scanner
   * @param {string} scannerId
   * @returns {Promise} - the openned Scanner handle
   */
  async openScannerdev(scannerId) {
    return new Promise(async (resolve, reject) => {
      try {
        let scannerHandle = await new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(`handle-${scannerId}`);
          }, 1000);
        });
        this.opennedScanners.push(scannerHandle);
        CURRENT_SCANNING_STATUS = SCANNING_STATUS.READY;
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
  }

  /**
   * Start Scanning
   * @param {string} scannerHandle
   * @param {Object} options
   * @returns {Promise} - scanJob
   */
  async startScanner(scannerHandle, options) {
    return new Promise(async (resolve, reject) => {
      if (!this.opennedScanners.includes(scannerHandle)) {
        showNotification(
          "start_scan",
          "Scanning failed",
          "There is no connected scanner"
        );
        reject("There is no connected scanner");
        return;
      }
      try {
        CURRENT_SCANNING_STATUS = SCANNING_STATUS.SCANNING;
        showNotification(
          "start_scan",
          "Scanning in progress",
          `${scannerHandle} started Scanning`
        );
        let scanJob = await new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(`scanJob-${scannerHandle}`);
          }, 2000);
        });
        CURRENT_SCANNING_STATUS = SCANNING_STATUS.READY;
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
  }

  /**
   * reads the scan data and decodes it to an image
   * @param {string} jobId
   */
  async readScanData(jobId) {}

  /**
   * Cancel scanning Job
   * @param {string} jobId
   * @returns {Promise}
   */
  async cancelScannner(jobId) {
    return new Promise(async (resolve, reject) => {
      if (CURRENT_SCANNING_STATUS !== SCANNING_STATUS.SCANNING) {
        showNotification(
          "cancel_scan",
          "Could not cancel scan",
          "There are no scanning jobs running"
        );
        reject("There are no scanning jobs running");
        return;
      }
      try {
        CURRENT_SCANNING_STATUS = SCANNING_STATUS.CANCELLING;
        let data = await new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(`${jobId} cancelled`);
          }, 1000);
        });
        CURRENT_SCANNING_STATUS = SCANNING_STATUS.READY;
        showNotification("cancel_scan", "scanning cancelled", data);
        resolve(data);
      } catch (e) {
        showNotification("cancel_scan", "Could not cancel scan", e);
        reject(e);
      }
    });
  }

  /**
   * close an opened scanner
   * @param {string} scannerHandle - the scanner handle
   * @returns {Promise}
   */
  async closeScannerDev(scannerHandle) {
    return new Promise(async (resolve, reject) => {
      if (!this.opennedScanners.includes(scannerHandle)) {
        showNotification(
          "close_scanner",
          "Closing failed",
          "There is no connected scanner"
        );
        reject("There is no connected scanner");
        return;
      }
      if (CURRENT_SCANNING_STATUS === SCANNING_STATUS.SCANNING) {
        showNotification(
          "close_scanner",
          "Closing failed",
          "a scanning job is in progress"
        );
        reject("a scanning job is in progress");
        return;
      }
      try {
        let data = await new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(`${scannerHandle} closed`);
          }, 1000);
        });
        this.opennedScanners.filter((item) => item !== scannerHandle);
        if (this.opennedScanners.length === 0) {
          CURRENT_SCANNING_STATUS = "";
        }
        showNotification("close_scanner", "Scanner closed", data);
        resolve(data);
      } catch (e) {
        showNotification("close_scanner", "Closing failed", e);
        reject(e);
      }
    });
  }
}

// export default DocumentScanSdk;
