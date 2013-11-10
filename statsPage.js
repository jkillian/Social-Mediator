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
   var siteData = getSiteDataFromStorage();
   var sortedData;
   setTopInfo();
   drawTopSitesChart();
   drawWatchedSitesChart();
   createAllSitesTable();

   function setTopInfo() {
      var totalTimeSecs = 0;
      for(var key in siteData) {
         totalTimeSecs += siteData[key];
      }

      $('#totalTime').text("Total Time Online: " + totalTimeSecs.toHHMMSS());
   }

   function drawTopSitesChart() {
   
      resizeCanvas('topSitesChart');

      var NUM_TOP_SITES = 5;
      var COLORS = ["#A60321", "#048C7F", "#04BF7B", "#F2CA50", "#D93D04"];

      // Just do this once above
      //var siteData = getSiteDataFromStorage();

      var dataArr = [];
      for(var domain in siteData) {
         dataArr.push({site: domain, secondsOnSite: siteData[domain]});
      }
      dataArr.sort(function(site1, site2) {
         return site2.secondsOnSite - site1.secondsOnSite ;
      });

      sortedData = dataArr;

      var chartData = [];
      for(var i=0; i<dataArr.length && i<NUM_TOP_SITES; ++i) {
         var site = dataArr[i];
         var color = COLORS[i % COLORS.length];
         chartData.push({value: site.secondsOnSite, color: color });
         $('#topSitesTable > tbody:last').append('<tr><td><div class="square" style="background-color:' + color + '"></div></td><td>' + site.site + '</td><td>' + site.secondsOnSite.toHHMMSS() +  '</td></tr>');
         console.log("Site: " + site.site + " Time: " + site.secondsOnSite + " Color: " + color);
      }

      var ctx = document.getElementById("topSitesChart").getContext("2d");
      var myNewChart = new Chart(ctx).Doughnut(chartData, {});
   }

   function drawWatchedSitesChart() {
   
      resizeCanvas('watchedSitesChart');

      var COLORS = ["#A60321", "#048C7F", "#04BF7B", "#F2CA50", "#D93D04"];

      chrome.storage.local.get('watchedSites', function(data){
         var watchedSites = data.watchedSites;
         if(!watchedSites || watchedSites.length == 0) {

         }
         else {
            var dataArr = [];
            for(var i =0; i<watchedSites.length; ++i) {
               var domain = watchedSites[i];
               if(siteData[domain]) {
                  dataArr.push({site: domain, secondsOnSite: siteData[domain]});
               }
               else {
                  dataArr.push({site: domain, secondsOnSite: 0});
               }
            }

            dataArr.sort(function(site1, site2) {
               return site2.secondsOnSite - site1.secondsOnSite ;
            });

            var chartData = [];
            for(var i=0; i<dataArr.length; ++i) {
               var site = dataArr[i];
               var color = COLORS[i % COLORS.length];
               chartData.push({value: site.secondsOnSite, color: color });
               $('#watchedSitesTable > tbody:last').append('<tr><td><div class="square" style="background-color:' + color + '"></div></td><td>' + site.site + '</td><td>' + site.secondsOnSite.toHHMMSS() +  '</td></tr>');
               console.log("Site: " + site.site + " Time: " + site.secondsOnSite + " Color: " + color);
            }

            var ctx = document.getElementById("watchedSitesChart").getContext("2d");
            var myNewChart = new Chart(ctx).Doughnut(chartData, {});

         }
      }); 
   }

   function createAllSitesTable() {
      for(var i=0; i<sortedData.length; ++i) {
         var site = sortedData[i];
         $('#allSitesTable > tbody:last').append('<tr><td>' + (i+1) + '</td><td>' + site.site + '</td><td>' + site.secondsOnSite.toHHMMSS() +  '</td></tr>');
      }
      
   }


   function getSiteDataFromStorage() {
      var returnData = {};
      var numSites = localStorage.length;
      for(var i=0; i<numSites; ++i)
      {
         var key = localStorage.key(i);
         if(key.indexOf('://') == -1) {
            returnData[key] = localStorage.getItem(key)/1000;
         } 
      }
      return returnData;
   }


   function resizeCanvas(canvasId) {
      var cDiv = $('#' + canvasId + 'Div');
      var canvas = document.getElementById(canvasId);
      canvas.height = cDiv.innerHeight();
      canvas.width = cDiv.innerWidth();
   }
}
