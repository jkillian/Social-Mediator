Number.prototype.toHHMMSS = function () {
    var seconds = Math.floor(this),
        hours = Math.floor(seconds / 3600);
    seconds -= hours*3600;
    var minutes = Math.floor(seconds / 60);
    seconds -= minutes*60;

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
};

$(updateScreen);

function updateScreen() {
  getWatchedSitesFromStorage();

   $('#addBtn').click(function() {
    addRow($('#addFld').val());
   });


   function setWatchedSites(data) {
      for(var i=0; i<data.length; ++i) {
        var siteName = data[i];
        showRow(siteName);
      }
   }

   function getWatchedSitesFromStorage() {
      chrome.storage.local.get("watchedSites", function(data){
           setWatchedSites(data.watchedSites);
      });
   }

   function addRow(siteName) {
      siteName = siteName.toLowerCase();
      chrome.storage.local.get("watchedSites", function(data){
        if(!/^[\w-]+$/.test(siteName)) {
          showAlert("Just enter the name of the site before the .com  ex) facebook")
        }
        else if(data.watchedSites && data.watchedSites.indexOf(siteName) != -1) {
          showAlert("Site already being watched.");
        }
        else {
          hideAlert();
          if(!data.watchedSites) {
            data.watchedSites = [];
          }
          data.watchedSites.push(siteName);
          chrome.storage.local.set({watchedSites: data.watchedSites});
          $('#addFld').val('');
          showRow(siteName);
        }
      });
   }

   function showRow(siteName) {
      $('#watchedSitesTable > tbody:last').append('<tr><td>' + siteName + '</td><td><button id="' + siteName + 'btn" class="small red" data-sitename="' + siteName + '">x</button>' + '</td></tr>');
      $('.small.red').click(function(event){
          var btn = $(this);
          var site = btn.attr('data-sitename');
          chrome.storage.local.get("watchedSites", function(data){
          var watchedSites = data.watchedSites;
          watchedSites.splice(watchedSites.indexOf(site), 1);
          chrome.storage.local.set({watchedSites: watchedSites});
          btn.parent().parent().hide("slow");
        });
      });
   }

   function showAlert(msg) {
    $('div.alert').text(msg);
    $('div.alert').show();
   }

   function hideAlert() {
    $('div.alert').hide();
   }
}


