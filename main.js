import { DocumentScanSdk } from "./node_modules/document-scan-sdk/index.js";
const cancelButton = document.getElementById("cancelBtn");
const refreshBtn = document.getElementById("refreshBtn");
const themeBtn = document.getElementById("themeBtn");

let currentOpennedScanners = [];
const documentScanSdk = new DocumentScanSdk();
function createButton(label, id, onClicked) {
  const button = document.createElement("button");
  button.innerHTML = label;
  button.id = id;
  button.onclick = onClicked;
  button.classList.add("table-button");
  return button;
}

const onOpenButtonClicked = async (scannerId) => {
  let handle = await documentScanSdk.openScannerdev(scannerId);
  currentOpennedScanners.push(handle);
  document
    .getElementById(`scanner-${scannerId}`)
    ?.removeChild(document.getElementById(`connectBtn-${scannerId}`));
  document.getElementById(`scanner-${scannerId}`)?.appendChild(
    createButton("Scan", `scanBtn-${scannerId}`, () => {
      onScanButtonClicked(handle);
    })
  );
  document.getElementById(`scanner-${scannerId}`)?.appendChild(
    createButton("Close", `closeBtn-${scannerId}`, () => {
      onCloseButtonClicked(handle, scannerId);
    })
  );
};

const onScanButtonClicked = async (scannerHandle) => {
  document
    .getElementById("scanSatusDiv")
    .replaceChildren(document.createTextNode("Scanning..."));
  cancelButton.disabled = false;
  let img = new Image();
  img.src =
    "https://cdn.spreadsheet123.com/images/ExcelTemplates/price-quote-hourly_lg.png";
  img.alt = "scanner-img";
  let container = document.getElementById("scanner-img");
  let mask = document.getElementById("mask");
  if (container.getElementsByTagName("img").item(0)) {
    container.getElementsByTagName("img").item(0).remove();
  }
  container.appendChild(img);
  mask.classList.add("gradient-mask");
  await documentScanSdk.startScanner(scannerHandle);
  document
    .getElementById("scanSatusDiv")
    .replaceChildren(document.createTextNode("Ready"));
  cancelButton.disabled = true;
  mask.classList.remove("gradient-mask");
};

const onCloseButtonClicked = async (scannerHandle, scannerId) => {
  try {
    await documentScanSdk.closeScannerDev(scannerHandle);
    currentOpennedScanners = currentOpennedScanners.filter(
      (item) => item !== scannerHandle
    );
    let buttonsTd = document.getElementById(`scanner-${scannerId}`);
    buttonsTd?.removeChild(document.getElementById(`scanBtn-${scannerId}`));
    buttonsTd?.removeChild(document.getElementById(`closeBtn-${scannerId}`));
    buttonsTd.appendChild(
      createButton("Connect", `connectBtn-${scannerId}`, () => {
        onOpenButtonClicked(scannerId);
      })
    );
  } catch (e) {
    console.log(e);
  }
};

const onRefresh = () => {
  documentScanSdk.getScannerList({}).then((scanners) => {
    const tbody = document.createElement("tbody");
    scanners.forEach((scanner) => {
      let tr = document.createElement("tr");

      const columnValues = [scanner.id, scanner.name];
      for (const columnValue of columnValues) {
        const td = document.createElement("td");
        td.appendChild(document.createTextNode(columnValue));
        td.setAttribute("align", "center");
        tr.appendChild(td);
      }
      const connectTd = document.createElement("td");
      connectTd.id = `scanner-${scanner.id}`;
      connectTd.appendChild(
        createButton("Connect", `connectBtn-${scanner.id}`, () => {
          onOpenButtonClicked(scanner.id);
        })
      );
      connectTd.classList.add("buttons-td");
      tr.appendChild(connectTd);
      tbody.appendChild(tr);
    });
    const table = document.getElementById("scannersTable");
    table.replaceChild(tbody, table.lastChild);
  });
};

cancelButton.addEventListener("click", async () => {
  document
    .getElementById("scanSatusDiv")
    .replaceChildren(document.createTextNode("Ready"));
  cancelButton.disabled = true;
  let container = document.getElementById("scanner-img");
  container.removeChild(container.getElementsByTagName("img").item(0));
  let mask = document.getElementById("mask");
  mask.classList.remove("gradient-mask");
});

refreshBtn.addEventListener("click", () => {
  onRefresh();
});

const toggler = (function () {
  /** @private {boolean} */
  let toggleState_ = false;

  /**
   * toggles the theme selected, by changing a document attribute.
   */
  const changeTheme = function () {
    toggleState_ = !toggleState_;
    if (toggleState_) {
      document.documentElement.setAttribute("page-theme", "dark");
    } else {
      document.documentElement.setAttribute("page-theme", "light");
    }
  };
  return {
    changeTheme,
  };
})();

themeBtn.addEventListener("click", toggler.changeTheme);

document.addEventListener("DOMContentLoaded", () => {
  onRefresh();
});
