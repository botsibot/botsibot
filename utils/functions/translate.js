const client = require('./../../index')

function translate(message) {
    const lang = message.locale 
    return (phrase, params) => client.languages.__mf({ phrase, locale: lang }, params)
}


module.exports = translate