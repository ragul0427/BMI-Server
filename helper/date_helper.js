const moment = require("moment");
module.exports.getDateAfterDays = (daysToAdd) => {
  try {
    const resultDate = new Date();
    resultDate.setMinutes(resultDate.getMinutes() + 2);
    return resultDate;
  } catch (err) {}
};
