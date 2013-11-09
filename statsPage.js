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

$(function() {

   drawTopSitesChart();

   function drawTopSitesChart() {
   
   resizeCanvas('topSitesChart');

   var NUM_TOP_SITES = 5;
   var COLORS = ["#A60321", "#048C7F", "#04BF7B", "#F2CA50", "#D93D04"];

   var siteData = getSiteDataFromStorage();

   var dataArr = [];
   for(var domain in siteData) {
      dataArr.push({site: domain, secondsOnSite: siteData[domain]/1000});
   }
   dataArr.sort(function(site1, site2) {
      return site2.secondsOnSite - site1.secondsOnSite ;
   });

   var chartData = [];
   for(var i=0; i<dataArr.length && i<NUM_TOP_SITES; ++i) {
      var site = dataArr[i];
      var color = COLORS[i % COLORS.length];
      var minutes = secondsToMinutes(site.secondsOnSite);
      chartData.push({value: site.secondsOnSite, color: color });
      $('#topSitesTable > tbody:last').append('<tr><td><div class="square" style="background-color:' + color + '"></div></td><td>' + site.site + '</td><td>' + site.secondsOnSite.toHHMMSS() +  '</td></tr>');
      console.log("Site: " + site.site + " Time: " + site.secondsOnSite + " Color: " + color);
   }

   var ctx = document.getElementById("topSitesChart").getContext("2d");
   var myNewChart = new Chart(ctx).Doughnut(chartData, {});

   }


   function getSiteDataFromStorage() {
      var returnData = {};
      var numSites = localStorage.length;
      for(var i=0; i<numSites; ++i)
      {
         var key = localStorage.key(i);
         returnData[key] = localStorage.getItem(key);
      }
      return returnData;
   }


   function resizeCanvas(canvasId) {
      var cDiv = $('#' + canvasId + 'Div');
      var canvas = document.getElementById(canvasId);
      canvas.height = cDiv.innerHeight();
      canvas.width = cDiv.innerWidth();
   }

   function secondsToMinutes(secs) {
      var mins = secs/60;
      mins = Math.round(mins*100)/100;
      return mins;
   }
});

