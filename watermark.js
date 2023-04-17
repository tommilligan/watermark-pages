function createWatermark(text, color) {
  var div = document.createElement("div");
  document.body.appendChild(div);
  div.id = "watermark";
  div.innerText = text;
  div.style = "color:" + color;
}

chrome.runtime.sendMessage(
  undefined,
  window.location.href,
  undefined,
  (response) => {
    if (response) {
      createWatermark(response.text, response.color);
    }
  }
);
