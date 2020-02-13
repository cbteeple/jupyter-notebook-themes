var linkElementId = "jupyter-notebook-custom-css";


function insertCSS(themeName) {
  var themeFilePath = "themes/" + themeName + ".css";

  var linkElement = document.createElement("link");

  linkElement.href = chrome.extension.getURL(themeFilePath);
  linkElement.id = linkElementId;
  linkElement.classList.add(linkElementId);
  linkElement.name = themeName;
  linkElement.type = "text/css";
  linkElement.rel = "stylesheet";

  document.getElementsByTagName("head")[0].appendChild(linkElement);
}


function removeCSS() {
  var linkElements = document.getElementsByClassName(linkElementId);

  for(var i=0; i<linkElements.length; i++) {
      linkElements[i].remove()
  }
  //linkElement && linkElement.parentNode.removeChild(linkElement);
}


function onExtensionMessage(request) {
  if (request.activate) {
    removeCSS();
    insertCSS(request.theme);
  } else {
    removeCSS();
  }
}


function initContentScript() {
  chrome.extension.onMessage.addListener(onExtensionMessage);
}


initContentScript();
