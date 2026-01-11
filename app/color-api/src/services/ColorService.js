const Color = require('../models/Color');

class ColorService {
  constructor(colorRepository) {
    this.colorRepository = colorRepository;
  }

  async getAllColors() {
    return await this.colorRepository.findAll();
  }

  async getColorByKey(key) {
    const color = await this.colorRepository.findByKey(key);
    if (!color) {
      const error = new Error(`Color with key '${key}' not found`);
      error.statusCode = 404;
      throw error;
    }
    return color;
  }

  async createColor(key, value, description = '') {
    const existingColor = await this.colorRepository.findByKey(key);
    if (existingColor) {
      const error = new Error(`Color with key '${key}' already exists`);
      error.statusCode = 409;
      throw error;
    }

    const color = new Color(key, value, description);
    const result = await this.colorRepository.create(color);
    return { id: result, ...color.toDocument() };
  }

  async updateColor(key, value, description = '') {
    const existingColor = await this.colorRepository.findByKey(key);
    if (!existingColor) {
      const error = new Error(`Color with key '${key}' not found`);
      error.statusCode = 404;
      throw error;
    }

    const updatedColor = new Color(key, value, description, existingColor.createdAt);
    const success = await this.colorRepository.update(key, updatedColor);
    
    if (!success) {
      throw new Error(`Failed to update color with key '${key}'`);
    }

    return updatedColor.toDocument();
  }

  async deleteColor(key) {
    const existingColor = await this.colorRepository.findByKey(key);
    if (!existingColor) {
      const error = new Error(`Color with key '${key}' not found`);
      error.statusCode = 404;
      throw error;
    }

    const success = await this.colorRepository.delete(key);
    if (!success) {
      throw new Error(`Failed to delete color with key '${key}'`);
    }

    return { message: `Color with key '${key}' deleted successfully` };
  }
}

module.exports = ColorService;
