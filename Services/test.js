const { Employee, Location } = require('../Model/test');

module.exports = {
    async createLocation(loc) {
        // let result = await Location.create(loc);
        var location = new Location(loc);
        var error = location.validateSync();
        let result = await location.save();

        if (result) {
            return {
                data: result,
                message: "Location successfully created!"
            };
        }
        // return "Error creating new Location"
    },
    async createEmployee(emp) {
        let result = await Employee.create(emp);
        if (result) {
            return {
                data: emp,
                message: "Employee successfully created!"
            };
        }
        return "Error creating new Employee"
    },

    async findEmployee(emp) {
        let result = await Employee.findOne({ employeeName: emp }, { employeeName: 1, '_id': 0, locations: 1 })
            .populate({ path: "locations" })
            .exec();

        if (result) {
            return result;
        } else {
            return "Oops! Data Not Available"
        };

    }
}