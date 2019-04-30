console.log("CHOOSING ENV >>>>>>>>>> ", JSON.stringify(process.env.NODE_ENV));
if (process.env.NODE_ENV === "production") {
    module.exports = require('./configProd')
} else {
    module.exports = require('./configDev')
}