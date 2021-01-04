const serverless = require('serverless-http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const uuid = require('uuid/v4');
const dbConnection = require('../dbconfigs');
const ProductService = require('../Services/product');
//const CustomError = require('../class/error');
const ErrorLog = require('../Logic/error');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//  base url to test our API
app.get('/index', async (req, res) => {
  await res.send("<h3>Welcome to the Product API for LogRocket Blog serverless Example!!</h3>")
})

//  function for creating a new product
app.post('/', async (req, res) => {
  try {
    await dbConnection();
    const data = req.body;
    const { name, type, description, cost } = data;
    if (!data) {
      return "Please pass all required fields!"
    }
    const dataToSave = { name, type, description, cost, productId: uuid() };
    let createProduct = await ProductService.createProduct(dataToSave);
    if (createProduct) {
      return res.status(200).send(
        createProduct
      )
    }
  } catch (error) {
    //  handle errors here
    let errname = error.name;
    let errmsg = error.message;
    let customerror = "Error Occured in Product Controller and Create Product API "
    const dataToSave = { errname, errmsg, customerror };
    const errors = await ErrorLog.createErrorlog(dataToSave);
    if (errors) {
      return res.status(200).send({
        data: errors
      })
    }
  }
})

//  function for getting all products
app.get('/getproduct', async (req, res) => {
  await dbConnection();
  try {
    const allProducts = await ProductService.getAllProduct();
    if (allProducts) {
      return res.status(200).send({
        data: allProducts
      })
    }
  } catch (error) {
    //  handle errors here
    let errname = error.name;
    let errmsg = error.message;
    let customerror = "Error Occured in Product Controller and GetProduct API "
    const dataToSave = { errname, errmsg, customerror };
    const errors = await ErrorLog.createErrorlog(dataToSave);
    if (errors) {
      return res.status(200).send({
        data: errors
      })
    }
    //throw new CustomError('Error in Get Product Funtion');
  }
})


//  function for getting a  product by Id
app.get('/:_id/', async (req, res) => {
  try {
    await dbConnection();
    const { _id } = req.params;
    const getProduct = await ProductService.getProductById({ _id });
    if (getProduct) {
      return res.status(200).send({
        data: getProduct
      })
    }
  } catch (error) {
    //  handle errors here
    let errname = error.name;
    let errmsg = error.message;
    let customerror = "Error Occured in Product Controller and GetProduct By Id API "
    const dataToSave = { errname, errmsg, customerror };
    const errors = await ErrorLog.createErrorlog(dataToSave);
    if (errors) {
      return res.status(200).send({
        data: errors
      })
    }
  }
});

module.exports.handler = serverless(app);