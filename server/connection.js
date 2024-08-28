const mongoose = require("mongoose");

async function mongodbconnected(url) {
    return mongoose.connect(url);
}

module.exports = {
    mongodbconnected
}