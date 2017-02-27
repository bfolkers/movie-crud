require('dotenv').config()
const express = require('express');
const app = express();
const routes = require('./routes.js');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;

app.use(express.static("public"));

app.use(bodyParser.json());
app.use('/', routes);

app.listen(PORT, function () {
    console.log(`Server listening on port ${PORT}`);
});

// module.exports = app
