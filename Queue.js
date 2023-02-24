class Queue {
    constructor() {
        this.queue = [];
        this.lastUpdate = Date.now();
    }

    setLastUpdateToNow() {
        this.lastUpdate = Date.now();
    }
    enqueue(item) {
        this.queue.push(item);
        this.setLastUpdateToNow();
    }

    dequeue() {
        this.setLastUpdateToNow();
        return this.queue.shift();
    }

    size() {
        return this.queue.length;
    }

    isEmpty() {
        return this.queue.length === 0;
    }
}

module.exports.Queue = Queue;
