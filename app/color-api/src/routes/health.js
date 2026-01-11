const express = require('express');

const healthRouter = express.Router();

const fail_liveness = process.env.FAIL_LIVENESS === 'true';
//const fail_readiness_enabled = process.env.FAIL_READINESS === 'true' ? Math.random() < 0.5 : false;
const fail_readiness_enabled = process.env.FAIL_READINESS === 'true';

console.log(`fail_liveness: ${fail_liveness}`);
console.log(`fail_readiness: ${fail_readiness_enabled}`);

// Startup Probe
healthRouter.get('/up', (req, res) => {
    return res.status(200).send('OK');
});

// Liveness Probe
healthRouter.get('/health', (req, res) => {
     if (fail_liveness) {
        return res.status(503).send('Not Alive');
    }
    return res.status(200).send('Alive');
});

// Readiness Probe
healthRouter.get('/ready', (req, res) => {
    if (fail_readiness_enabled && Math.random() < 0.5) {
        return res.status(503).send('Not Ready');
    }
    return res.status(200).send('Ready');
});

module.exports = healthRouter;