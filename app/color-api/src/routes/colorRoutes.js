const express = require('express');

function createColorRoutes(colorController) {
  const router = express.Router();

  // GET /api
  router.get('/', (req, res) => colorController.getApi(req, res));

  // GET /api/color - Returns all stored colors
  router.get('/color', (req, res) => colorController.getAllColors(req, res));

  // GET /api/color/:key - Returns color by key
  router.get('/color/:key', (req, res) => colorController.getColorByKey(req, res));

  // POST /api/color/:key - Creates a new color
  router.post('/color/:key', (req, res) => colorController.createColor(req, res));

  // PUT /api/color/:key - Updates existing color
  router.put('/color/:key', (req, res) => colorController.updateColor(req, res));

  // DELETE /api/color/:key - Deletes a color
  router.delete('/color/:key', (req, res) => colorController.deleteColor(req, res));

  return router;
}

module.exports = createColorRoutes;
