const mongoose = require("mongoose");
const Schema = require('mongoose').Schema;
var uniqueValidator = require('mongoose-unique-validator');


const LocationsSchema = new mongoose.Schema({
    location: {
        type: String,
        required: [true, 'Location can not be empty']
    },
    email: { type: String, index: true, unique: true, required: true }
});
LocationsSchema.plugin(uniqueValidator);
const Location = mongoose.model("Location", LocationsSchema);


const EmployeeSchema = new mongoose.Schema({
    employeeName: String,
    locations:
        [{
            type: Schema.ObjectId,
            ref: "Location"
        }]
});

const Employee = mongoose.model("Employee", EmployeeSchema);

module.exports = {
    Employee,
    Location
};