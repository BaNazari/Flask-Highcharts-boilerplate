
"use strict"
    
import {lineCharObjecttMaker} from "./lineCharObjecttMaker.js"
import {synchArrayOfObjectMaker, SynchChartDataMaker} from "./synchArrayOfObjectMaker.js"


document.getElementById('page-body').onload = getData()


// Draw charts at once
function getData() {
    var sensorData = new XMLHttpRequest()
    sensorData.open("GET", '/data', true)
    sensorData.send()

    sensorData.onload = function () {

        let data = JSON.parse(this.response)
        //console.log(data)
        Highcharts.chart('container2', lineCharObjecttMaker(data))

        for (let i = 0; i<SynchChartDataMaker(data).datasets.length; i++) {
            var chartDiv = document.createElement('div');
            chartDiv.className = 'chart';
            document.getElementById('container1').appendChild(chartDiv)
            Highcharts.chart(chartDiv, synchArrayOfObjectMaker(data)[i]);
        }

    }

    sensorData.onerror = function () {
        console.log("Something went wrong :(");
      };


}


// Synchronize the pont highlighters within the whole synchronized chart (from the Highcharts library)
['mousemove', 'touchmove', 'touchstart'].forEach(function (eventType) {
    document.getElementById('container1').addEventListener(
        eventType,
        function (e) {
            var chart,
                point,
                i,
                event;
            for (i = 0; i < Highcharts.charts.length; i = i + 1) {
                chart = Highcharts.charts[i];
                // Find coordinates within the chart
                event = chart.pointer.normalize(e);
                // Get the hovered point
                point = chart.series[0].searchPoint(event, true);

                if (point) {
                    point.highlight(e);
                    let number = point.x

                    //console.log(point)
                }


            }
        }
    );
});


//Override the reset function, we don't need to hide the tooltips and crosshairs. (from the Highcharts library)
Highcharts.Pointer.prototype.reset = function () {
    return undefined;
};

//Highlight a point by showing tooltip, setting hover state and draw crosshair (from the Highcharts library)
Highcharts.Point.prototype.highlight = function (event) {
    event = this.series.chart.pointer.normalize(event);
    this.onMouseOver(); // Show the hover marker
    this.series.chart.tooltip.refresh(this); // Show the tooltip
    this.series.chart.xAxis[0].drawCrosshair(event, this); // Show the crosshair
};


