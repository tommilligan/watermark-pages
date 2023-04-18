function createWatermark(text, color) {
  var div = document.createElement("div");
  document.body.appendChild(div);
  div.id = "watermark";
  div.innerText = text;
  div.style = "color:" + color;
}

async function getData() {
  let data = (await chrome.storage.sync.get(["data"])).data || [];
  console.log("Loaded stored data", data);

  return {
    rules: data.map(({ path, text, color }) => {
      return { path: new RegExp(path), data: { text, color } };
    }),
  };
}

async function getPathData(href) {
  const data = await getData();
  var result = data.rules.find((rule) => href.match(rule.path));
  if (result) {
    console.log("Relevant data", result);
    return result.data;
  }
}

async function main() {
  const href = window.location.href;
  const data = await getPathData(href);
  if (data) {
    createWatermark(data.text, data.color);
  }
}

main().catch(console.error);
