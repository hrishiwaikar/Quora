const rs = require("./responses");
let utils = require("./utils");
let log = require('./logger');
let kafka = require('kafka-node');

module.exports = (() => {
    var broker;
    var requests;
    var consumer;
    var instance;

    function producerInitiliaze(options, cb) {
        options = options || {};
        options.host = options.host || null;
        options.port = options.port || null;
        if (!!options.host && !!options.port) {
            this.brokerip = options.host + ":" + options.port + "/"
        } else {
            this.brokerip = null;
        }
        let Producer = kafka.Producer;
        let client = new kafka.KafkaClient(this.brokerip);
        broker = new Producer(client);
        broker.on('ready', (e, r, t) => {
            log.info("Connected Kafka to Backend");
            if (!!cb) {
                cb();
            }
        });
        return {
            fire: fire
        }
    };

    function consumerInitialize(callback) {
        if (!!consumer) {
            callback();
            return
        }
        let self = this;
        let Consumer = kafka.Consumer;
        let client = new kafka.KafkaClient();
        consumer = new Consumer(
            client,
            [{
                topic: 're-users',
                partition: 0
            }], {
                autoCommit: true
            }
        );
        consumer.on('message', function (message) {
            var data = JSON.parse(message.value);
            log.info("Step 6 : Event Received from reply topic" + message)
            var requestId = data.requestId;
            if (!!requests[requestId]) {
                var entry = requests[requestId];
                entry.next(null, data.data);
            }
        });
        callback();


    };

    function fire(event, next) {
        requests = requests || {};
        requests[event.requestId] = {
            requestId: event.requestId,
            next: next,
        }
        consumerInitialize(() => {
            if (!event.topic || !event.reply) {
                console.error("Cant Fire This > ", event)
            } else {
                log.info("Step 1 : Firing Event from Kafka RPC")
                let toSend = {
                    topic: event.topic,
                    messages: [JSON.stringify({
                        requestId: event.requestId,
                        type: event.type,
                        reply: event.reply,
                        payload: event.payload,
                    })],
                    partition: event.partition
                }
                console.log("*********** KAFKA TO BACKEND **********")
                console.log(event.topic + " | " + event.type + " | " + event.requestId)
                console.log("*********** KAFKA TO BACKEND **********")
                broker.send([toSend], (err, data) => {
                    if (err) {
                        console.error("Try Again or CONTACT ADMINNN!!!!",err);
                    } else {}
                });
            }

        })

    };

    return {
        getInstance: function () {
            if (!instance) {
                instance = producerInitiliaze();
            }
            return instance;
        }
    }
})()