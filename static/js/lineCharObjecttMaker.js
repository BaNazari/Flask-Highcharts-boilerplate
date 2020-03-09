
export {lineCharDatatMaker ,lineCharObjecttMaker}

// Prepare data and object for the line chart
function lineCharObjecttMaker(data) {
    if (typeof data !== 'object')
    throw new TypeError('lineChartObjectMaker() expects only object.');
    
    //Generate the series data
    let series = lineCharDatatMaker(data);


    // series.push({
    //     name: 'Class -1',
    //     type: 'polygon',
    //     data: [[200, 1], [400, 1], [400, 0], [200, 0]],
    //     color: Highcharts.Color(Highcharts.getOptions().colors[3]).setOpacity(0.6).get(),
    //     enableMouseTracking: false

    // }, {
    //     name: 'Class 1',
    //     type: 'polygon',
    //     data: [[0, 1], [200, 1], [200, 0], [0, 0]],
    //     color: Highcharts.Color(Highcharts.getOptions().colors[2]).setOpacity(0.6).get(),
    //     enableMouseTracking: false

    // })


    // Generate line chart object
    let lineChartObject = {
        chart: {
            type: 'spline',
            zoomType: 'x'
        },
        boost: {
            enabled: true
        },
        accessibility: {
            description: 'A collection of 10 line charts which are shown in common coordinate system to show the trend of changes in read values of sensors'
        },

        title: {
            text: 'Recorded amounts of walked distance in each day of the year for age ranges'
        },
        subtitle: {
            text: 'Source: data.csv'
        },

        yAxis: {
            title: {
                text: 'Walked distance'
            }
        },
        xAxis: {
            title: {
                text: 'Days in year'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
        series: series,

    }
    //console.log(series)
    return lineChartObject
}

function lineCharDatatMaker(data) {
    let series = []
    for (let j = 1; j < data.sensor_data[0].length; j++) {
        let row = {};
        row.name = data.sensor_data[0][j]
        row.data = [];
        row.enableMouseTracking = true;
        for (let i = 1; i < data.sensor_data.length; i++) {
            row.data.push([i - 1, Number(data.sensor_data[i][j])])
        }
        series.push(row)
    }
    return series
}
    

