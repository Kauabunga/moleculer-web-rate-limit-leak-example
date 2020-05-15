class MemoryStore {
  constructor(clearPeriod) {
    this.hits = new Map();
    this.resetTime = Date.now() + clearPeriod;
  }

  inc(key) {
    let counter = this.hits.get(key) || 0;
    counter++;
    this.hits.set(key, counter);
    return counter;
  }

  reset() {
    this.hits.clear();
  }
}

module.exports = MemoryStore;
