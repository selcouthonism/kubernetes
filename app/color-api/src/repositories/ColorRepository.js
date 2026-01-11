const Color = require('../models/Color');

class ColorRepository {
  constructor(database) {
    this.db = database;
    this.collectionName = 'colors';
  }

  async getCollection() {
    const db = this.db.getDB();
    return db.collection(this.collectionName);
  }

  async ensureIndexes() {
    try {
      const collection = await this.getCollection();
      await collection.createIndex({ key: 1 }, { unique: true });
      console.log('Database indexes created');
    } catch (error) {
      console.error('Error creating indexes:', error);
    }
  }

  async findByKey(key) {
    try {
      const collection = await this.getCollection();
      const doc = await collection.findOne({ key });
      return Color.fromDocument(doc);
    } catch (error) {
      console.error(`Error finding color by key ${key}:`, error);
      throw error;
    }
  }

  async findAll() {
    try {
      const collection = await this.getCollection();
      const docs = await collection.find({}).toArray();
      return docs.map(doc => Color.fromDocument(doc));
    } catch (error) {
      console.error('Error finding all colors:', error);
      throw error;
    }
  }

  async create(color) {
    try {
      const collection = await this.getCollection();
      const result = await collection.insertOne(color.toDocument());
      return result.insertedId;
    } catch (error) {
      if (error.code === 11000) {
        throw new Error(`Color with key '${color.key}' already exists`);
      }
      console.error('Error creating color:', error);
      throw error;
    }
  }

  async update(key, color) {
    try {
      const collection = await this.getCollection();
      color.updatedAt = new Date();
      const result = await collection.updateOne(
        { key },
        { $set: color.toDocument() }
      );
      return result.modifiedCount > 0;
    } catch (error) {
      console.error(`Error updating color ${key}:`, error);
      throw error;
    }
  }

  async delete(key) {
    try {
      const collection = await this.getCollection();
      const result = await collection.deleteOne({ key });
      return result.deletedCount > 0;
    } catch (error) {
      console.error(`Error deleting color ${key}:`, error);
      throw error;
    }
  }
}

module.exports = ColorRepository;
