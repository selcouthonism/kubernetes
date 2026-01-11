const os = require('os');
const { getDefaultColor } = require('../utils/colorUtils');

class ColorController {
  constructor(colorService) {
    this.colorService = colorService;
    this.appName = process.env.APP_NAME || 'default_app_name';
    this.hostname = os.hostname();
  }

  async getApi(req, res) {
    try {
      const { format, colorKey } = req.query;

      // Backward compatibility: format parameter (v1.1.0)
      if (format) {
        return this.handleFormatResponse(req, res);
      }

      // New behavior: colorKey parameter (v2.0.0)
      if (colorKey) {
        const color = await this.colorService.getColorByKey(colorKey);
        if (!color) {
          return res.status(404).json({ error: 'Color not found' });
        }
        const timestamp = new Date().toISOString();

        return res.json({
          app: this.appName,
          color: color.value,
          colorKey: color.key,
          hostname: this.hostname,
          timestamp
        });
      }

      // Default behavior: neither format nor colorKey provided
      const color = await getDefaultColor();
      return res.send(`App: ${this.appName}, Color: ${color}, Hostname: ${this.hostname}`);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async handleFormatResponse(req, res) {
    const { format } = req.query;

    if (typeof format !== 'string') {
      return res.status(400).json({ error: 'Invalid format parameter' });
    }

    const color = await getDefaultColor();

    if (format.toLowerCase() === 'json') {
      return res.json({
        app: this.appName,
        color: color,
        hostname: this.hostname
      });
    } else {
      return res.send(`App: ${this.appName}, Color: ${color}, Hostname: ${this.hostname}`);
    }
  }

  async getAllColors(req, res) {
    try {
      const colors = await this.colorService.getAllColors();
      res.json({
        total: colors.length,
        colors: colors.map(c => c.toDocument())
      });
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async getColorByKey(req, res) {
    try {
      const { key } = req.params;
      const color = await this.colorService.getColorByKey(key);
      res.json(color.toDocument());
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async createColor(req, res) {
    try {
      const { key } = req.params;

      if (!key || key.trim().length === 0) {
        return res.status(400).json({ error: 'Color key cannot be empty' });
      }

      const { value, description } = req.body;

      if (!value) {
        return res.status(400).json({
          error: 'value field is required in request body'
        });
      }

      const result = await this.colorService.createColor(key, value, description);
      res.status(201).json(result);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async updateColor(req, res) {
    try {
      const { key } = req.params;
      const { value, description } = req.body;

      if (!value) {
        return res.status(400).json({
          error: 'value field is required in request body'
        });
      }

      const result = await this.colorService.updateColor(key, value, description);
      res.json(result);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async deleteColor(req, res) {
    try {
      const { key } = req.params;
      const result = await this.colorService.deleteColor(key);
      res.json(result);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  handleError(error, res) {
    console.error('Controller error:', error);
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal server error';
    res.status(statusCode).json({ error: message });
  }
}

module.exports = ColorController;
