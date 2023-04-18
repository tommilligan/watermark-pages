function createWatermark(text, color) {
  var div = document.createElement("div");
  document.body.appendChild(div);
  div.id = "watermark";
  div.innerText = text;
  div.style = "color:" + color;
}

async function getData() {
  let data = await chrome.storage.local.get(["data"]);
  console.log("Got data", data);
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

  return {
    rules: data.rules.map(({ path, data }) => {
      return { path: new RegExp(path), data };
    }),
  };
}

async function getPathData(href) {
  const data = await getData();
  var result = data.rules.find((rule) => href.match(rule.path));
  if (result) {
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
