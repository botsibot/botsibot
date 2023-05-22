
const generic = require('generic-logs')
const mongoose = require("mongoose");

module.exports = (client) => {
    
    mongoose.connect(process.env.MONGO, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        generic.custom({ 
            title: "MONGODB", 
            message: "Se ha cargado exitosamente la base de datos", 
            color: "green" 
        })
    }).catch((error) => {
        generic.error(`Uh , no se cargo la base de datos ->`, error)
    })
}