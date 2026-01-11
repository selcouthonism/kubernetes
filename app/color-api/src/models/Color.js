class Color {
  constructor(key, value, description = '', createdAt = null, updatedAt = null) {
    this.key = key;
    this.value = value;
    this.description = description;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  toDocument() {
    return {
      key: this.key,
      value: this.value,
      description: this.description,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  static fromDocument(doc) {
    if (!doc) return null;
    return new Color(doc.key, doc.value, doc.description, doc.createdAt, doc.updatedAt);
  }
}

module.exports = Color;
