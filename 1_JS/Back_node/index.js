const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.json());


app.listen(port, () => console.log(`Listening to port ${port}`));
