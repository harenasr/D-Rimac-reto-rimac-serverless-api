const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const mapData = async (data) => {
  if (!data) {
    throw new Error('No data provided to mapData function');
  }

  const mappedData = await Promise.all(data.map(async (item) => {
    return {
      id : item.url.split('/').slice(-2, -1)[0],
      nombre: item.name,
      altura: item.height,
      masa: item.mass,
      color_pelo: item.hair_color,
      color_ojos: item.eye_color,
      fecha_nacimiento: item.birth_year,
      genero: item.gender,
      planeta_origen: item.homeworld,
      peliculas: item.films,
      especies: item.species,
      vehículos: item.vehicles,
      naves_estelares: item.starships,
      fecha_creacion: item.created,
      fecha_edicion: item.edited,
      url: item.url,
    };
  }));

  return mappedData;
};


module.exports = { mapData };