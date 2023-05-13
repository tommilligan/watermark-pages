const COLUMNS = [
  { key: "path", name: "URL Pattern" },
  { key: "text", name: "Watermark" },
  { key: "color", name: "Color" },
];

async function loadTableData() {
  let data = (await chrome.storage.sync.get(["data"])).data || [];
  return data;
}

function appendDeleteButton(table, row) {
  // Create delete button
  const deleteBtnCell = row.insertCell();
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => {
    table.deleteRow(row.rowIndex);
  });
  deleteBtnCell.appendChild(deleteBtn);
}

function appendInputCell(row, value) {
  const cell = row.insertCell();
  const input = document.createElement("input");
  input.type = "text";
  input.value = value;
  cell.appendChild(input);
}

// Function to create a table from the JSON data
function createTableFromData(data) {
  document.getElementById("ruleDiv").textContent = "";
  const table = document.createElement("table");
  table.id = "ruleTable";

  // Create table header
  const headerRow = table.insertRow();
  for (const column of COLUMNS) {
    const th = document.createElement("th");
    const div = document.createElement("div");
    div.textContent = column.name;
    div.style = "width: 185px";
    th.appendChild(div);
    headerRow.appendChild(th);
  }

  // Create table rows
  for (const obj of data) {
    const row = table.insertRow();
    for (const column of COLUMNS) {
      appendInputCell(row, obj[column.key]);
    }
    appendDeleteButton(table, row);
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
    for (const column of COLUMNS) {
      appendInputCell(row, "");
    }
    appendDeleteButton(table, row);
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
    for (let rowIndex = 1; rowIndex < rows.length; rowIndex++) {
      const obj = {};

      COLUMNS.forEach(function (column, columnIndex) {
        const input = rows[rowIndex].cells[columnIndex].querySelector("input");
        obj[column.key] = input.value;
      });
      newData.push(obj);
    }
    chrome.storage.sync.set({ data: newData }).catch(console.error);
  });

  document.body.appendChild(saveBtn);
}

createAddRowButton();
createSaveButton();
loadTableData().then(createTableFromData).catch(console.eror);
