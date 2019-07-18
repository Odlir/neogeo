const express = require("express");
const endpoints = require("./endpoints");
const Joi = require("@hapi/joi");
const swaggerDoc = require('./swaggerDoc');

const app = express();
app.use(express.json());

endpoints(app);
swaggerDoc(app);

app.use((err, req, res, next) => console.error('error', err));

const port = process.env.PORT || 3001;
app.listen(port, () => console.log("Listening on port 3001"));
