const { expect } = require('chai');
const sinon = require('sinon');
const axios = require('axios');
const dynamoDb = require('../src/config/dynamoDb');
const { mapData } = require('../src/utils/mapData');
const { savePeople, getPeople } = require('../src/services/peopleService');

describe('People Service', () => {
  describe('savePeople', () => {
    it('should handle errors when saving people', async () => {
      sinon.stub(axios, 'get').rejects(new Error('API error'));

      const result = await savePeople();
      expect(result.statusCode).to.equal(500);
      expect(JSON.parse(result.body).message).to.equal('Error saving people');
      
      axios.get.restore();
    });
  });

  describe('getPeople', () => {
    it('should retrieve people data from DynamoDB', async () => {
      const resultItems = [{ id: '1', nombre: 'Luke Skywalker' }];
      const scanStub = sinon.stub(dynamoDb, 'scan').returns({ promise: () => Promise.resolve({ Items: resultItems }) });

      const result = await getPeople();
      expect(result.statusCode).to.equal(200);
      expect(JSON.parse(result.body)).to.deep.equal(resultItems);
      
      scanStub.restore();
    });

    it('should handle errors when retrieving people', async () => {
      sinon.stub(dynamoDb, 'scan').rejects(new Error('DynamoDB error'));

      const result = await getPeople();
      expect(result.statusCode).to.equal(500);
      expect(JSON.parse(result.body).message).to.equal('Error retrieving people');
      
      dynamoDb.scan.restore();
    });
  });
});
