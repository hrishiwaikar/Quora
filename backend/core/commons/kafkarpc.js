const rs = require("./responses");
let utils = require("./utils");
let log = require('./logger');
let kafka = require('kafka-node');

module.exports = (() => {
    var broker;
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
            if (!!cb) {
                cb();
            }
        });
        return {
            fire: fire
        }
    };

    function fire(event) {
        let toSend = {
            topic: event.topic,
            messages: [JSON.stringify({
                type: event.type,
                payload: event.payload,
            })],
            partition: event.partition
        }
        broker.send([toSend], (err, data) => {
            if (err) {
                console.error("Try Again or CONTACT ADMINNN!!!!", err);
            } else {}
        });

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