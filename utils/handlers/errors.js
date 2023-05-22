const generic = require('generic-logs');

module.exports = () => {
  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection:');
    console.error('Promise:', promise);
    console.error('Reason:', reason);
  });

  process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:');
    console.error(error);
  });

  process.on('warning', (warning) => {
    console.warn('Warning:');
    console.warn(warning);
  });

  process.on('SIGINT', () => {
    console.log('Received SIGINT signal');
    process.exit(0); 
  });
};
