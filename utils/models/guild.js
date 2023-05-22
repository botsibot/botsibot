const { prefix } = require("./../config");
const { Schema, model } = require("mongoose");

const guildSchema = new Schema({
    guildId: {
        type: String,
    },
    prefix: {
        type: String,
        default: prefix,
    },
    language: {
        type: String,
        default: "es",
    }
});


module.exports = model('Guild', guildSchema);