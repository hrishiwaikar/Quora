let utils = require('./utils');
module.exports = Events = class Events {
    constructor(topic, type, req) {
        this.setType(type);
        this.setTopic(topic);
        this.setPayload(req);
        this.setEvent();
        return;
    };
    setType(type) {
        // validate Type
        this.type = type;
        return;
    };
    setPayload(req) {
        // validate Payload
        this.payload = {
            headers: req.headers || {},
            body: req.body || {},
            query: req.query || {},
            params: req.params || {},
            session: req.user || {},
            file: req.file || {},
            files: req.files || [],
        };
        return;
    };
    setTopic(topic) {
        this.topic = topic;
        return;
    }
    setEvent() {
        var self = this;
        this.event = {
            requestId: utils.getUniqueId(),
            type: self.type,
            reply: `re-${self.topic}`,
            topic: self.topic,
            payload: self.payload,
            partition: 0
        }
    }
    getEvent() {
        return this.event;
    }

}