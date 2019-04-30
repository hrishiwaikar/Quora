let kafka = require('kafka-node');
let log = require('./core/commons/logger');
let db = require('./core/commons/db');
let messageHandler = require('./core/kafkaMessageHandling/index');
let Consumer = kafka.Consumer;
let Producer = kafka.Producer;
let client = new kafka.KafkaClient();
broker = new Producer(client);
broker.on('ready', (e, r, t) => {
    log.info("Main Backend Connected to Kafka");
    let consumer = new Consumer(
        client,
        [{
            topic: 'users',
            partition: 0
        }], {
            autoCommit: true
        }
    );

    consumer.on('message', function (message) {
        var data = JSON.parse(message.value);
        log.info("Step 2 : Event received into main Backend")
        messageHandler(data.reply, data.type, data.requestId, data.payload, (err, serviceResponse) => {
            var payloads = {
                topic: data.reply,
                messages: [JSON.stringify({
                    requestId: data.requestId,
                    data: serviceResponse || {}
                })],
                partition: 0
            };
            if (!data.reply || !data.requestId) {
                console.error("Cannot Fire this > ", payloads);
            } else {
                log.info("Step 5 : Event Reply being sent from Mesasge Handler")
                console.log("*********** BACKEND TO KAFKA **********")
                console.log(data.reply + " | " + data.type + " | " + data.requestId)
                console.log("*********** BACKEND TO KAFKA **********")
                broker.send([payloads], function (err, brokerResponseData) {
                    // error Handling
                });
            }
        });


    });
});