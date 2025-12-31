const express = require('express');
const os = require('os');

const app = express();
const appName = process.env.APP_NAME || 'default_app_name';
const port = process.env.PORT || 80;
const color = "blue";
const hostname = os.hostname();

const delay_startup = process.env.DELAY_STARTUP === 'true';
const fail_liveness = process.env.FAIL_LIVENESS === 'true';
const fail_readiness = process.env.FAIL_READINESS === 'true' ? Math.random() < 0.5 : false;

console.log(`delay_startup: ${delay_startup}`);
console.log(`fail_liveness: ${fail_liveness}`);
console.log(`fail_readiness: ${fail_readiness}`);

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

// Startup Probe
app.get('/up', (req, res) => {
    return res.status(200).send('OK');
});

// Liveness Probe
app.get('/health', (req, res) => {
     if (fail_liveness) {
        return res.status(503).send('Not Alive');
    }
    return res.status(200).send('Alive');
});

// Readiness Probe
app.get('/ready', (req, res) => {
    if (fail_readiness) {
        return res.status(503).send('Not Ready');
    }
    return res.status(200).send('Ready');
});

if (delay_startup) {
    console.log('Delaying startup by 60 seconds...');
    const start = Date.now();

    while (Date.now() - start < 60000) {
        // Busy-wait to simulate startup delay
    }
}

app.listen(port, () => {
    console.log(`Server listening on port ${port}${delay_startup ? ' — startup delay 60s applied' : ''}`);
});