function deleteRow(row) {
  const rowNode = row.parentNode.parentNode;
  const tableNode = rowNode.parentNode;
  tableNode.deleteRow(rowNode.rowIndex);
}

const DATA_TEMPLATE = {
  path: undefined,
  text: undefined,
  color: undefined,
};

async function loadTableData() {
  let data = (await chrome.storage.sync.get(["data"])).data || [];
  console.log("Got data", data);
  return data;
}

// Function to create a table from the JSON data
function createTableFromData(data) {
  document.getElementById("ruleDiv").textContent = "";
  const table = document.createElement("table");
  table.id = "ruleTable";

  // Create table header
  const headerRow = table.insertRow();
  for (const key in data[0]) {
    const th = document.createElement("th");
    th.textContent = key;
    headerRow.appendChild(th);
  }

  // Create table rows
  for (const obj of data) {
    const row = table.insertRow();
    for (const key in obj) {
      const cell = row.insertCell();
      const input = document.createElement("input");
      input.type = "text";
      input.value = obj[key];
      input["data-key"] = key;
      cell.appendChild(input);
    }
  }
  document.getElementById("ruleDiv").appendChild(table);
}

function createAddRowButton() {
  // Create button to add new row
  const addRowBtn = document.createElement("button");
  addRowBtn.textContent = "Add Row";
  addRowBtn.addEventListener("click", () => {
    const table = document.getElementById("ruleTable");
    const row = table.insertRow();
    for (const key in DATA_TEMPLATE) {
      const cell = row.insertCell();
      const input = document.createElement("input");
      input.type = "text";
      input.value = "";
      input["data-key"] = key;
      cell.appendChild(input);
    }
  });

  document.body.appendChild(addRowBtn);
}

function createSaveButton() {
  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Save";
  saveBtn.addEventListener("click", () => {
    const table = document.getElementById("ruleTable");
    const newData = [];
    const rows = table.rows;
    for (let i = 1; i < rows.length; i++) {
      const obj = {};
      for (let j = 0; j < rows[i].cells.length; j++) {
        const input = rows[i].cells[j].querySelector("input");
        obj[input["data-key"]] = input.value;
      }
      newData.push(obj);
    }
    chrome.storage.sync.set({ data: newData }).catch(console.error);
  });

  document.body.appendChild(saveBtn);
}

createAddRowButton();
createSaveButton();
loadTableData().then(createTableFromData).catch(console.eror);
