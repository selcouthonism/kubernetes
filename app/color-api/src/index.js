const express = require('express');

const app = express();
const appName = process.env.APP_NAME || 'default_app_name';
const port = process.env.PORT || 80;


app.get('/', (req, res) => {
    const timestamp = new Date().toISOString();
    res.send(`<h1 style="color:blue;">. Hello from: ${appName}. Current time is: ${timestamp} </h1>`);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});