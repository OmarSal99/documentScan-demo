import { DocumentScanSdk } from "./node_modules/document-scan-sdk/index.js";
const documentScanSdk = new DocumentScanSdk();
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("container");
  const colors = {
    backgroundColor: "#edf3fa",
    tableHeader: "#1065b4",
    tableRowHover: "#a9d2f8",
    scannerWrapper: "#1065b4",
    tableButtonHover: "#71b5f5",
  };
  documentScanSdk.renderDefaultUI(container, colors);
});
