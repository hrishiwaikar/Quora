module.exports = {
    port: 7836,
    uploadsPath: "",
    db: {
        endpoint: "mongodb://cluster0-shard-00-00-kadrb.mongodb.net:27017,cluster0-shard-00-01-kadrb.mongodb.net:27017,cluster0-shard-00-02-kadrb.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true",
        dbname: "",
        username: "quoraUser",
        password: "quora#123",
        authMechanism: "DEFAULT"
    },
    s3 : {
        "accessKeyId": "AKIAIV3RLITUDVIMSKKA",
        "secretAccessKey": "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",
        "region": "us-east-2",
        "s3BucketEndpoint": "true",
        "signatureVersion": "v4",
        "endpoint": "http://quoradotcom.s3.amazonaws.com"
    }
}