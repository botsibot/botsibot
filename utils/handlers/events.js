const fs = require('fs');
const generic = require('generic-logs')


module.exports = async (client) => {

    let eventstring = "";
    fs.readdirSync('./events/').filter((file) => file.endsWith('.js')).forEach((event) => {
        require(`../../events/${event}`);
        eventstring += event + " ";
    })
    let evtnum = eventstring.trim().split(/\s+/)
    generic.separator('-', 60)
    console.log(generic.yellow(generic.bold(`> EVENTOS [${evtnum.length}] \n`)))
    console.log("ㅤㅤㅤ" + eventstring + "\n");

};
