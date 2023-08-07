// const getScannersButton = document.getElementById("getScanners");
const cancelButton = document.getElementById("cancelBtn");
// const connectButton = document.getElementById("connect");

let currentOpennedScanners = [];
function createButton(label, id, onClicked) {
  const button = document.createElement("button");
  button.innerHTML = label;
  button.id = id;
  button.onclick = onClicked;
  button.classList.add("table-button");
  return button;
}

const onOpenButtonClicked = async (scannerId) => {
  let handle = await documentScan.openScannerdev(scannerId);
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
  container.replaceChild(img, container.lastChild);
  mask.classList.add("gradient-mask");
  await documentScan.startScanner(scannerHandle);
  document
    .getElementById("scanSatusDiv")
    .replaceChildren(document.createTextNode("Ready"));
  mask.classList.remove("gradient-mask");
};

const onCloseButtonClicked = async (scannerHandle, scannerId) => {
  try {
    await documentScan.closeScannerDev(scannerHandle);
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

// getScannersButton.addEventListener("click", () => {});

cancelButton.addEventListener("click", async () => {
  let handle = await documentScan.cancelScannner();
});

document.addEventListener("DOMContentLoaded", () => {
  documentScan.getScannerList({}).then((scanners) => {
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
    //table.removeChild(table.lastChild);
    table.replaceChild(tbody, table.lastChild);
  });
});
// usbButton.addEventListener("click", async () => {
//   let handle = await documentScan.openScannerdev(5);
//   documentScan
//     .startScanner(handle)
//     .then((data) => console.log(data))
//     .catch((error) => console.log(error));
// });
