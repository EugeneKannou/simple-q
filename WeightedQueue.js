class WeightedQueue {
    constructor() {
        this.queue = [];
    }

    enqueue(item, weight) {
        this.queue.push({ value: item, weight });
    }

    dequeue() {
        let minIndex = 0;
        for (let i = 1; i < this.queue.length; i++) {
            if (this.queue[i].weight < this.queue[minIndex].weight) {
                minIndex = i;
            }
        }
        return this.queue.splice(minIndex, 1)[0].value;
    }

    size() {
        return this.queue.length;
    }

    isEmpty() {
        return this.queue.length === 0;
    }
}

module.exports.WeightedQueue = WeightedQueue;
