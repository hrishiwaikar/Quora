console.log("CHOOSING ENV >>>>>>>>>> ", process.env.env)
if (process.env.env === "production") {
    module.exports = require('./configProd')
} else {
    module.exports = require('./configDev')
}