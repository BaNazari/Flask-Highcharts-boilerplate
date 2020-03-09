

export {synchArrayOfObjectMaker, SynchChartDataMaker}

// Prepare data and object for the synchronized chart
function synchArrayOfObjectMaker(data) {
    let synchData = SynchChartDataMaker(data)

    let synchArrayObj = [];

    synchData.datasets.forEach(function (dataset, i) {
        let obj = {}
        obj.chart = {
            marginLeft: 40, // Keep all charts left aligned
            spacingTop: 20,
            spacingBottom: 20,
            zoomType: 'x',
            style: {
                fontFamily: 'serif',
            }
        }
        obj.accessibility = {
            description: 'A collection of 9 line charts which are synchronized and aligend to show the walked distance for different age ranges'
        }
        obj.title = {
            text: dataset.name,
            align: 'left',
            margin: 0,
            x: 30,
            style: {
                fontSize: '15px'
            }
        }
        obj.credits = {
            enabled: false
        }
        obj.legend = {
            enabled: false
        }
        obj.xAxis = {
            crosshair: true,
            events: {
                setExtremes: syncExtremes
            },
            labels: {
                format: '{value}'
            }
        }
        obj.yAxis = {
            title: {
                text: null
            }
        }
        obj.tooltip = {
            positioner: function () {
                return {
                    // right aligned
                    x: this.chart.chartWidth - this.label.width,
                    y: 10 // align to title
                };
            },
            borderWidth: 0,
            backgroundColor: 'none',
            pointFormat: '{point.y}',
            headerFormat: '',
            shadow: false,
            style: {
                fontSize: '15px'
            },
            valueDecimals: dataset.valueDecimals
        }
        obj.series = [{
            data: dataset.data,
            name: dataset.name,
            type: dataset.type,
            color: Highcharts.getOptions().colors[i],
            fillOpacity: 0.3,
            tooltip: {
                valueSuffix: ' ' + dataset.unit
            }
    
        }]
        synchArrayObj.push(obj)

    })
    //console.log(synchArrayObj)
    return synchArrayObj

}

function SynchChartDataMaker(data) {
    let SynchChartObject = {}
    let xData = [];
    let datasets = [];
    for (let i = 0; i < data.sensor_data.length; i++) {
        xData.push(i)
    }
    for (let j = 1; j < data.sensor_data[0].length; j++) {
        let row = {};
        row.name = data.sensor_data[0][j];
        row.unit = 'KM';
        row.type = 'line';
        row.data = []
        for (let r = 1; r < data.sensor_data.length; r++) {
            row.data.push(Number(data.sensor_data[r][j]))
        }
        datasets.push(row)
    }

    SynchChartObject.xData = xData;
    SynchChartObject.datasets = datasets

    return SynchChartObject

}


// Set common extremes for charts (from the Highcharts library)
function syncExtremes(e) {
    var thisChart = this.chart;

    if (e.trigger !== 'syncExtremes') { // Prevent feedback loop
        Highcharts.each(Highcharts.charts, function (chart) {
            if (chart !== thisChart) {
                if (chart.xAxis[0].setExtremes) { // It is null while updating
                    chart.xAxis[0].setExtremes(
                        e.min,
                        e.max,
                        undefined,
                        false,
                        { trigger: 'syncExtremes' }
                    );
                }
            }
        });
    }
}

