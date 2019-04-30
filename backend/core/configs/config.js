console.log("CHOOSING ENV >>>>>>>>>> ", process.env.NODE_ENV)
if ((process.env||{}).env === "production") {
    module.exports = require('./configProd')
} else {
    module.exports = require('./configDev')
}