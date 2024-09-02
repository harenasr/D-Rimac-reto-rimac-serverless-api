const axios = require('axios');
const { mapData } = require('../utils/mapData');
const dynamoDb = require('../config/dynamoDb');
const TABLE_NAME = 'PeopleTable';

const savePeople = async () => {
  try {
    const peopleData = await getAllPeople();
    if (!Array.isArray(peopleData)) {
      throw new Error('Invalid data received from SWAPI');
    }

    const mappedData = await mapData(peopleData);
    await Promise.all(mappedData.map(async (item) => {
      const params = {
        TableName: TABLE_NAME,
        Item: item,
      };
      await dynamoDb.put(params).promise();
    }));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'People saved successfully' }),
    };
  } catch (error) {
    console.error('Error saving people:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error saving people', error: error.message }),
    };
  }
};

const SWAPI_BASE_URL = 'https://swapi.py4e.com/api/people/';

const getAllPeople = async () => {
  let allPeople = [];
  let nextPage = SWAPI_BASE_URL;

  try {
      while (nextPage) {
          const response = await axios.get(nextPage);
          const data = response.data;

          allPeople = allPeople.concat(data.results);
          nextPage = data.next ? data.next : null;
      }

      return allPeople;
  } catch (error) {
      console.error("Error fetching people from SWAPI:", error);
      throw new Error('Could not fetch all people data');
  }
};


const getPeople = async () => {
  try {
    const params = {
      TableName: TABLE_NAME,
    };

    const result = await dynamoDb.scan(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(result.Items),
    };
  } catch (error) {
    console.error('Error retrieving people:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error retrieving people', error: error.message }),
    };
  }
};

module.exports = { savePeople, getPeople };