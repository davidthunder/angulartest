const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const employeeRouters = require('./Routers/employeeRouters');

const app = express();

mongoose
  .connect(
    'mongodb://thundercdb:BRnPntKhKMu6q9thLvEaooMLvIgc1CVfZSHerGcDKzEffoaRO4zWMSz7Ww4fUvLqWtmiMpCWZxm6NZdR7UbZpA%3D%3D@thundercdb.documents.azure.com:10255/?ssl=true'
  )
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(() => {
    console.log('Connection failed!');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT ,PATCH, DELETE, OPTIONS'
  );
  next();
});

app.use('/api/employees', employeeRouters);

module.exports = app;
