// statsTracker.js
class StatsTracker {
  constructor() {
    this.data = {};
  }

  // Increment a counter by a specific key
  increment(key, count = 1) {
    if (!this.data[key]) {
      this.data[key] = 0;
    }
    this.data[key] += count;
  }

  // Decrement a counter by a specific key
  decrement(key, count = 1) {
    if (!this.data[key]) {
      this.data[key] = 0;
    }
    this.data[key] -= count;
  }

  // Record a time for a specific key
  recordTime(key, value) {
    if (!this.data[key]) {
      this.data[key] = [];
    }
    this.data[key].push(value);
  }

  // Get the average time for a specific key
  getAverageTime(key) {
    if (!this.data[key] || this.data[key].length === 0) {
      return 0;
    }
    const sum = this.data[key].reduce((a, b) => a + b, 0);
    return sum / this.data[key].length;
  }

  // Get the data for a specific key
  getData(key) {
    return this.data[key] || 0;
  }

  // Get all data stored in the tracker
  getAllData() {
    return this.data;
  }
}

module.exports = StatsTracker;
