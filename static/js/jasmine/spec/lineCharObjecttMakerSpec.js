
import {lineCharDatatMaker} from '../../lineCharObjecttMaker.js'

var rawData = {
    "sensor_data": [["Index", "5-10", "10-15"],
                    ["0", "5", "2"],
                    ["1", "8", "7"]]
}

var modifiedData = [{name: "5-10", data:[[0,5],[1,8]], enableMouseTracking: true},
                    {name: "10-15", data:[[0,2], [1,7]], enableMouseTracking: true}]

//var lineCharDatatMaker = lineCharDatatMaker;


describe("Line chart", function () {
    it("should modify data model for line chart", function () {
        expect(lineCharDatatMaker(rawData)).toEqual(modifiedData)
    })
})

