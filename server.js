const fastify = require('fastify')({logger: true});
const {Queue} = require("./Queue.js");
// const {WeightedQueue} = require("WeightedQueue.js");

const queues = {};
const weightedQueues = {};

fastify.post('/queue', async (request, reply) => {
    if (!request.body["data"]) {
        return reply.code(400).send({success: false, error: "No data specified"})
    }
    if (!request.body["id"]) {
        return reply.code(400).send({success: false, error: "No ID specified"})
    }

    const id = request.body["id"];
    let currentQ;

    if (!queues[id]) {
        currentQ = new Queue();
    } else {
        currentQ = queues[id]
    }

    currentQ.enqueue(request.body["data"]);

    queues[id] = currentQ;

    return reply.code(200).send({success: true, id, written: request.body["data"], length: currentQ.size()});
});

fastify.get('/pop', async (request, reply) => {
    if (!request.query["id"]) {
        return reply.code(400).send({success: false, error: "No ID specified"})
    }

    const id = request.query["id"];
    let currentQ = queues[request.query["id"]];

    if (!currentQ || currentQ.isEmpty()) {
        return reply.code(200).send({success: true, id, data: null, length: 0})
    }

    return reply.code(200).send({success: true, id, data: currentQ.dequeue(), length: currentQ.size()});
});

fastify.get('/len', async (request, reply) => {
    if (!request.query["id"]) {
        return reply.code(400).send({success: false, error: "No ID specified"})
    }

    const id = request.query["id"];
    let currentQ = queues[id];

    if (!currentQ || currentQ.isEmpty()) {
        return reply.code(200).send({success: true, id, length: 0})
    }
    return reply.code(200).send({success: true, id, length: currentQ.size()});
});

fastify.get('/ping', async (request, reply) => {
    const id = request.query["id"];

    if (!id) {
        return reply.code(400).send({success: false, error: "No ID specified"});
    }

    let currentQ = queues[id];

    if (!currentQ || currentQ.isEmpty()) {
        return reply.code(400).send({success: false, error: "Not exists"});
    }

    currentQ.setLastUpdateToNow();

    return reply.code(200).send({success: true, id, length: currentQ.size()});
});

const start = async () => {
    try {
        await fastify.listen({port: 6969, host: "0.0.0.0"});
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    setInterval(() => {
        let now = Date.now();
        for (const key in queues) {
            if (queues.hasOwnProperty(key)) {
                if ((now - queues[key].lastUpdate) > 86400000) delete queues[key];
            }
        }
    }, 60000) // 1 min
}

start().then(() => {});