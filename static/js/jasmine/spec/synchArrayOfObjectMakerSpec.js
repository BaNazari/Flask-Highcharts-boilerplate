
import { SynchChartDataMaker } from '../../synchArrayOfObjectMaker.js'

var rawData = {
    "sensor_data": [["Index", "5-10", "10-15"],
    ["0", "5", "2"],
    ["1", "8", "7"]]
}

var modifiedData = {
    xData: [0, 1, 2],
    datasets: [{ name: "5-10", unit: "KM", type: "line", data: [5, 8] },
    { name: "10-15", unit: "KM", type: "line", data: [2, 7] }]
}

describe("Synchronized", function () {
    it("should modify data model for synchronized chart", function () {
        expect(SynchChartDataMaker(rawData)).toEqual(modifiedData)
    })
})

