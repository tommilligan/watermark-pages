var resolveData;
const DATA = new Promise((resolve, reject) => {
  resolveData = resolve;
});

chrome.runtime.onInstalled.addListener(async () => {
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

  resolveData({
    rules: data.rules.map(({ path, data }) => {
      return { path: new RegExp(path), data };
    }),
  });
});

async function getPathData(message) {
  const data = await DATA;
  var result = data.rules.find((rule) => message.match(new RegExp(rule.path)));
  if (result) {
    return result.data;
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Received message", message);
  getPathData(message).then((response) => {
    console.log("Sending response", response);
    sendResponse(response);
  });
  return true;
});
