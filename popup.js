(function() {
  document.addEventListener('DOMContentLoaded', function() {
    var themesSelectElement = document.getElementById("themes");

    curr_theme = localStorage.getItem('defaultTheme');
    if(curr_theme != null){
      themesSelectElement.value = curr_theme
    }
    else{
      curr_theme='monokai';
    }

  
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

        var message = {
          activate: true,
          theme: curr_theme
        };

        chrome.tabs.sendMessage(tabs[0].id, message, function(response) {
          console.log(response);
        });
      });


    themesSelectElement.addEventListener("change", function() {
      var themeName = this.value;


      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var themesSelectElement = document.getElementById("themes");
        var themeName = themesSelectElement.value;

        localStorage.setItem('defaultTheme', themeName);

        var message = {
          activate: true,
          theme: themeName
        };

        chrome.tabs.sendMessage(tabs[0].id, message, function(response) {
          console.log(response);
        });
      });


      var linkElementId = "jupyter-notebook-custom-css";
    var linkElement = document.querySelectorAll(linkElementId);
    console.log('link')
    console.log(linkElement)


    });


    var applyButtonElement = document.getElementsByName("apply")[0];
    applyButtonElement.addEventListener("click", function() {

      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var themesSelectElement = document.getElementById("themes");
        var themeName = themesSelectElement.value;

        localStorage.setItem('defaultTheme', themeName);

      });

      window.close();
    });


    var restoreButtonElement = document.getElementsByName("restore")[0];
    restoreButtonElement.addEventListener("click", function() {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var themesSelectElement = document.getElementById("themes");
        var themeName = themesSelectElement.value;

        themesSelectElement.value = 'none'

        var message = {
          activate: false
        };

        chrome.tabs.sendMessage(tabs[0].id, message, function(response) {
          console.log(response);
        });
      });

      //window.close();
    });
   



  });
})();
