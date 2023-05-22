const { join } = require('path');

module.exports = (client) => {

    client.languages.configure({
        locales: ['en', 'es'],
        directory: join(__dirname, '../locales'),
        defaultLocale: 'es',
        retryInDefaultLocale: true,
        objectNotation: true,
        register: global,
        logWarnFn: function(msg) {
            console.log(msg);
        },
        logErrorFn: function(msg) {
            console.error(msg);
        },
        missingKeyFn: function(locale, value) {
            return value;
        },
        mustacheConfig: {
            tags: ['{{', '}}'],
            disable: false,
        },
    });
}