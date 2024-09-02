const { savePeople, getPeople } = require('../services/peopleService');

module.exports.savePeople = async (event) => {
  return await savePeople(event);
};

module.exports.getPeople = async (event) => {
  return await getPeople();
};