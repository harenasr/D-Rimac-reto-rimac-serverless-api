const { expect } = require('chai');
const { mapData } = require('../src/utils/mapData');

describe('mapData', () => {
  it('should map data correctly', async () => {
    const data = [{ url: 'https://swapi.py4e.com/api/people/1/', name: 'Luke Skywalker', height: '172', mass: '77', hair_color: 'blond', eye_color: 'blue', birth_year: '19BBY', gender: 'male', homeworld: 'https://swapi.py4e.com/api/planets/1/', films: [], species: [], vehicles: [], starships: [], created: '2014-12-09T13:50:51.644000Z', edited: '2014-12-20T21:17:56.891000Z', url: 'https://swapi.py4e.com/api/people/1/' }];
    const expected = [{ id: '1', nombre: 'Luke Skywalker', altura: '172', masa: '77', color_pelo: 'blond', color_ojos: 'blue', fecha_nacimiento: '19BBY', genero: 'male', planeta_origen: 'https://swapi.py4e.com/api/planets/1/', peliculas: [], especies: [], vehículos: [], naves_estelares: [], fecha_creacion: '2014-12-09T13:50:51.644000Z', fecha_edicion: '2014-12-20T21:17:56.891000Z', url: 'https://swapi.py4e.com/api/people/1/' }];

    const result = await mapData(data);
    expect(result).to.deep.equal(expected);
  });

  it('should throw an error if no data is provided', async () => {
    try {
      await mapData();
    } catch (error) {
      expect(error.message).to.equal('No data provided to mapData function');
    }
  });
});
