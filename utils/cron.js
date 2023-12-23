const cron = require('node-cron');
const helpers = require('./helpers');

// delete old files every hour
cron.schedule('0 * * * *', async () => {
  console.log('⏱  Deleting old files!')
  helpers.deleteOldFiles()
  console.log('✅ Old files deleted!')
});

console.log('Cron Job started!')

module.exports = cron