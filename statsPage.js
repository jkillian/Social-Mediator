$(function() {

   var NUM_TOP_SITES = 3;
   var COLORS = ["#ff0000", "#00ff00", "#0000ff"];

   var siteData = {
      "facebook.com": 1000*60*100,
      "twitter.com": 1000*60*45,
      "espn.com": 1000*60*10,
      "actualWork.com": 1000*60*2
   };

   var dataArr = [];
   for(var domain in siteData) {
      dataArr.push({site: domain, secondsOnSite: siteData[domain]/1000});
   }

   dataArr.sort(function(site1, site2) {
      return site1.secondsOnSite - site2.secondsOnSite;
   });

   var chartData = [];

   for(var i=0; i<dataArr.length && i<NUM_TOP_SITES; ++i) {
      var site = dataArr[i];
      chartData.push({value: site.secondsOnSite, color: COLORS[i % COLORS.length] });
   }

   console.log("context: " + " " + ctx);
   var ctx = document.getElementById("overviewChart").getContext("2d");
   var myNewChart = new Chart(ctx).Doughnut(chartData, {});
   console.log("Chart!" + " " + myNewChart);
});

