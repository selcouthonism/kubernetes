const express = require('express');
const os = require('os');
const { getDefaultColor } = require('../utils/colorUtils');

const router = express.Router();

// Home endpoint
router.get('/', async (req, res) => {
    const timestamp = new Date().toISOString();
    const appName = process.env.APP_NAME || 'default_app_name';
    const hostname = os.hostname();
    const color = await getDefaultColor();

    res.send(`<h1 style="color: ${color};">Hello from: ${appName}. Current time is: ${timestamp} </h1><h2>Hostname: ${hostname}</h2>`);
});

module.exports = router;