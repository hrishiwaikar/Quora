
if (process.env.env === "production") {
    module.exports = require('./configProd')
} else {
    module.exports = require('./configDev')
}