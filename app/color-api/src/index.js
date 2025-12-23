const express = require('express');
const os = require('os');

const app = express();
const appName = process.env.APP_NAME || 'default_app_name';
const port = process.env.PORT || 80;
const color = "blue";
const hostname = os.hostname();

app.get('/', (req, res) => {
    const timestamp = new Date().toISOString();
    res.send(`<h1 style="color: ${color};">. Hello from: ${appName}. Current time is: ${timestamp} </h1><h2>Hostname: ${hostname}</h2>`);
});

app.get('/api', (req, res) => {
  const format = req.query.format;

  if (format && format.toLowerCase() === 'json') {
        res.json({
            app: appName,
            color: color,
            hostname: hostname
        });
    } else {
        res.send(`App: ${appName}, Color: ${color}, Hostname: ${hostname}`);
    }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});