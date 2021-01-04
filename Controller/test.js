const serverless = require('serverless-http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const uuid = require('uuid/v4');

const dbConnection = require('../dbconfigs');
const locempService = require('../Services/test');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//  base url to test our API
app.get('/test', async (req, res) => {
  await res.send("Welcome to the Test API for LogRocket Blog serverless Example!!")
})


//  function for creating a new location
app.post('/createlocation', async (req, res) => {
  try {
    await dbConnection();
    const data = req.body;
    const { location, email } = data;
    const dataToSave = { location, email };
    let createLocation = await locempService.createLocation(dataToSave);

    if (createLocation) {
      return res.status(200).send(
        createLocation
      )
    }
  } catch (error) {
    console.log(error.message, "error!!");
    return res.status(400).send(
      error
    )
  }
});

//  function for creating a new employee
app.post('/createemployee', async (req, res) => {
  try {
    await dbConnection();
    const data = req.body;
    const { employeeName, locations } = data;
    if (!data) {
      return "Please pass all required fields!"
    }
    const dataToSave = { employeeName, locations };
    let createEmployee = await locempService.createEmployee(dataToSave);
    if (createEmployee) {
      return res.status(200).send(
        createEmployee
      )
    }
  } catch (error) {
    //  handle errors here
    console.log(error, "error!!");
  }
});

//  function for getting all products
app.get('/getemployee/:employeeName/', async (req, res) => {
  try {
    await dbConnection();
    const { employeeName } = req.params;
    const employee = await locempService.findEmployee(employeeName);
    if (employee) {
      return res.status(200).send({
        data: employee
      })
    }
  } catch (error) {
    //  handle errors here
    console.log(error, "error!!");
  }
})

module.exports.handler = serverless(app);