function deleteRow(row) {
  const rowNode = row.parentNode.parentNode;
  const tableNode = rowNode.parentNode;
  tableNode.deleteRow(rowNode.rowIndex);
}

function insertRow() {
  var tableNode = document.getElementById("ruleTable");
  var newRow = tableNode.rows[1].cloneNode(true);
  tableNode.appendChild(newRow);
}

async function loadTableData() {
  let data = await chrome.storage.local.get(["data"]);
  console.log("Got data", data);
  //setup our table array
  data = {
    rules: [
      {
        path: "https://cloud.uipath.com/.*",
        data: {
          text: "PRODUCTION",
          color: "red",
        },
      },
      {
        path: "https://developer.chrome.com/.*",
        data: {
          text: "TEST",
          color: "orange",
        },
      },
    ],
  };

  let table = document.createElement("table");
  table.style = "border: 1px solid grey; border-collapse: collapse";
  table.insertRow();
  for (let header of ["Pattern", "Text", "Color", "Action"]) {
    let newCell = table.rows[table.rows.length - 1].insertCell();
    newCell.style = "border: 1px solid grey; border-collapse: collapse";
    newCell.textContent = header;
  }

  for (let rule of data.rules) {
    table.insertRow();
    const getRow = function () {
      return table.rows[table.rows.length - 1];
    };
    for (let value of [rule.path, rule.data.text, rule.data.color]) {
      let newCell = getRow().insertCell();
      newCell.style = "border: 1px solid grey; border-collapse: collapse";
      let input = document.createElement("input");
      input.size = 25;
      input.type = "text";
      input.value = value;
      newCell.appendChild(input);
    }
    let newCell = getRow().insertCell();
    newCell.style = "border: 1px solid grey; border-collapse: collapse";
    let input = document.createElement("input");
    input.type = "button";
    input.value = "Delete";
    input.onclick = function () {
      deleteRow(this);
    };
    newCell.appendChild(input);
  }

  document.getElementById("ruleDiv").appendChild(table);

  let input = document.createElement("input");
  input.type = "button";
  input.value = "Add Rule";
  input.onclick = function () {
    deleteRow(this);
  };
  newCell.appendChild(input);
}

loadTableData().catch(console.error);
